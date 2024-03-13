// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OfficeAddinHostOptions, ProjectTypeOptions } from "../../../question";

/**
 * @author zyun@microsoft.com
 */

interface IOfficeAddinHostConfig {
  [property: string]: {
    title: string;
    detail: string;
    localTemplate: string;
    manifestPath?: string;
    framework: {
      [property: string]: {
        typescript?: string;
        javascript?: string;
      };
    };
  };
}

interface IOfficeAddinProjectConfig {
  [property: string]: IOfficeAddinHostConfig;
}

const CommonProjectConfig = {
  taskpane: {
    title: "core.createProjectQuestion.officeXMLAddin.taskpane.title",
    detail: "core.createProjectQuestion.officeXMLAddin.taskpane.detail",
    framework: {
      default: {
        typescript: "https://aka.ms/ccdevx-fx-taskpane-ts",
        javascript: "https://aka.ms/ccdevx-fx-taskpane-js",
      },
    },
  },
  sso: {
    framework: {
      default: {
        typescript: "https://aka.ms/ccdevx-fx-sso-ts",
        javascript: "https://aka.ms/ccdevx-fx-sso-js",
      },
    },
  },
  react: {
    framework: {
      default: {
        typescript: "https://aka.ms/ccdevx-fx-react-ts",
        javascript: "https://aka.ms/ccdevx-fx-react-js",
      },
    },
  },
  manifest: {
    title: "core.createProjectQuestion.officeXMLAddin.manifestOnly.title",
    detail: "core.createProjectQuestion.officeXMLAddin.manifestOnly.detail",
    framework: {
      default: {},
    },
  },
};

export const OfficeAddinProjectConfig: IOfficeAddinProjectConfig = {
  json: {
    "json-taskpane": {
      title: "core.newTaskpaneAddin.label",
      detail: "core.newTaskpaneAddin.detail",
      localTemplate: "",
      framework: {
        default_old: {
          typescript: "https://aka.ms/office-addin-taskpane",
        },
        default: {
          typescript: "https://aka.ms/teams-toolkit/office-addin-taskpane/ts-default",
          javascript: "https://aka.ms/teams-toolkit/office-addin-taskpane/js-default",
        },
        react: {
          typescript: "https://aka.ms/teams-toolkit/office-addin-taskpane/ts-react",
          javascript: "https://aka.ms/teams-toolkit/office-addin-taskpane/js-react",
        },
      },
      manifestPath: "manifest.json",
    },
  },
  word: {
    "word-taskpane": {
      localTemplate: "word-taskpane",
      ...CommonProjectConfig.taskpane,
    },
    "word-sso": {
      title: "core.createProjectQuestion.officeXMLAddin.word.sso.title",
      detail: "core.createProjectQuestion.officeXMLAddin.word.sso.detail",
      localTemplate: "word-sso",
      ...CommonProjectConfig.sso,
    },
    "word-react": {
      title: "core.createProjectQuestion.officeXMLAddin.word.react.title",
      detail: "core.createProjectQuestion.officeXMLAddin.word.react.detail",
      localTemplate: "word-react",
      ...CommonProjectConfig.react,
    },
    "word-manifest": {
      localTemplate: "word-manifest-only",
      ...CommonProjectConfig.manifest,
    },
  },
  excel: {
    "excel-taskpane": {
      localTemplate: "excel-taskpane",
      ...CommonProjectConfig.taskpane,
    },
    "excel-sso": {
      title: "core.createProjectQuestion.officeXMLAddin.excel.sso.title",
      detail: "core.createProjectQuestion.officeXMLAddin.excel.sso.detail",
      localTemplate: "excel-sso",
      ...CommonProjectConfig.sso,
    },
    "excel-react": {
      title: "core.createProjectQuestion.officeXMLAddin.excel.react.title",
      detail: "core.createProjectQuestion.officeXMLAddin.excel.react.detail",
      localTemplate: "excel-react",
      ...CommonProjectConfig.react,
    },
    "excel-cfshared": {
      title: "core.createProjectQuestion.officeXMLAddin.excel.cf.shared.title",
      detail: "core.createProjectQuestion.officeXMLAddin.excel.cf.shared.detail",
      localTemplate: "excel-cf",
      framework: {
        default: {
          typescript: "https://aka.ms/ccdevx-fx-cf-shared-ts",
          javascript: "https://aka.ms/ccdevx-fx-cf-shared-js",
        },
      },
    },
    "excel-cfjs": {
      title: "core.createProjectQuestion.officeXMLAddin.excel.cf.js.title",
      detail: "core.createProjectQuestion.officeXMLAddin.excel.cf.js.detail",
      localTemplate: "excel-cf",
      framework: {
        default: {
          typescript: "https://aka.ms/ccdevx-fx-cf-js-ts",
          javascript: "https://aka.ms/ccdevx-fx-cf-js-js",
        },
      },
    },
    "excel-manifest": {
      localTemplate: "excel-manifest-only",
      ...CommonProjectConfig.manifest,
    },
  },
  powerpoint: {
    "powerpoint-taskpane": {
      localTemplate: "powerpoint-taskpane",
      ...CommonProjectConfig.taskpane,
    },
    "powerpoint-sso": {
      localTemplate: "powerpoint-sso",
      title: "core.createProjectQuestion.officeXMLAddin.powerpoint.sso.title",
      detail: "core.createProjectQuestion.officeXMLAddin.powerpoint.sso.detail",
      ...CommonProjectConfig.sso,
    },
    "powerpoint-react": {
      localTemplate: "powerpoint-react",
      title: "core.createProjectQuestion.officeXMLAddin.powerpoint.react.title",
      detail: "core.createProjectQuestion.officeXMLAddin.powerpoint.react.detail",
      ...CommonProjectConfig.react,
    },
    "powerpoint-manifest": {
      localTemplate: "powerpoint-manifest-only",
      ...CommonProjectConfig.manifest,
    },
  },
};

