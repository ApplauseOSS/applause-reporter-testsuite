import { Browser, chromium } from 'playwright';
import { Capabilities } from './remoteCapabilities.mjs';
import { buildBrowserStackUrl, buildDatatapUrl } from './remoteUrlBuilder.mts';

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
/**
 * Connects to a browserstack instance
 *
 * @param caps The capabilities to launch
 * @param apiKey The apiKey to use to connect to datatap
 * @param timeoutMs The maximum amount of time to wait for the connection to be established
 * @returns The Browser Instance
 */
export function datatapConnect(caps: Capabilities, apiKey?: string, timeoutMs?: number): Promise<Browser> {
    return chromium.connect(
        buildDatatapUrl(caps, apiKey || 'FILL_ME_IN'),
        { timeout: timeoutMs || DEFAULT_TIMEOUT }
    );
}
