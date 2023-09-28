import {
  Given,
  IWorld,
  Then,
  When,
  Before,
  setDefaultTimeout,
  After,
} from '@cucumber/cucumber';
import assert from 'assert';
import { loadConfig } from 'applause-reporter-common';
import { APPLAUSE_SESSION_ID_ATTACHMENT } from 'cucumber-applause-reporter';
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';

const API_KEY = loadConfig().apiKey;
const PRODUCT_ID = loadConfig().productId;

interface CustomWorld extends IWorld {
  driver: WebDriver;
  today: string;
  target: string;
}

setDefaultTimeout(60000);

Before(async function (this: CustomWorld) {
  this.driver = await new Builder()
    .usingServer(
      `https://ApplauseKey:${API_KEY}@integration-auto-proxy-new.devcloud.applause.com:443/wd/hub`
    )
    .withCapabilities(
      new Capabilities({
        browserName: 'chrome',
        'applause:options': {
          apiKey: API_KEY,
          provider: 'BrowserStack',
          productId: PRODUCT_ID,
          runName: 'RC Test',
        },
      })
    )
    .build();
  const myId = (await this.driver.getSession()).getId();
  this.attach(myId, {
    fileName: APPLAUSE_SESSION_ID_ATTACHMENT,
    mediaType: 'text/plain',
  });
});

After(async function (this: CustomWorld) {
  await this.driver.quit();
});

function dayToNumber(day: string): number {
  switch (day.toUpperCase()) {
    case 'SUNDAY':
      return 0;
    case 'MONDAY':
      return 1;
    case 'TUESDAY':
      return 2;
    case 'WEDNESDAY':
      return 3;
    case 'THURSDAY':
      return 4;
    case 'FRIDAY':
      return 5;
    case 'SATURDAY':
      return 6;
    default:
      throw new Error('Invalid day: ' + day);
  }
}

function getDifferenceInDays(today: string, target: string): number {
  const todayInt = dayToNumber(today);
  const targetInt = dayToNumber(target);
  return (targetInt - todayInt + 7) % 7;
}

Given('Today is {string}', function (this: CustomWorld, today: string) {
  this.today = today;
});

When(
  'I ask how many days until {string}',
  function (this: CustomWorld, target: string) {
    this.target = target;
  }
);

Then(
  'I should be told it is {int} days away',
  function (this: CustomWorld, expectedDays: number) {
    assert.strictEqual(
      getDifferenceInDays(this.today, this.target),
      expectedDays
    );
  }
);
