/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        [
            './node_modules/jest-applause-reporter/dist/index.cjs', 
            {
                "apiKey": "GIVE_ME_A_KEY",
                "productId": 0,
                "testRail": {
                    "projectId": 0,
                    "suiteId": 0,
                    "planName": "Example Plan Name",
                    "runName": "Example Run Name"}
            }
        ]
    ]
};