const axios = require("axios");

import { TestRailOptions } from "./testrail.interface";

export class TestRailClient {
    private base: String;

    constructor(private options: TestRailOptions) {
        this.base = `https://${options.domain}/index.php?/api/v2`;
    }

    public addRun(name: string, description: string, suiteId?: number, cases?: Array<number>) {
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
                url: `${this.base}/add_run/${this.options.projectId}`,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
                data: JSON.stringify(body),
            }).then(response => {
                resolve(response.data.id);
            }).catch(error => reject(error));
        });
    }

    public getCasesFromRun(runId: number) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `${this.base}/get_tests/${runId}`,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                },
            }).then(response => {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    public getCases(suiteId?: string) {
        return new Promise((resolve, reject) => {
            const params = ""
                + (suiteId ? `&suite_id=${suiteId}` : "");

            axios({
                method: 'get',
                url: `${this.base}/get_cases/${this.options.projectId}/${params}`,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: this.options.username,
                    password: this.options.password,
                }
            }).then(function (response) {
                resolve(response.data);
            }).catch(error => reject(error));
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
            }).then(resolve())
                .catch(error => reject(error));
        });
    }
}
