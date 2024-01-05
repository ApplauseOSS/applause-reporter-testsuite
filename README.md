
# Automation Reporter Testsuite

Boilerplate project to show examples of integrating our Applause Reporter plugins with various frameworks.

## General configuration

Applause provides default configuration file in most cases.  

For Applause custom options, the default configuration utilizes `applause.json`, which must be modified to include your unique values.

Once `applause.json` is filled, run script `./scripts/copy-reporter-json.sh` to copy the configurations to the defined runner locations.

## Supported Test Runners

### WebDriverIO Runner

We support runing WebdriverIO (v7) tests with any test runner supported by the WebDriverIO Runner.

### Mocha Runner

We support the mocha test runner. This example uses Playwright to write tests.

### Cucumber Runner

We also support running tests with Cucumber outside of WebDriverIO

## Requirements

- Node version 12 or higher
- A preconfigured Selenium Grid, preinstalled browser driver or cloud provider account

Although this project works fine with NPM we recommend to use Yarn (>= 1.0.0) instead,  due to its speed & solid dependency locking mechanism. To keep things simple we use yarn in this guide, but feel free to replace this with NPM if that is what you are using.

Also this project doesn't cover setting up a proper test environment. You need to download specific browser driver yourself and run the prior starting tests or use a cloud provider like [SauceLabs](https://saucelabs.com/).

# WebDriver IO

## WebDriver IO - Cucumber

### How to write tests

