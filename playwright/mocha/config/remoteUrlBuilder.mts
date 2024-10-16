import { Capabilities, DatatapCapabilities } from './remoteCapabilities.mts';

const browserStackBaseUrl = 'wss://cdp.browserstack.com/playwright';
const datatapBaseUrl = 'wss://prod-datatap.cloud.applause.com/playwright';

export function buildUrl(baseUrl: string, caps: Capabilities | DatatapCapabilities): string {
    return `${baseUrl}?caps=${encodeURIComponent(JSON.stringify(caps))}`;
}

export function buildDatatapUrl(caps: Capabilities, apiKey: string): string {
    return buildUrl(datatapBaseUrl, {
        apiKey,
        providerUrl: buildBrowserStackUrl(caps),
    });
}

export function buildBrowserStackUrl(caps: Capabilities): string {
    return buildUrl(browserStackBaseUrl, caps);
}
