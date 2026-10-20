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
            .then((res) => {
                expect(res.length).to.equal(1);
                expect(res[0].id).to.equal(1);
                done();
            })
    });

    it('addAttachmentToResult pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_attachment_to_result/1')
            .reply(200, { 'id': 1 });

        testrail.addAttachmentToResult(1, '../testrail-api-client/README.md')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.data.id).to.equal(1);
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

    it('addAttachmentToResult sends a single valid multipart/form-data Content-Type header', function (done) {
        let capturedHeaders;

        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_attachment_to_result/3')
            .reply(function (uri, requestBody) {
                capturedHeaders = this.req.headers;
                return [200, { id: 1 }];
            });

        testrail.addAttachmentToResult(3, '../testrail-api-client/README.md')
            .then((res) => {
                const contentType = capturedHeaders['content-type'];

                // only one content-type header should have been sent
                expect(capturedHeaders['content-type']).to.not.be.an('array');

                expect(contentType).to.match(/^multipart\/form-data; boundary=.+/);
                expect(contentType).to.not.include('boundary=undefined');

                done();
            })
            .catch(done);
    });

    it('addAttachmentToResult sends the file contents in the attachment field', function (done) {
        let capturedBody;

        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_attachment_to_result/4')
            .reply(function (uri, requestBody) {
                capturedBody = requestBody;
                return [200, { id: 1 }];
            });

        testrail.addAttachmentToResult(4, '../testrail-api-client/README.md')
            .then((res) => {
                expect(capturedBody).to.include('Content-Disposition: form-data; name="attachment"; filename="README.md"');
                expect(capturedBody).to.include('testrail-api-client');
                done();
            })
            .catch(done);
    });
});