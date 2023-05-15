"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chromiumCaps = void 0;
const cp = __importStar(require("child_process"));
const clientPlaywrightVersion = cp.execSync('npx playwright --version')
    .toString()
    .trim()
    .split(' ')[1];
const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'FILL_ME_IN';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'FILL_ME_IN';
const BROWSERSTACK_CAPABILITIES = {
    'browserstack.username': BROWSERSTACK_USERNAME,
    'browserstack.accessKey': BROWSERSTACK_ACCESS_KEY,
    'client.playwrightVersion': clientPlaywrightVersion,
};
function chromiumCaps(name, build) {
    return {
        browser: 'playwright-chromium',
        os: 'osx',
        os_version: 'big sur',
        name: name || 'Playwright-mocha test on Chromium',
        build: build || 'playwright-mocha-build-1',
        ...BROWSERSTACK_CAPABILITIES,
    };
}
exports.chromiumCaps = chromiumCaps;
