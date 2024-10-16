import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { registerSessionId } from 'mocha-applause-reporter/hooks';

import { loadConfig } from 'applause-reporter-common';

const API_KEY = loadConfig().apiKey;
const PRODUCT_ID = loadConfig().productId;
export const SELENIUM_GRID = 'integration-auto-proxy-new.devcloud.applause.com:443';

describe('example mocha test', function mochaDescribe() {
    this.timeout(180_000);
    let driver: WebDriver;

    beforeEach('setup driver', async function driverCreate() {
        driver = await new Builder()
            .usingServer(`https://ApplauseKey:${API_KEY}@${SELENIUM_GRID}/wd/hub`)
            .withCapabilities(new Capabilities({
                browserName: 'chrome',
                'applause:options': {
                    apiKey: API_KEY,
                    provider: 'BrowserStack',
                    productId: PRODUCT_ID,
                    runName: 'RC Test',
                },
            }))
            .build();

        const myId = (await driver.getSession()).getId();
        registerSessionId.apply(this, [myId]);
    });

    it('example test', async () => {
        await driver.get('https://admin.stage.automation.applause.com/assets/sdktestpage.html');
    });

    this.afterEach(async () => {
        await driver.quit();
    });
});
