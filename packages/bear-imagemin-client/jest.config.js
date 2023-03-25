module.exports = {
    // coverageDirectory: "coverage",
    preset: 'ts-jest',
    testEnvironment: "node",
    roots: ['<rootDir>/src'],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
    // globals: {
    //     "ts-jest": {
    //         tsconfig: "tsconfig.test.json"
    //     }
    // }
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
