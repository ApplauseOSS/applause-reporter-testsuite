import { Then } from '@cucumber/cucumber';

import checkClass from '../support/check/checkClass.ts';
import checkContainsAnyText from '../support/check/checkContainsAnyText.ts';
import checkIsEmpty from '../support/check/checkIsEmpty.ts';
import checkContainsText from '../support/check/checkContainsText.ts';
import checkCookieContent from '../support/check/checkCookieContent.ts';
import checkCookieExists from '../support/check/checkCookieExists.ts';
import checkDimension from '../support/check/checkDimension.ts';
import checkEqualsText from '../support/check/checkEqualsText.ts';
import checkFocus from '../support/check/checkFocus.ts';
import checkInURLPath from '../support/check/checkInURLPath.ts';
import checkIsOpenedInNewWindow from '../support/check/checkIsOpenedInNewWindow.ts';
import checkModal from '../support/check/checkModal.ts';
import checkModalText from '../support/check/checkModalText.ts';
import checkNewWindow from '../support/check/checkNewWindow.ts';
import checkOffset from '../support/check/checkOffset.ts';
import checkProperty from '../support/check/checkProperty.ts';
import checkFontProperty from '../support/check/checkFontProperty.ts';
import checkSelected from '../support/check/checkSelected.ts';
import checkTitle from '../support/check/checkTitle.ts';
import checkTitleContains from '../support/check/checkTitleContains.ts';
import checkURL from '../support/check/checkURL.ts';
import checkURLPath from '../support/check/checkURLPath.ts';
import checkWithinViewport from '../support/check/checkWithinViewport.ts';
import compareText from '../support/check/compareText.ts';
import isEnabled from '../support/check/isEnabled.ts';
import isExisting from '../support/check/isExisting.ts';
import isVisible from '../support/check/isDisplayed.ts';
import waitFor from '../support/action/waitFor.ts';
import waitForVisible from '../support/action/waitForDisplayed.ts';
import checkIfElementExists from '../support/lib/checkIfElementExists.ts';
import { constructDefaultLogger } from 'applause-reporter-common';


export const logger = constructDefaultLogger();

Then(
    /^I expect that the title is( not)* "([^"]*)?"$/,
    checkTitle
);

Then(
    /^I expect that the title( not)* contains "([^"]*)?"$/,
    checkTitleContains
);

Then(
    /^I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times$/,
    checkIfElementExists
);

Then(
    /^I expect that element "([^"]*)?" is( not)* displayed$/,
    isVisible
);

Then(
    /^I expect that element "([^"]*)?" becomes( not)* displayed$/,
    waitForVisible
);

Then(
    /^I expect that element "([^"]*)?" is( not)* within the viewport$/,
    checkWithinViewport
);

Then(
    /^I expect that element "([^"]*)?" does( not)* exist$/,
    isExisting
);

Then(
    /^I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/,
    compareText
);

Then(
    /^I expect that (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    checkEqualsText
);

Then(
    /^I expect that (button|element|container) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    checkContainsText
);

Then(
    /^I expect that (button|element) "([^"]*)?"( not)* contains any text$/,
    checkContainsAnyText
);

Then(
    /^I expect that (button|element) "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Then(
    /^I expect that the url is( not)* "([^"]*)?"$/,
    checkURL
);

Then(
    /^I expect that the path is( not)* "([^"]*)?"$/,
    checkURLPath
);

Then(
    /^I expect the url to( not)* contain "([^"]*)?"$/,
    checkInURLPath
);

Then(
    /^I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkProperty
);

Then(
    /^I expect that the font( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkFontProperty
);

Then(
    /^I expect that checkbox "([^"]*)?" is( not)* checked$/,
    checkSelected
);

Then(
    /^I expect that element "([^"]*)?" is( not)* selected$/,
    checkSelected
);

Then(
    /^I expect that element "([^"]*)?" is( not)* enabled$/,
    isEnabled
);

Then(
    /^I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"$/,
    checkCookieContent
);

Then(
    /^I expect that cookie "([^"]*)?"( not)* exists$/,
    checkCookieExists
);

Then(
    /^I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    checkDimension
);

Then(
    /^I expect that element "([^"]*)?" is( not)* positioned at ([\d+.?\d*]+)px on the (x|y) axis$/,
    checkOffset
);

Then(
    /^I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"$/,
    checkClass
);

Then(
    /^I expect a new (window|tab) has( not)* been opened$/,
    checkNewWindow
);

Then(
    /^I expect the url "([^"]*)?" is opened in a new (tab|window)$/,
    checkIsOpenedInNewWindow
);

Then(
    /^I expect that element "([^"]*)?" is( not)* focused$/,
    checkFocus
);

Then(
    /^I wait on element "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be displayed|contain a text|contain a value|exist))*$/,
    {
        wrapperOptions: {
            retry: 3,
        },
    },
    waitFor
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/,
    checkModal
);

Then(
    /^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/,
    checkModalText
);
Then(
    'I take a screenshot',
    async () => {
        logger.info("Hello");
        await browser.saveScreenshot("./test-png.png");
    }
)
