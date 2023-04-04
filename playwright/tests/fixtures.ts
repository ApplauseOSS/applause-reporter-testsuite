import { test } from '@playwright/test';
import * as cp from 'child_process';
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];

const BROWSERSTACK_USERNAME = 'ryanconner1';
const BROWSERSTACK_ACCESS_KEY = '5hGAzs76M2jasi4ujxxt';

// BrowserStack Specific Capabilities.
const caps = {
  browser: 'chrome',
  browser_version: 'unknown',
  os: 'osx',
  os_version: 'catalina',
  name: 'My first playwright test',
  build: 'playwright-build-1',
  'browserstack.username': BROWSERSTACK_USERNAME,
  'browserstack.accessKey': BROWSERSTACK_ACCESS_KEY,
  'browserstack.local': false,
  'client.playwrightVersion': clientPlaywrightVersion,

};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name: string, title: string) => {
  let combination = name.split(/@browserstack/)[0];
  let [browerCaps, osCaps] = combination.split(/:/);
  let [browser, browser_version] = browerCaps.split(/@/);
  let osCapsSplit = osCaps.split(/ /);
  let os = osCapsSplit.shift();
  let os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = title;
};

const isHash = (entity: any) => Boolean(entity && typeof(entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash: any, keys: string[]) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const isUndefined = (val: any) => (val === undefined || val === null || val === '');
const evaluateSessionStatus = (status: string) => {
  if (!isUndefined(status)) {
    status = status.toLowerCase();
  }
  if (status === "passed") {
    return "passed";
  } else if (status === "failed" || status === "timedout") {
    return "failed";
  } else {
    return "";
  }
}
const exTest = test.extend({
  page: async ({ page, playwright }, use, testInfo: any) => {
    // Use BrowserStack Launched Browser according to capabilities for cross-browser testing.
    if (testInfo.project.name.match(/browserstack/)) {
      patchCaps(testInfo.project.name, `${testInfo.title}`);
      const applauseCaps = {
        'applause:options': {
            apiKey: 'test',
            providerUrl: 'wss://cdp.browserstack.com/playwright?caps=%7B%22browser%22%3A%22playwright-firefox%22%2C%22browser_version%22%3A%22latest%22%2C%22os%22%3A%22OSX%22%2C%22os_version%22%3A%22Catalina%22%2C%22name%22%3A%22has%20title%22%2C%22build%22%3A%22playwright-build-1%22%2C%22browserstack.username%22%3A%22ryanconner1%22%2C%22browserstack.accessKey%22%3A%225hGAzs76M2jasi4ujxxt%22%2C%22browserstack.local%22%3Afalse%2C%22client.playwrightVersion%22%3A%221.32.2%22%7D'
        }
    }
    console.log(`wss://cdp.browserstack.com/playwright?caps=` +
`${encodeURIComponent(JSON.stringify(caps))}`)
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint:
        `ws://localhost:8085/cdp?caps=` + `${encodeURIComponent(JSON.stringify(applauseCaps))}`
      });
      const vContext = await vBrowser.newContext(testInfo.project.use);
      const vPage = await vContext.newPage();
      await use(vPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: evaluateSessionStatus(testInfo.status),
          reason: nestedKeyValue(testInfo, ['error', 'message'])
        },
      };
      await vPage.evaluate(() => {},
      `browserstack_executor: ${JSON.stringify(testResult)}`);
      await vPage.close();
      await vBrowser.close();
    } else {
      use(page);
    }
  },
});

export {
    exTest as test
}