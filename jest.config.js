// jest.config.js (ESM, since your project uses import/export)
export default {
  testEnvironment: 'jsdom',                 // run tests in a fake browser DOM
  transform: { '^.+\\.(js|jsx)$': 'babel-jest' }, // let Babel compile JSX/ESM for Jest
  moduleFileExtensions: ['js', 'jsx'],      // resolve these file types in imports
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // run this before each test file
  moduleNameMapper: {                       // make CSS imports not crash tests
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
};

