// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @author Yefu Wang <yefuwang@microsoft.com>
 */

import path from "path";
import { describe } from "mocha";
import * as chai from "chai";
import { execAsync } from "../commonUtils";

import { AppStudioValidator } from "../../commonlib";
import { it } from "../../commonlib/it";

describe("teamsfx provision manifest command", function () {
  const testAppPkgPath = path.resolve(__dirname, "appPackage.dev.zip");
  // This id is specified by the zip file at testAppPkgPath
  const testTeamsAppId = "1befd3b2-4441-4a3a-be6c-b4ad95334d6f";

  before(async () => {
    AppStudioValidator.setE2ETestProvider();
    if (await AppStudioValidator.checkWetherAppExists(testTeamsAppId)) {
      await AppStudioValidator.deleteApp(testTeamsAppId);
      console.log(`Teams App ${testTeamsAppId} has been deleted`);
    }
  });

  it(
    `should create Teams App then update it successfully`,
    { testPlanCaseId: 13395709 },
    async function () {
      await execAsync(`teamsfx provision manifest --file-path ${testAppPkgPath}`);

      AppStudioValidator.setE2ETestProvider();
      chai.assert.isTrue(await AppStudioValidator.checkWetherAppExists(testTeamsAppId));

      await AppStudioValidator.deleteApp(testTeamsAppId);
      console.log(`Teams App ${testTeamsAppId} has been deleted`);
    }
  );
});
