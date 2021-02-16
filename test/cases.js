const Testrail = require('../index').default;

const nock = require('nock');
const expect = require('chai').expect;

const options = {
    domain: "example.testrail.com",
    username: "example@example.com",
    password: "ABC"
};
const testrail = new Testrail(options);

describe('cases api', function () {
    it('getCases(1) pass', function (done) {
        nock(`https://${options.domain}`)
            .get(testrail.uri + '/get_cases/1')
            .reply(200, 
                {
                    "offset": 3000,
                    "limit": 250,
                    "size": 0,
                    "_links": {
                        "next": null,
                        "prev": "/api/v2/get_cases/108&suite_id=974&limit=250&offset=2750"
                    },
                    "cases": []
                }
            );

        testrail.getCases(1)
            .then(() => {
                done();
            })
    });

    it('getCases(2) fail', function (done) {
        nock(`https://${options.domain}`)
            .get(testrail.uri + '/get_cases/2')
            .reply(401, 'nok');

        testrail.getCases(2)
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });

    it('getCases(1, 123) pass', function (done) {
        nock(`https://${options.domain}`)
            .get(testrail.uri + '/get_cases/1/&suite_id=123')
            .reply(200, {
                "offset": 3000,
                "limit": 250,
                "size": 0,
                "_links": {
                    "next": null,
                    "prev": "/api/v2/get_cases/108&suite_id=974&limit=250&offset=2750"
                },
                "cases": []
            });

        testrail.getCases(1, 123)
            .then(() => {
                done();
            })
    });

    it('getCases(2, 321) fail', function (done) {
        nock(`https://${options.domain}`)
            .get(testrail.uri + '/get_cases/2/&suite_id=321')
            .reply(401, 'nok');

        testrail.getCases(2, 321)
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });
});