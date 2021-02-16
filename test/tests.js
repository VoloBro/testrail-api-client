const Testrail = require('../index').default;

const nock = require('nock');
const expect = require('chai').expect;

const options = {
    domain: "example.testrail.com",
    username: "example@example.com",
    password: "ABC"
};
const testrail = new Testrail(options);

describe('Tests api', function () {
    it('getTests(1) pass', function (done) {
        nock(`https://${options.domain}`)
            .get(testrail.uri + '/get_tests/123')
            .reply(200, {
                "offset": 0,
                "limit": 250,
                "size": 46,
                "_links": {
                    "next": null,
                    "prev": null
                },
                "tests": []
            });

        testrail.getTests(123)
            .then(() => {
                done();
            })
    });

    it('getTests(2) fail', function (done) {
        nock(`https://${options.domain}`)
            .get(testrail.uri + '/get_tests/321')
            .reply(401, 'nok');

        testrail.getTests(321)
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });
});