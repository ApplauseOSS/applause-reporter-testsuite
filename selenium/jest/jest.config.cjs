/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalSetup: './node_modules/jest-applause-reporter/dist/global-setup.cjs'
};