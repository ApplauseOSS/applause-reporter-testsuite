import { Capabilities } from './remoteCapabilities.mts';

const browserStackBaseUrl = 'wss://cdp.browserstack.com/playwright';

export function buildUrl(baseUrl: string, caps: Capabilities): string {
    return `${baseUrl}?caps=${encodeURIComponent(JSON.stringify(caps))}`;
}

export function buildBrowserStackUrl(caps: Capabilities): string {
    return buildUrl(browserStackBaseUrl, caps);
}
