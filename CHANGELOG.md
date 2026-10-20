## [2.0.1](https://github.com/VoloBro/testrail-api-client/compare/2.0.0...2.0.1) (2026-10-20)


### Bug Fixes

* **ci:** bump actions/checkout and actions/setup-node to v7 ([#51](https://github.com/VoloBro/testrail-api-client/issues/51)) ([d5c7a29](https://github.com/VoloBro/testrail-api-client/commit/d5c7a29a8d86246b48b78cbbfaecda21bb9cccc2))

# [2.0.0](https://github.com/VoloBro/testrail-api-client/compare/1.0.47...2.0.0) (2026-10-20)


### Bug Fixes

* trigger release skipped by unsupported commit-message syntax ([#50](https://github.com/VoloBro/testrail-api-client/issues/50)) ([ad48f50](https://github.com/VoloBro/testrail-api-client/commit/ad48f502e81a50ffb58c9dbb46fed3c2957094a8)), closes [#49](https://github.com/VoloBro/testrail-api-client/issues/49)


### BREAKING CHANGES

* to this package's own public API, since switching to
a "!"-aware preset now would retroactively reclassify the unreleased
axios/mocha commit as breaking and trigger an unwarranted major bump.

Co-authored-by: Vova <vpl.mtl@gmail.com>
Co-authored-by: Claude Sonnet 5 <noreply@anthropic.com>

## [1.0.47](https://github.com/VoloBro/testrail-api-client/compare/1.0.46...1.0.47) (2026-10-20)


### Bug Fixes

* **deps:** remove unused js-yaml, bump form-data to patch critical CVEs ([#48](https://github.com/VoloBro/testrail-api-client/issues/48)) ([399c890](https://github.com/VoloBro/testrail-api-client/commit/399c8904f9c45858f6435eb0f9ba68cec8d52f36))

## [1.0.46](https://github.com/VoloBro/testrail-api-client/compare/1.0.45...1.0.46) (2026-10-20)


### Bug Fixes

* use formData.getHeaders() for attachment upload Content-Type ([#47](https://github.com/VoloBro/testrail-api-client/issues/47)) ([6ccb2c7](https://github.com/VoloBro/testrail-api-client/commit/6ccb2c7a2deb3f9c7753973ed8a4407785e91f7d))

## [1.0.45](https://github.com/VoloBro/testrail-api-client/compare/1.0.44...1.0.45) (2026-07-15)


### Bug Fixes

* use a PAT to create releases so npmpublish.yml actually triggers ([#42](https://github.com/VoloBro/testrail-api-client/issues/42)) ([057299f](https://github.com/VoloBro/testrail-api-client/commit/057299f5b24f1c018df90dfebfb58722fbeb574c))

## [1.0.44](https://github.com/VoloBro/testrail-api-client/compare/1.0.43...1.0.44) (2026-07-15)


### Bug Fixes

* publish to npm on release published, not just created ([#41](https://github.com/VoloBro/testrail-api-client/issues/41)) ([b6318fc](https://github.com/VoloBro/testrail-api-client/commit/b6318fc288768fbf9b8f9a7afdd2144dfd96633c))

## [1.0.43](https://github.com/VoloBro/testrail-api-client/compare/1.0.42...1.0.43) (2026-07-15)


### Bug Fixes

* test change to trigger version change ([fe20ef7](https://github.com/VoloBro/testrail-api-client/commit/fe20ef7b5201c6f26f69c58ebf33e86bb82c2e92))

## [1.0.42](https://github.com/VoloBro/testrail-api-client/compare/1.0.41...1.0.42) (2026-07-15)


### Bug Fixes

* Bump follow-redirects from 1.15.3 to 1.15.6 ([#27](https://github.com/VoloBro/testrail-api-client/issues/27)) ([85701c0](https://github.com/VoloBro/testrail-api-client/commit/85701c08fa31cbf4be8f22ba3a95930a705c3e47))
* match semantic-release tagFormat to existing tag convention ([#38](https://github.com/VoloBro/testrail-api-client/issues/38)) ([57c7a02](https://github.com/VoloBro/testrail-api-client/commit/57c7a026eebac324aebc3bde42381f773b8a3a1f))

# 1.0.0 (2026-07-15)


### Bug Fixes

* Bump follow-redirects from 1.15.3 to 1.15.6 ([#27](https://github.com/VoloBro/testrail-api-client/issues/27)) ([85701c0](https://github.com/VoloBro/testrail-api-client/commit/85701c08fa31cbf4be8f22ba3a95930a705c3e47))
