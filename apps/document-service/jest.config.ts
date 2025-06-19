import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../../tsconfig.base.json';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './src',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testRegex: '.*\\.spec\\.ts$',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../../',
    }),
};

export default config;