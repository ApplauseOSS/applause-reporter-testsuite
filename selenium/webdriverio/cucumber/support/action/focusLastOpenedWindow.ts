/**
 * Focus the last opened window
 */
 
export default async () => {
 
    /**
     * The last opened window
     * @type {Object}
     */
    const lastWindowHandle = (await browser.getWindowHandles()).slice(-1)[0];

    await browser.switchToWindow(lastWindowHandle);
};
