import type { Config } from 'jest';
import rootConfig from '../../jest.config';

const config: Config = {
  ...rootConfig,
  rootDir: './',
  moduleNameMapper: {
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@common/(.*)$': '<rootDir>/../../libs/common/src/$1',
    '^@events/(.*)$': '<rootDir>/../../libs/events/src/$1',
    '^@shared/(.*)$': '<rootDir>/../../libs/shared/$1',
  },
};

export default config;
