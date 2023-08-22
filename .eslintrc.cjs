module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['accum', 'memo'],
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__filename', '__dirname'],
      }
    ],
  },
};
