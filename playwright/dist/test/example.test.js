"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const playwrightLauncher_1 = require("../config/playwrightLauncher");
const timeoutMs = 10000;
describe('example mocha test', function () {
    this.timeout(timeoutMs);
    let browser;
    let context;
    let page;
    beforeEach(async () => {
        // BrowserStack Specific Capabilities.
        // Headless Chromium
        browser = await (0, playwrightLauncher_1.localHeadlessChrome)();
        // Connect to BrowserStack Directly:
        // browser = await bsConnect(chromiumCaps());
        // Or connect to datatap
        // browser = await datatapConnect(chromiumCaps(), 'apiKey');
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://admin.stage.automation.applause.com/assets/sdktestpage.html', { timeout: 10000 });
    });
    afterEach(async () => {
        await browser.close();
    });
    it('example test', async () => {
        const title = await page.title();
        (0, chai_1.expect)(title).to.equal('HTML5 Test Page');
    });
});
