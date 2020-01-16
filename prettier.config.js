// @flow

/* eslint-disable import/no-commonjs */

module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  arrowParens: 'always',
  parser: 'babylon',
  overrides: [
    {
      files: 'frontend/sail/**/*.css',
      options: {
        parser: 'css',
        singleQuote: false,
        printWidth: 100,
      },
    },
    {
      files: 'henson/services/*.yaml',
      options: {
        parser: 'yaml',
      },
    },
  ],
};
