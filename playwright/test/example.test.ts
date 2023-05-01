import { expect } from 'chai';
import {
    Browser,
    BrowserContext,
    chromium,
    Page
} from 'playwright';

// import * as cp from 'child_process';
// const clientPlaywrightVersion =
// cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

describe('example mocha test', function () {
    this.timeout(10000);
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeEach(async () => {
        // BrowserStack Specific Capabilities.
        // Headless Chromium
        browser = await chromium.launch({ headless: true });

        // Connect to BrowserStack Directly:
        // const caps = {
        //     'browser': 'playwright-chromium',
        //     'os': 'osx',
        //     'os_version': 'big sur',
        //     'name': 'Playwright-mocha test on Chromium',
        //     'build': 'playwright-mocha-build-1',
        //     'browserstack.username': 'YOUR_USERNAME',
        //     'browserstack.accessKey': 'YOUR_ACCESS_KEY',
        //     'client.playwrightVersion': clientPlaywrightVersion
        // };
        // browser = await chromium.connectOverCDP(wss://cdp.browserstack.com/playwright?`
        // + `caps=${encodeURIComponent(JSON.stringify(caps)));

        // Connect to Applause DataTap:
        //         const applauseCapabilities = {
        //     'applause:options': {
        //         apiKey: 'abc',
        //         providerUrl: `wss://cdp.browserstack.com/playwright?`
        // + `caps=${encodeURIComponent(JSON.stringify(caps))}`
        //     }
        // }
        // browser = await chromium.connectOverCDP(`ws://localhost:8085/cdp?caps=`
        // + `${encodeURIComponent(JSON.stringify(applauseCapabilities))}`);
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto(
            'https://admin.stage.automation.applause.com/assets/sdktestpage.html',
            { timeout: 10000 }
        );
    });

    afterEach(async () => {
        await browser.close();
    });

    it('example test', async () => {
        const title = await page.title();
        expect(title).to.equal('HTML5 Test Page');
    });
});