export function getOfficeAddinTemplateConfig(
  projectType: string,
  addinHost?: string
): IOfficeAddinHostConfig {
  if (
    projectType === ProjectTypeOptions.officeXMLAddin().id &&
    addinHost &&
    addinHost !== OfficeAddinHostOptions.outlook().id
  ) {
    return OfficeAddinProjectConfig[addinHost];
  }
  return OfficeAddinProjectConfig["json"];
}

// /**
//  * Get all available Office XML Addin Project Options of one host
//  * @param host Office host
//  * @returns the detail proj options[] of the host
//  */
// export function getOfficeXMLAddinHostProjectOptions(host: string): {
//   proj: string;
//   title: string;
//   detail: string;
// }[] {
//   const result = [];
//   for (const proj in OfficeAddinProjectConfig[host]) {
//     result.push({
//       proj,
//       title: OfficeAddinProjectConfig[host][proj].title,
//       detail: OfficeAddinProjectConfig[host][proj].detail,
//     });
//   }
//   return result;
// }

// /**
//  * Get all available Lang Options of one host and proj
//  * @param host Office host
//  * @param proj proj name
//  * @returns the detail lang options[] of the proj
//  */
// export function getOfficeXMLAddinHostProjectLangOptions(
//   host: string,
//   proj: string
// ): {
//   id: string;
//   label: string;
// }[] {
//   const result = [];
//   for (const lang in OfficeAddinProjectConfig[host][proj].lang) {
//     result.push(
//       lang === "ts"
//         ? { id: "typescript", label: "TypeScript" }
//         : { id: "javascript", label: "JavaScript" }
//     );
//   }
//   return result;
// }

// /**
//  * Get all available Lang Options of one host and proj
//  * @param host Office host
//  * @param proj proj name
//  * @returns the detail lang options[] of the proj
//  */
// export function getOfficeXMLAddinHostProjectTemplateName(host: string, proj: string): string {
//   return OfficeAddinProjectConfig[host][proj].localTemplate;
// }

// /**
//  * Get the Repo Info of the proj
//  * @param host wxp
//  * @param proj proj name
//  * @param lang ts or js
//  * @returns Repo Info
//  */
// export function getOfficeXMLAddinHostProjectRepoInfo(
//   host: string,
//   proj: string,
//   lang: "ts" | "js"
// ): string {
//   const result = OfficeAddinProjectConfig[host][proj].lang?.[lang];
//   return !!result ? result : "";
// }
