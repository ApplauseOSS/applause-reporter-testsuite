/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", { isolatedModules: true }],
  },
  globalSetup: "./node_modules/jest-applause-reporter/dist/global-setup.cjs",
  preset: "ts-jest",
};