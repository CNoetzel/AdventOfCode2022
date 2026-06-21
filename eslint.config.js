const gts = require('gts');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  {
    ignores: ['build/', 'coverage/', 'node_modules/', '*.config.js'],
  },
  ...gts,
  {
    files: ['**/*.spec.ts'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.all.rules,
      'jest/prefer-expect-assertions': 'off',
      'jest/require-hook': 'off',
    },
  },
];
