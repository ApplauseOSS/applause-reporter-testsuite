let baseConfig = {
    paths: ['test/smoke/**/*.feature'],
    import: ['test/**/*.ts'],
}

export const reporting = {
    ...baseConfig, 
    format: ["cucumber-applause-reporter"],
}

export default baseConfig;