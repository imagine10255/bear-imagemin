module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    "quotes": [
      "warn",
      "single"
    ],
    "indent": [
      "warn",
      4
    ],
    "import/no-anonymous-default-export": "off",
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'object-curly-spacing': ['error', 'never'],
    'comma-spacing': ['error', { "before": false, "after": true }],
    'brace-style': 'error',
    'curly': 'error',
    'dot-location': ['error', "property"],
    'key-spacing': 'error',
    'space-in-parens': ['error', "never"],
    "semi": [
      "warn",
      "always"
    ],
  },
};
