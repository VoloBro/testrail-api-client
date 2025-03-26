// import axios, { AxiosInstance } from 'axios';
import type { AxiosInstance } from 'axios';
const axios = require('axios');
const axiosRetry = require('axios-retry');
const FormData = require('form-data');
const fs = require('fs');
const https = require('https');

import { TestRailOptions, TestRailResult } from "./testrail.interface";

export class TestRailClient {
    private indexUri = "/index.php?";
    public uri: String = `${this.indexUri}/api/v2`;
    private commonHeaders = { 'Content-Type': 'application/json' };
    private axiosInstance: AxiosInstance;

    private agent = new https.Agent({
        rejectUnauthorized: false, // to ignore the self-signed certificate error
    });

    constructor(private options: TestRailOptions) {
        this.axiosInstance = axios.create({
            // https://axios-http.com/docs/req_config
            httpsAgent: this.agent,
            baseURL: `https://${options.domain}`,
        })
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

    public addRun(name: string, description: string, projectId: string, suiteId?: number, cases?: Array<number>, milestoneId?: string, refs?: string) {
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
            if (milestoneId) {
                body["milestone_id"] = milestoneId;
            }
            if (refs) {
                body["refs"] = refs;
            }
            this.axiosInstance.post(`${this.uri}/add_run/${projectId}`, JSON.stringify(body), {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                }
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
            this.axiosInstance.post(`${this.uri}/close_run/${runId}`, {}, {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
            })
                .then(function (res) { resolve(res) })
                .catch(function (error) { reject(error) });
        });
    }

    public addResultsForCases(runId, results: TestRailResult[]) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post(`${this.uri}/add_results_for_cases/${runId}`, JSON.stringify({ "results": results }), {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                }
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) { reject(error) });
        })
    }

    public addAttachmentToResult(resultId: number, filePath: string) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const file = fs.createReadStream(filePath);
            formData.append("attachment", file);

            this.axiosInstance.post(`${this.uri}/add_attachment_to_result/${resultId}`, formData, {
                headers:  { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` },
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                }
            })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) { reject(error) });
        })
    }

    public updateRunDescription(runId, description) {
        return new Promise((resolve, reject) => {
            this.axiosInstance.post(`${this.uri}/update_run/${runId}`, JSON.stringify({ "description": description }), {
                headers: this.commonHeaders,
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                }
            })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) { reject(error) });
        })

    }
};
