/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", { isolatedModules: true }],
  },
  reporters: [
    [
        './node_modules/jest-applause-reporter/dist/index.cjs', 
        {

        }
    ]
  ],
  globalSetup: "./node_modules/jest-applause-reporter/dist/global-setup.cjs",
  preset: "ts-jest",
};