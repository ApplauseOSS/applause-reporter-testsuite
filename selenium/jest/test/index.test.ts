import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { loadConfig } from 'applause-reporter-common'

const API_KEY = loadConfig().apiKey;
const PRODUCT_ID = loadConfig().productId;

describe('some suite', () => {    
  let driver: WebDriver

  beforeEach(async function() {
      driver = await new Builder().usingServer(`https://ApplauseKey:${API_KEY}@integration-auto-proxy-new.devcloud.applause.com:443/wd/hub`)
          .withCapabilities(new Capabilities({
              browserName: 'chrome',
              'applause:options': {
                  apiKey: API_KEY,
                  provider: 'BrowserStack',
                  productId: PRODUCT_ID,
                  runName: 'RC Test'
              }
          }))
          .build();
      let myId = (await driver.getSession()).getId();
      globalThis.driverRegistry.recordSessionId(expect.getState().currentTestName!, myId);
  }, 60_000)

  it('example test', async () => {
      await driver.get("https://admin.stage.automation.applause.com/assets/sdktestpage.html")
  });

  afterEach(async () => {
     await driver.quit();
  })
});
