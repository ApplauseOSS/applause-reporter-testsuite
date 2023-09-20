let baseConfig = {
    paths: ['test/smoke/**/*.feature'],
    import: ['test/**/*.ts'],
}

export const reporting = {
    ...baseConfig, 
    format: ["cucumber-applause-reporter"],
    formatOptions: {
        apiKey: "GIVE_ME_A_KEY",
        productId: 0,
        testRail: {
            projectId: 0,
            suiteId: 0,
            planName: "Example Plan Name",
            runName: "Example Run Name"
        }
    }
}

export default baseConfig;