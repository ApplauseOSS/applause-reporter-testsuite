import * as cp from 'child_process';

const clientPlaywrightVersion = cp.execSync('npx playwright --version')
    .toString()
    .trim()
    .split(' ')[1];
const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'FILL_ME_IN';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'FILL_ME_IN';

const BROWSERSTACK_CAPABILITIES = {
    'browserstack.username': BROWSERSTACK_USERNAME,
    'browserstack.accessKey': BROWSERSTACK_ACCESS_KEY,
    'client.playwrightVersion': clientPlaywrightVersion,
};

export interface BaseCapabilities {
    browser: string,
    os: string,
    os_version: string;
    name: string;
    build: string;
}

export interface BrowserStackCapabilities {
    'browserstack.username': string;
    'browserstack.accessKey': string;
    'client.playwrightVersion': string;
}

export interface DatatapCapabilities {
    apiKey: string;
    providerUrl: string;
}

export type Capabilities = BaseCapabilities & BrowserStackCapabilities;

export function chromiumCaps(name?: string, build?: string): Capabilities {
    return {
        browser: 'playwright-chromium',
        os: 'osx',
        os_version: 'big sur',
        name: name || 'Playwright-mocha test on Chromium',
        build: build || 'playwright-mocha-build-1',
        ...BROWSERSTACK_CAPABILITIES,
    };
}
