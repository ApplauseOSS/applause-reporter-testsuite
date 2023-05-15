import { Capabilities, DatatapCapabilities } from './remoteCapabilities';

const browserStackBaseUrl = 'wss://cdp.browserstack.com/playwright';
const datatapBaseUrl = 'ws://localhost:8085/cdp';

export function buildUrl(baseUrl: string, caps: Capabilities | DatatapCapabilities): string {
    return `${baseUrl}?caps=${encodeURIComponent(JSON.stringify(caps))}`;
}

export function buildDatatapUrl(caps: Capabilities, apiKey: string): string {
    return buildUrl(datatapBaseUrl, {
        'applause:options': {
            apiKey,
            providerUrl: buildBrowserStackUrl(caps),
        },
    });
}

export function buildBrowserStackUrl(caps: Capabilities): string {
    return buildUrl(browserStackBaseUrl, caps);
}
