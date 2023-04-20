/**
 * Focus the last opened window
 */
/* eslint-disable no-unused-vars */
export default async () => {
/* eslint-enable no-unused-vars */
    /**
     * The last opened window
     * @type {Object}
     */
    const lastWindowHandle = (await browser.getWindowHandles()).slice(-1)[0];

    await browser.switchToWindow(lastWindowHandle);
};
