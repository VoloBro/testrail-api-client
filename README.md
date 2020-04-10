# testrail-api-client

TypeScript and JavaScript binding for TestRail API v2

![Node.js Package](https://github.com/VoloBro/testrail-api-client/workflows/Node.js%20Package/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/VoloBro/testrail-api-client/badge.svg?branch=master)](https://coveralls.io/github/VoloBro/testrail-api-client?branch=master)
[![npm version](https://img.shields.io/npm/v/testrail-api-client.svg?style=flat-square)](https://www.npmjs.com/package/testrail-api-client)
[![npm downloads](https://img.shields.io/npm/dm/testrail-api-client.svg?style=flat-square)](http://npm-stat.com/charts.html?package=testrail-api-client)

## Installing

Using npm:

```bash
$ npm install testrail-api-client
```

Using yarn:

```bash
$ yarn add testrail-api-client
```

## Example

### note: CommonJS usage

#### Using [Environment Variables](#Environment-Variables):

```js
const client = require("testrail-api-client");
```

#### Using Custom Options:

```js
const client_options = require("testrail-api-client").default;

const options = {
  domain: "example.testrail.com",
  username: "example@example.com",
  password: "ABC",
};

const client = new client_options(options);
```

### addRun

```js
const runName = "Example Run Name";
const runDescription = "Example Run Description";
const projectId = 1;
const testSuiteId = 123; // optional
const caseIds = [1, 2, 3]; // optional
client
  .addRun(runName, runDescription, projectId, testSuiteId, caseIds)
  .then(function (runId) {
    console.log(`Created run with id: ${runId}`);
  })
  .catch((error) => console.error(error));
```

### getTests

```js
const runId = 123;
client
  .getTests(runId)
  .then(function (cases) {
    console.log(`Number of cases from run #${runId}: ${cases.length}`);
  })
  .catch((error) => console.error(error));
```

### closeRun

```js
const runId = 123;
client
  .closeRun(runId)
  .then(console.log(`Closed run with id: ${runId}`))
  .catch((error) => console.error(error));
```

### getCases

```js
const projectId = 1;
const suiteId = 123; // optional
client
  .getCases(projectId, suiteId)
  .then(function (cases) {
    console.log(`Number of cases in suiteid=${suiteId}: ${cases.length}`);
  })
  .catch((error) => console.error(error));
```

## Environment variables

| Variable           | Description                                                                                                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TESTRAIL_DOMAIN    | This is a required variable to point the client to your TestRail instance.<br /><br />_Required_<br />Example: `example.testrail.com`                                                                 |
| TESTRAIL_USERNAME  | This is a required variable to authenticate HTTP communication.<br /><br />_Required_<br />Example: `example@example.com`                                                                             |
| TESTRAIL_APIKEY    | This is a required variable to authenticate HTTP communication. Can be obtained in TestRail settings, see [http://docs.gurock.com/testrail-api2/accessing].<br /><br />_Required_<br />Example: `ABC` |
| TESTRAIL_PROJECTID | This is a required variable to point client to the right project.<br /><br />_Required_<br />Example: `1`                                                                                             |