Tests are written in [Gherkin syntax](https://cucumber.io/docs/gherkin/)
that means that you write down what's supposed to happen in a real language. All test files are located in
`./src/features/*` and have the file ending `.feature`. You will already find some test files in that
directory. They should demonstrate, how tests could look like. Just create a new file and write your first
test.

#### myFirstTest.feature

```gherkin
Feature:
    In order to keep my product stable
    As a developer or product manager
    I want to make sure that everything works as expected

Scenario: Check title of website after search
    Given I open the url "http://google.com"
    When I set "WebdriverIO" to the inputfield "#lst-ib"
    And I press "Enter"
    Then I expect that the title is "WebdriverIO - Google Search"

Scenario: Another test
    Given ...

```

This test opens the browser and navigates them to google.com to check if the title contains the search
query after doing a search. As you can see, it is pretty simple and understandable for everyone.

### How to run the tests

Start the local web server, then you can run

```sh
npm run test:selenium:wdio:cucumber
```

*please note* The WDIO runner uses the configuration file `wdio.conf.ts` by default.

### Configurations

To configure your tests, checkout the [`wdio.conf.ts`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/wdio.conf.ts) file in your test directory. It comes with a bunch of documented options you can choose from.

#### Environment-specific configurations

You can setup multiple configs for specific environments. Let's say you want to have a different `baseUrl` for
your local and pre-deploy tests. Use the `**wdio.conf.ts**` to set all general configs (like mochaOpts) that don't change.
They act as default values. For each different environment you can create a new config with the following name
scheme:

```txt
wdio.<ENVIRONMENT>.conf.ts
```

Now you can create a specific config for your pre-deploy tests:

##### wdio.STAGING.conf.ts

```js
var config = require('./wdio.conf.ts').config;

config.baseUrl = 'http://staging.example.com'

exports.config = config;
```

Your environment-specific config file will get merged into the default config file and overwrites the values you set.
To run a test in a specific environment just add the desired configuration file as the first parameter:

```sh
yarn run wdio wdio.STAGING.conf.ts
```

### Running single feature

Sometimes it's useful to only execute a single feature file, to do so use the following command:

```sh
npx wdio wdio.conf.ts --spec ./test/features/select.feature
```

### Using tags

If you want to run only specific tests you can mark your features with tags. These tags will be placed before each feature like so:

```gherkin
@Tag
Feature: ...
```

To run only the tests with specific tag(s) use the `--cucumberOpts.tagExpression=` parameter like so:

```sh
npx wdio wdio.conf.ts --cucumberOpts.tagExpression='@Tag or @AnotherTag'
```

For more tag options please see the [Cucumber.js documentation](https://docs.cucumber.io/tag-expressions/)

### Pending test

If you have failing or unimplemented tests you can mark them as "Pending" so they will get skipped.

```gherkin
// skip whole feature file
@Pending
Feature: ...

// only skip a single scenario
@Pending
Scenario: ...
```

### Adding new steps and snippets

The predefined snippets allow you to do a lot of common things but you might need extra snippets which
are better aligned with your aims. To do so you will find all step definitions in `./src/steps`. They
are separated in `given`, `when` and `then`.

You define your snippet using regular expressions. This is pretty powerful as it allows you to create complex
sentences with multiple options. Everything that's within `"([^"]*)?"` gets captured and appended to the
callback. The last argument is always a callback function that you need to call when your step is done.
You can access the browser and your WebdriverIO instance with `browser`.

To assert values this boilerplate project uses WebdriverIOs embedded assertion library called [expect-webdriverio](https://www.npmjs.com/package/expect-webdriverio).

### Comments

You can add additional descriptive comments in your feature files.

```gherkin
###
  This is a
  block comment
###
Feature: As a bystander
    I can watch bottles falling from a wall
    So that I can be mildly amused

# This is a single line comment
Scenario: check if username is present
    Given I login as "roboter" with password "test123"
    Then the username "roboter" should be present in the header
```

### List of predefined steps

Check out all predefined snippets. You can see how they get used in [`sampleSnippets.feature`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/src/features/sampleSnippets.feature).

#### Given steps

- `I open the (url|site) "([^"]*)?"` - Open a site in the current browser window/tab
- `the element "([^"]*)?" is( not)* displayed` - Check the (in)visibility of an element
- `the element "([^"]*)?" is( not)* enabled` - Check if an element is (not) enabled
- `the element "([^"]*)?" is( not)* selected` - Check if an element is (not) selected
- `the checkbox "([^"]*)?" is( not)* checked` - Check if a checkbox is (not) checked
- `there is (an|no) element "([^"]*)?" on the page` - Check if an element (does not) exist
- `the title is( not)* "([^"]*)?"` - Check the title of the current browser window/tab
- `the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"` - Compare the text of two elements
- `the (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"` - Check if an element contains the given text
- `the (button|element) "([^"]*)?"( not)* contains any text` - Check if an element does not contain any text
- `the (button|element) "([^"]*)?" is( not)* empty` - Check if an element is empty
- `the page url is( not)* "([^"]*)?"` - Check the url of the current browser window/tab
- `the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"` - Check the value of an element's (css) attribute
- `the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"` - Check the value of a cookie
- `the cookie "([^"]*)?" does( not)* exist` - Check the existence of a cookie
- `the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)` - Check the width/height of an element
- `the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis` - Check the position of an element
- `I have a screen that is ([\d]+) by ([\d]+) pixels` - Set the browser size to a given size
- `I have closed all but the first (window|tab)` - Close all but the first browser window/tab
- `a (alertbox|confirmbox|prompt) is( not)* opened` - Check if a modal is opened

#### Then steps

- `I expect that the title is( not)* "([^"]*)?"` - Check the title of the current browser window/tab
- `I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times` - Checks that the element is on the page a specific number of times
- `I expect that element "([^"]*)?" is( not)* visible` - Check if a certain element is visible
- `I expect that element "([^"]*)?" becomes( not)* visible` - Check if a certain element becomes visible
- `I expect that element "([^"]*)?" is( not)* within the viewport` - Check if a certain element is within the current viewport
- `I expect that element "([^"]*)?" does( not)* exist` - Check if a certain element exists
- `I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"` - Compare the text of two elements
- `I expect that (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"` - Check if an element or input field contains the given text
- `I expect that (button|element) "([^"]*)?"( not)* contains any text` - Check if an element or input field contains any text
- `I expect that (button|elementelement) "([^"]*)?" is( not)* empty` - Check if an element or input field is empty
- `I expect that the url is( not)* "([^"]*)?"` - Check if the the URL of the current browser window/tab is a certain string
- `I expect that the path is( not)* "([^"]*)?"` - Check if the path of the URL of the current browser window/tab is a certain string
- `I expect the url to( not)* contain "([^"]*)?"` - Check if the URL of the current browser window/tab contains a certain string
- `I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"` - Check the value of an element's (css) attribute
- `I expect that checkbox "([^"]*)?" is( not)* checked` - Check if a check-box is (not) checked
- `I expect that element "([^"]*)?" is( not)* selected` - Check if an element is (not) selected
- `I expect that element "([^"]*)?" is( not)* enabled` - Check if an element is (not) enabled
- `I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"` - Check if a cookie with a certain name contains a certain value
- `I expect that cookie "([^"]*)?"( not)* exists` - Check if a cookie with a certain name exist
- `I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)` - Check the width/height of an element
- `I expect that element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis` - Check the position of an element
- `I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"` - Check if an element has a certain class
- `I expect a new (window|tab) has( not)* been opened` - Check if a new window/tab has been opened
- `I expect the url "([^"]*)?" is opened in a new (tab|window)` - Check if a URL is opened in a new browser window/tab
- `I expect that element "([^"]*)?" is( not)* focused` - Check if an element has the focus
- `I wait on element "([^"]*)?"( for (\d+)ms)*( to( not)* (be checked|be enabled|be selected|be visible|contain a text|contain a value|exist))*` - Wait for an element to be checked, enabled, selected, visible, contain a certain value or text or to exist
- `I expect that a (alertbox|confirmbox|prompt) is( not)* opened` - Check if a modal is opened
- `I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "$text"` - Check the text of a modal

#### When steps

- `I (click|doubleclick) on the (link|button|element) "([^"]*)?"` - (Double)click a link, button or element
- `I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"` - Add or set the content of an input field
- `I clear the inputfield "([^"]*)?"` - Clear an input field
- `I drag element "([^"]*)?" to element "([^"]*)?"` - Drag an element to another element
- `I submit the form "([^"]*)?"` - Submit a form
- `I pause for (\d+)ms` - Pause for a certain number of milliseconds
- `I set a cookie "([^"]*)?" with the content "([^"]*)?"` - Set the content of a cookie with the given name to  the given string
- `I delete the cookie "([^"]*)?"` - Delete the cookie with the given name
- `I press "([^"]*)?"` - Press a given key. You’ll find all supported characters [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions). To do that, the value has to correspond to a key from the table.
- `I (accept|dismiss) the (alertbox|confirmbox|prompt)` - Accept or dismiss a modal window
- `I enter "([^"]*)?" into the prompt` - Enter a given text into a modal prompt
- `I scroll to element "([^"]*)?"` - Scroll to a given element
- `I close the last opened (window|tab)` - Close the last opened browser window/tab
- `I focus the last opened (window|tab)` - Focus the last opened browser window/tab
- `I log in to site with username "([^"]*)?" and password "([^"]*)?"` - Login to a site with the given username and password
- `I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"` - Select an option based on it's index
- `I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"` - Select an option based on its name, value or visible text
- `I move to element "([^"]*)?"( with an offset of (\d+),(\d+))` - Move the mouse by an (optional) offset of the specified element

## WebDriver IO - Mocha

Similar to "WebDriver IO - Cucumber", but without all of the BDD parts (unless configured to do BDD).

### How to write tests

Tests are written in the traditional JS style.  Access to the WebDriver is given through the `browser` global variable.

### How to run the tests

```sh
npm run test:selenium:wdio:mocha
```

# Mocha with Playwright

## How to run the playwright tests

Start the local web server, the you can run

```sh
npm run test:playwright
```

## Configuration

To configure the tests to run against the Applause framework, you will need to fill in `playwright/applause.json` with your information this will enable reporting to the automation api. You will then need to use the Mocha Reporter by specifying the reporter in the mocha command: `mocha --reporter ./node_modules/mocha-applause-reporter/dist/index.js`

You can also point your tests at the applause datatap proxy and to a playwright provider by using the following:

```javascript
const bsCaps = {
    'browser': 'playwright-chromium',
    'os': 'osx',
    'os_version': 'big sur',
    'name': 'Playwright-mocha test on Chromium',
    'build': 'playwright-mocha-build-1',
    'browserstack.username': 'YOUR_USERNAME',
    'browserstack.accessKey': 'YOUR_ACCESS_KEY',
    'client.playwrightVersion': clientPlaywrightVersion
};

const applauseCapabilities = {
    'applause:options': {
        apiKey: 'PASS_ME_A_KEY',
        providerUrl: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(bsCaps))}`
}
}
const browser = await chromium.connectOverCDP(`ws://datatapURI/cdp?caps=${encodeURIComponent(JSON.stringify(applauseCapabilities))}`);
```
