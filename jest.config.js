module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  collectCoverageFrom: ['./challenges/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testPathIgnorePatterns: ["build"]
};
