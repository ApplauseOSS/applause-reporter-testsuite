"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datatapConnect = exports.bsConnect = exports.localHeadlessChrome = void 0;
const playwright_1 = require("playwright");
const remoteUrlBuilder_1 = require("./remoteUrlBuilder");
const DEFAULT_TIMEOUT = 60000;
/**
 * Launches a local headless Chromium browser
 *
 * @param timeoutMs The maximum amount of time to wait for the connection to be established
 * @returns The Browser Instance
 */
function localHeadlessChrome(timeoutMs) {
    return playwright_1.chromium.launch({ headless: true, timeout: timeoutMs || DEFAULT_TIMEOUT });
}
exports.localHeadlessChrome = localHeadlessChrome;
/**
 * Connects to a browserstack instance
 *
 * @param caps The capabilities to launch
 * @param timeoutMs The maximum amount of time to wait for the connection to be established
 * @returns The Browser Instance
 */
function bsConnect(caps, timeoutMs) {
    return playwright_1.chromium.connect((0, remoteUrlBuilder_1.buildBrowserStackUrl)(caps), { timeout: timeoutMs || DEFAULT_TIMEOUT });
}
exports.bsConnect = bsConnect;
/**
 * Connects to a browserstack instance
 *
 * @param caps The capabilities to launch
 * @param apiKey The apiKey to use to connect to datatap
 * @param timeoutMs The maximum amount of time to wait for the connection to be established
 * @returns The Browser Instance
 */
function datatapConnect(caps, apiKey, timeoutMs) {
    return playwright_1.chromium.connect((0, remoteUrlBuilder_1.buildDatatapUrl)(caps, apiKey || 'FILL_ME_IN'), { timeout: timeoutMs || DEFAULT_TIMEOUT });
}
exports.datatapConnect = datatapConnect;
