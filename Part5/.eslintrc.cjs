module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'warn', // Warn if PropTypes are missing
    'no-unused-vars': 'warn', // Warn for unused variables
    'react/react-in-jsx-scope': 'off', // React 17+ doesn't need React in scope
    'no-console': 'off', // Allow console logs
    semi: ['error', 'always'], // Require semicolons
    quotes: ['error', 'single'], // Use single quotes
  },
};
