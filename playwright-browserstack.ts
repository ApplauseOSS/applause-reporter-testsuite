const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

const BROWSERSTACK_USERNAME = 'ryanconner1';
const BROWSERSTACK_ACCESS_KEY = '5hGAzs76M2jasi4ujxxt';

const caps_chromium = {
    'browser': 'playwright-chromium', // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    'os': 'osx',
    'os_version': 'big sur',
    'name': 'Playwright-jest test on Chromium',
    'build': 'playwright-jest-build-1',
    'browserstack.username': BROWSERSTACK_USERNAME,
    'browserstack.accessKey': BROWSERSTACK_ACCESS_KEY,
    'client.playwrightVersion': clientPlaywrightVersion
};

const caps_firefox = {
    'browser': 'playwright-firefox', // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    'os': 'osx',
    'os_version': 'big sur',
    'name': 'Playwright-jest test on Firefox',
    'build': 'playwright-jest-build-1',
    'browserstack.username': BROWSERSTACK_USERNAME,
    'browserstack.accessKey': BROWSERSTACK_ACCESS_KEY,
    'client.playwrightVersion': clientPlaywrightVersion
};

const caps_webkit = {
    'browser': 'playwright-webkit', // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    'os': 'osx',
    'os_version': 'big sur',
    'name': 'Playwright-jest test on Webkit',
    'build': 'playwright-jest-build-1',
    'browserstack.username': BROWSERSTACK_USERNAME,
    'browserstack.accessKey': BROWSERSTACK_ACCESS_KEY,
    'client.playwrightVersion': clientPlaywrightVersion
};

module.exports = {
    connectOptions: {
        chromium: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps_chromium))}`
        },
        firefox: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps_firefox))}`
        },
        webkit: {
            wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps_webkit))}`
        }
      },
      browsers: ['chromium', 'firefox', 'webkit'],
}