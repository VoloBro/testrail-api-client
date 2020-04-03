"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require("axios");
var TestRailClient = /** @class */ (function () {
    function TestRailClient(options) {
        this.options = options;
        this.base = "https://" + options.domain + "/index.php?/api/v2";
    }
    TestRailClient.prototype.addRun = function (name, description, suiteId, cases) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = {
                name: name,
                description: description,
                include_all: false,
                case_ids: cases,
            };
            if (suiteId) {
                body["suite_id"] = suiteId;
            }
            axios({
                method: 'post',
                url: _this.base + "/add_run/" + _this.options.projectId,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: _this.options.username,
                    password: _this.options.password,
                },
                data: JSON.stringify(body),
            }).then(function (response) {
                resolve(response.data.id);
            }).catch(function (error) { return reject(error); });
        });
    };
    TestRailClient.prototype.getCasesFromRun = function (runId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'GET',
                url: _this.base + "/get_tests/" + runId,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: _this.options.username,
                    password: _this.options.password,
                },
            }).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    TestRailClient.prototype.getCases = function (suiteId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var params = ""
                + (suiteId ? "&suite_id=" + suiteId : "");
            axios({
                method: 'get',
                url: _this.base + "/get_cases/" + _this.options.projectId + "/" + params,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: _this.options.username,
                    password: _this.options.password,
                }
            }).then(function (response) {
                resolve(response.data);
            }).catch(function (error) { return reject(error); });
        });
    };
    ;
    TestRailClient.prototype.closeRun = function (runId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'post',
                url: _this.base + "/close_run/" + runId,
                headers: { 'Content-Type': 'application/json' },
                auth: {
                    username: _this.options.username,
                    password: _this.options.password,
                },
            }).then(resolve())
                .catch(function (error) { return reject(error); });
        });
    };
    return TestRailClient;
}());
exports.TestRailClient = TestRailClient;
//# sourceMappingURL=testrail.js.map