import { expect } from 'chai';
import {
    Browser,
    BrowserContext,
    Page
} from 'playwright';
import { bsConnect, datatapConnect, localHeadlessChrome } from '../config/playwrightLauncher';
import { chromiumCaps } from '../config/remoteCapabilities';

const timeoutMs = 10_000;
describe('example mocha test', function () {
    this.timeout(timeoutMs);
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeEach(async () => {
        // BrowserStack Specific Capabilities.
        // Headless Chromium
        browser = await localHeadlessChrome();

        // Connect to BrowserStack Directly:
        // browser = await bsConnect(chromiumCaps());

        // Or connect to datatap
        // browser = await datatapConnect(chromiumCaps(), 'apiKey');

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
