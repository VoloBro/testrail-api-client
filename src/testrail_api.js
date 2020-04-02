const request = require('sync-request');

class TestRail {
    constructor(domain, username, api_key) {
        this.domain = domain;
        this.username = username;
        this.apikey = api_key;

        this.auth = Buffer.from(`${this.username}:${this.apikey}`).toString('base64');
    };

    private validate() {

    }

    getCasesFromRun(runID) {
        // Get all test cases from the run
        const get_tests = `https://${this.domain}/index.php?/api/v2/get_tests/${runID}`;
        const response = request('GET', get_tests, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${this.auth}`,
            }
        });

        const cases = JSON.parse(response.getBody());
        const ids = cases.map(a => `${a.case_id}`);
        return ids;
    }
}

module.exports = TestRail;