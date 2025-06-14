import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    rootDir: '.',
    testEnvironment: 'node',
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        '^@auth/(.*)$': '<rootDir>/apps/auth-service/src/$1',
        '^@common/(.*)$': '<rootDir>/libs/common/src/$1',
        '^@events/(.*)$': '<rootDir>/libs/events/src/$1',
    },
};

export default config;