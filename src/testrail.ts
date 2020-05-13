const axios = require("axios");

import { TestRailOptions, TestRailResult } from "./testrail.interface";

export class TestRailClient {
    public uri: String = "/index.php?/api/v2";
    public base: String;

    constructor(private options: TestRailOptions) {
        this.base = `https://${options.domain}${this.uri}`;
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

            axios({
                method: 'post',
                url: `${this.base}/add_run/${projectId}`,
                headers: { 'Content-Type': 'application/json' },
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
            axios({
                method: 'GET',
                url: `${this.base}/get_tests/${runId}`,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
            })
                .then(function (response) { resolve(response.data) })
                .catch(function (error) { reject(error) });
        });
    }

    public getCases(projectId: string, suiteId?: string) {
        return new Promise((resolve, reject) => {
            const params = ""
                + (suiteId ? `/&suite_id=${suiteId}` : "");

            axios({
                method: 'get',
                url: `${this.base}/get_cases/${projectId}${params}`,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                }
            })
                .then(function (response) { resolve(response.data) })
                .catch(function (error) { reject(error) });
        });
    };

    public closeRun(runId) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${this.base}/close_run/${runId}`,
                headers: { 'Content-Type': 'application/json' },
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
            axios({
                method: 'post',
                url: `${this.base}/add_results_for_cases/${runId}`,
                headers: { 'Content-Type': 'application/json' },
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
            axios({
                method: 'post',
                url: `${this.base}/update_run/${runId}`,
                headers: { 'Content-Type': 'application/json' },
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