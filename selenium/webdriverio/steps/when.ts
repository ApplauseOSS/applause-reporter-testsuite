import { When } from '@cucumber/cucumber';

import clearInputField from '../support/action/clearInputField.ts';
import clickElement from '../support/action/clickElement.ts';
import closeLastOpenedWindow from '../support/action/closeLastOpenedWindow.ts';
import deleteCookies from '../support/action/deleteCookies.ts';
import dragElement from '../support/action/dragElement.ts';
import focusLastOpenedWindow from '../support/action/focusLastOpenedWindow.ts';
import handleModal from '../support/action/handleModal.ts';
import moveTo from '../support/action/moveTo.ts';
import pause from '../support/action/pause.ts';
import pressButton from '../support/action/pressButton.ts';
import scroll from '../support/action/scroll.ts';
import selectOption from '../support/action/selectOption.ts';
import selectOptionByIndex from '../support/action/selectOptionByIndex.ts';
import setCookie from '../support/action/setCookie.ts';
import setInputField from '../support/action/setInputField.ts';
import setPromptText from '../support/action/setPromptText.ts';

When(
    /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
    clickElement
);

When(
    /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    setInputField
);

When(
    /^I clear the inputfield "([^"]*)?"$/,
    clearInputField
);

When(
    /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
    dragElement
);

When(
    /^I pause for (\d+)ms$/,
    pause
);

When(
    /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
    setCookie
);

When(
    /^I delete the cookie "([^"]*)?"$/,
    deleteCookies
);

When(
    /^I press "([^"]*)?"$/,
    pressButton
);

When(
    /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    handleModal
);

When(
    /^I enter "([^"]*)?" into the prompt$/,
    setPromptText
);

When(
    /^I scroll to element "([^"]*)?"$/,
    scroll
);

When(
    /^I close the last opened (window|tab)$/,
    closeLastOpenedWindow
);

When(
    /^I focus the last opened (window|tab)$/,
    focusLastOpenedWindow
);

When(
    /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
    selectOptionByIndex
);

When(
    /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
    selectOption
);

When(
    /^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
    moveTo
);
