export default {
  verbose: true,
  setupFilesAfterEnv: ['./__test__/setupTests.tsx'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{js,tsx,ts}'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/public'],
  coverageDirectory: 'coverage',
  rootDir: '.',
  moduleFileExtensions: ['js', 'tsx', 'ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: 'tsconfig.app.json' },
    ],
  },
  testMatch: ['**/*.test.(ts|tsx)', '**/*.spec.(ts|tsx)'],
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/__tests__/mocks',
    '<rootDir>/public',
  ],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/__test__/mocks/file.tsx',
    '\\.(css|scss)$': '<rootDir>/__test__/mocks/styleMock.ts',
    '@/(.*)': '<rootDir>/src/$1',
  },
};
