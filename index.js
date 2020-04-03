const options = {
    domain: process.env.TESTRAIL_DOMAIN,
    username: process.env.TESTRAIL_USERNAME,
    password: process.env.TESTRAIL_APIKEY,
    projectId: process.env.TESTRAIL_PROJECTID
};

const Client = require('./dist/testrail').TestRailClient;
const outClient = new Client(options);

module.exports = outClient;