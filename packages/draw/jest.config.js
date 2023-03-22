module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/esm/', '/cjs/'],
  testRegex: '.*\\.test\\.tsx?$',
  coveragePathIgnorePatterns: [
    '/__tests__/',
    '/src/javascript/plugin/hoisting.ts'
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
