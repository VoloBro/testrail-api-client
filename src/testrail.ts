import axios, { AxiosInstance } from 'axios';
const axiosRetry = require('axios-retry');

import { TestRailOptions, TestRailResult } from "./testrail.interface";

export class TestRailClient {
    private indexUri = "/index.php?";
    public uri: String = `${this.indexUri}/api/v2`;
    private commonHeaders = { 'Content-Type': 'application/json', 'x-api-ident': 'beta' };
    private axiosInstance: AxiosInstance;

    constructor(private options: TestRailOptions) {
        this.axiosInstance = axios.create({
            baseURL: `https://${options.domain}`,
        })
        axiosRetry(axios, { retries: 3 });
        axiosRetry(this.axiosInstance, { retries: 3 });
    }

    private handlePaginatedGetAxios = (requestUrl, itemName, items, resolve, reject) => {
        const __this = this;
        this.axiosInstance.get(requestUrl, {
            headers: this.commonHeaders,
            auth: {
                username: this.options.username,
                password: this.options.password,
            }
        })
            .then(function (response) {
                const retrievedItems = items.concat(response.data[itemName]);
                if (response.data._links.next !== null) {
                    __this.handlePaginatedGetAxios(`${__this.indexUri}/${response.data._links.next}`, itemName, retrievedItems, resolve, reject)
                }
                else {
                    resolve(retrievedItems)
                }
            })
            .catch(function (error) { reject(error) });
    }

    public addRun(name: string, description: string, projectId: string, suiteId?: number, cases?: Array<number>) {
        return new Promise((resolve, reject) => {
            const body = {
                name,
                description,
                include_all: false,
                case_ids: cases,
            }

            if (suiteId) {
                body["suite_id"] = suiteId;
            }

            this.axiosInstance.post(`${this.uri}/add_run/${projectId}`, {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
                data: JSON.stringify(body),
            })
                .then(function (response) { resolve(response.data.id) })
                .catch(function (error) { reject(error) });
        });
    }

    public getTests(runId: number) {
        return new Promise((resolve, reject) => {
            this.handlePaginatedGetAxios(`${this.uri}/get_tests/${runId}`, 'tests', [], resolve, reject);
        });
    }

    public getCases(projectId: string, suiteId?: string) {
        return new Promise((resolve, reject) => {
            const params = ""
                + (suiteId ? `/&suite_id=${suiteId}` : "");

            this.handlePaginatedGetAxios(`${this.uri}/get_cases/${projectId}${params}`, 'cases', [], resolve, reject);
        });
    };

    public closeRun(runId) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post(`${this.uri}/close_run/${runId}`, {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
            })
                .then(function (res) { resolve() })
                .catch(function (error) { reject(error) });
        });
    }

    public addResultsForCases(runId, results: TestRailResult[]) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post(`${this.uri}/add_results_for_cases/${runId}`, {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
                data: JSON.stringify({ "results": results }),
            })
                .then(function (response) {
                    resolve();
                })
                .catch(function (error) { reject(error) });
        })

    }

    public updateRunDescription(runId, description) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post(`${this.uri}/update_run/${runId}`, {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
                data: JSON.stringify({ "description": description }),
            })
                .then(function (response) {
                    resolve();
                })
                .catch(function (error) { reject(error) });
        })

    }
};