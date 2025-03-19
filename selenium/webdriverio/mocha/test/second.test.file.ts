describe('2nd test file for bug reproduction attempts mocha test', function() {

    it('Search for "Mercury"', async function() {
        await browser.url('https://www.google.com');
        const searchBox = await $('textarea');
        await searchBox.setValue('Mercury');
        // await browser.keys('Enter');
        await browser.pause(2000); // wait for search results to load
        const searchTerm = await searchBox.getValue();
        expect(searchTerm).toEqual('Mercury');
    });

    it('Search for "Venus"', async function() {
        await browser.url('https://www.google.com');
        const searchBox = await $('textarea');
        await searchBox.setValue('Venus');
        // await browser.keys('Enter');
        await browser.pause(2000); // wait for search results to load
        const searchTerm = await searchBox.getValue();
        expect(searchTerm).toEqual('Venus');
    });

    it('Search for "Earth"', async function() {
        await browser.url('https://www.google.com');
        const searchBox = await $('textarea');
        await searchBox.setValue('Earth');
        // await browser.keys('Enter');
        await browser.pause(2000); // wait for search results to load
        const searchTerm = await searchBox.getValue();
        expect(searchTerm).toEqual('Earth');
    });

    it('Search for "Mars"', async function() {
        await browser.url('https://www.google.com');
        const searchBox = await $('textarea');
        await searchBox.setValue('Mars');
        // await browser.keys('Enter');
        await browser.pause(2000); // wait for search results to load
        const searchTerm = await searchBox.getValue();
        expect(searchTerm).toEqual('Mars');
    });

});
