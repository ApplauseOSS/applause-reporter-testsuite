import { Browser, chromium } from 'playwright';
import { Capabilities } from './remoteCapabilities.mjs';
import { buildBrowserStackUrl } from './remoteUrlBuilder.mts';

const DEFAULT_TIMEOUT = 60_000;

/**
 * Launches a local headless Chromium browser
 *
 * @param timeoutMs The maximum amount of time to wait for the connection to be established
 * @returns The Browser Instance
 */
export function localHeadlessChrome(timeoutMs?: number): Promise<Browser> {
    return chromium.launch({ headless: true, timeout: timeoutMs || DEFAULT_TIMEOUT });
}

/**
 * Connects to a browserstack instance
 *
 * @param caps The capabilities to launch
 * @param timeoutMs The maximum amount of time to wait for the connection to be established
 * @returns The Browser Instance
 */
export function bsConnect(caps: Capabilities, timeoutMs?: number): Promise<Browser> {
    return chromium.connect(
        buildBrowserStackUrl(caps),
        { timeout: timeoutMs || DEFAULT_TIMEOUT }
    );
}
