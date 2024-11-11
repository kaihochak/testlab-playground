module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/selenium/**/*.spec.ts'],
  setupFilesAfterEnv: ['./jest.setup.js']
}; 