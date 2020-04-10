const Testrail = require('../index').default;

const nock = require('nock');
const expect = require('chai').expect;

const options = {
    domain: "example.testrail.com",
    username: "example@example.com",
    password: "ABC"
};
const testrail = new Testrail(options);

describe('runs api', function () {
    it('addRun(name,desc,projectid) pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_run/1')
            .reply(200, [
                { 'status': 'ok' }
            ]);
        testrail.addRun("Hello", "World", 1)
            .then(() => {
                done();
            })
    });

    it('addRun(name,desc,projectid) fail', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_run/4')
            .reply(401, 'nok');
        testrail.addRun("Hello", "World", 4)
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });

    it('addRun(name,desc,projectid,suiteId) pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_run/2')
            .reply(200, [
                { 'status': 'ok' }
            ]);
        testrail.addRun("Hello", "World", 2, 123)
            .then(() => {
                done();
            })
    });

    it('addRun(name,desc,projectid,suiteId,cases) pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/add_run/3')
            .reply(200, [
                { 'status': 'ok' }
            ]);
        testrail.addRun("Hello", "World", 3, 123, [1, 2, 3])
            .then(() => {
                done();
            })
    });

    it('closeRun pass', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/close_run/1')
            .reply(200, [
                { 'status': 'ok' }
            ]);
        testrail.closeRun(1)
            .then(() => {
                done();
            })
    });

    it('closeRun fail', function (done) {
        nock(`https://${options.domain}`)
            .post(testrail.uri + '/close_run/2')
            .reply(401, "nok");
        testrail.closeRun(2)
            .catch((err) => {
                expect(err.response.status).to.equal(401);
                expect(err.response.data).to.equal('nok');
                done();
            });
    });
});