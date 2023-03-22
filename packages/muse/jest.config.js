module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/esm/', '/cjs/'],
  testRegex: '.*\\.test\\.tsx?$',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./scripts/testSetup.ts'],
  coveragePathIgnorePatterns: ['/__tests__/'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+/node_modules/@mtfe/.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!(@mtfe)/)'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
