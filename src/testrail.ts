const axios = require("axios");

import { TestRailOptions } from "./testrail.interface";

export class TestRail {
  private base: String;

  constructor(private options: TestRailOptions) {
    this.base = `https://${options.domain}/index.php?/api/v2`;
  }

  public createRun(options: {}, callback) {}
}
