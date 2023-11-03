const Testrail = require('../index').default;

const expect = require('chai').expect;
const nock = require('nock');

const options = {
    domain: "example.testrail.com",
    username: "example@example.com",
    password: "ABC"
};
const testrail = new Testrail(options);

describe('plans api', function () {
    it('addResultsForCases pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_results_for_cases/1')
            .reply(200, [
                { 'id': 1, 'title': '..' }
            ]);

        testrail.addResultsForCases(1, [{ 'comment': 'This test failed' }])
            .then(() => {
                done();
            })
    });

    it('addAttachmentToResult pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_attachment_to_result/1')
            .reply(200, [
                { 'id': 1 }
            ]);

        testrail.addAttachmentToResult(1, '../testrail-api-client/README.md')
            .then(() => {
                done();
            })
    });

    it('addResultsForCases fail', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_results_for_cases/2')
            .reply(401, 'nok');

        testrail.addResultsForCases(2, [{ 'comment': 'This test failed' }])
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });

    it('addAttachmentToResult fail', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_attachment_to_result/2')
            .reply(401, 'nok');

        testrail.addAttachmentToResult(2, '../testrail-api-client/README.md')
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });
});