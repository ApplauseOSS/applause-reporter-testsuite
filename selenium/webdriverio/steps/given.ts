import { Given } from '@cucumber/cucumber';

import checkContainsAnyText from '../support/check/checkContainsAnyText.ts';
import checkIsEmpty from '../support/check/checkIsEmpty.ts';
import checkContainsText from '../support/check/checkContainsText.ts';
import checkCookieContent from '../support/check/checkCookieContent.ts';
import checkCookieExists from '../support/check/checkCookieExists.ts';
import checkDimension from '../support/check/checkDimension.ts';
import checkElementExists from '../support/check/checkElementExists.ts';
import checkEqualsText from '../support/check/checkEqualsText.ts';
import checkModal from '../support/check/checkModal.ts';
import checkOffset from '../support/check/checkOffset.ts';
import checkProperty from '../support/check/checkProperty.ts';
import checkSelected from '../support/check/checkSelected.ts';
import checkTitle from '../support/check/checkTitle.ts';
import checkUrl from '../support/check/checkURL.ts';
import closeAllButFirstTab from '../support/action/closeAllButFirstTab.ts';
import compareText from '../support/check/compareText.ts';
import isEnabled from '../support/check/isEnabled.ts';
import isDisplayed from '../support/check/isDisplayed.ts';
import openWebsite from '../support/action/openWebsite.ts';
import setWindowSize from '../support/action/setWindowSize.ts';

Given(
    /^I open the (url|site) "([^"]*)?"$/,
    openWebsite
);

Given(
    /^the element "([^"]*)?" is( not)* displayed$/,
    isDisplayed
);

Given(
    /^the element "([^"]*)?" is( not)* enabled$/,
    isEnabled
);

Given(
    /^the element "([^"]*)?" is( not)* selected$/,
    checkSelected
);

Given(
    /^the checkbox "([^"]*)?" is( not)* checked$/,
    checkSelected
);

Given(
    /^there is (an|no) element "([^"]*)?" on the page$/,
    checkElementExists
);

Given(
    /^the title is( not)* "([^"]*)?"$/,
    checkTitle
);

Given(
    /^the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"$/,
    compareText
);

Given(
    /^the (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    checkEqualsText
);

Given(
    /^the (button|element|container) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    checkContainsText
);

Given(
    /^the (button|element) "([^"]*)?"( not)* contains any text$/,
    checkContainsAnyText
);

Given(
    /^the (button|element) "([^"]*)?" is( not)* empty$/,
    checkIsEmpty
);

Given(
    /^the page url is( not)* "([^"]*)?"$/,
    checkUrl
);

Given(
    /^the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    checkProperty
);

Given(
    /^the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"$/,
    checkCookieContent
);

Given(
    /^the cookie "([^"]*)?" does( not)* exist$/,
    checkCookieExists
);

Given(
    /^the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    checkDimension
);

Given(
    /^the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/,
    checkOffset
);

Given(
    /^I have a screen that is ([\d]+) by ([\d]+) pixels$/,
    setWindowSize
);

Given(
    /^I have closed all but the first (window|tab)$/,
    closeAllButFirstTab
);

Given(
    /^a (alertbox|confirmbox|prompt) is( not)* opened$/,
    checkModal
);
