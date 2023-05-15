"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBrowserStackUrl = exports.buildDatatapUrl = exports.buildUrl = void 0;
const browserStackBaseUrl = 'wss://cdp.browserstack.com/playwright';
const datatapBaseUrl = 'ws://localhost:8085/cdp';
function buildUrl(baseUrl, caps) {
    return `${baseUrl}?caps=${encodeURIComponent(JSON.stringify(caps))}`;
}
exports.buildUrl = buildUrl;
function buildDatatapUrl(caps, apiKey) {
    return buildUrl(datatapBaseUrl, {
        'applause:options': {
            apiKey,
            providerUrl: buildBrowserStackUrl(caps),
        },
    });
}
exports.buildDatatapUrl = buildDatatapUrl;
function buildBrowserStackUrl(caps) {
    return buildUrl(browserStackBaseUrl, caps);
}
exports.buildBrowserStackUrl = buildBrowserStackUrl;
