import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['<rootDir>/tests/**/*.spec.ts', '<rootDir>/tests/**/*.test.ts'],
}

export default config
