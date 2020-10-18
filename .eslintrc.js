module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    google: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "tsx": "never",
        "ts": "never",
      }
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    "jsx-a11y/label-has-associated-control": "off"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".tsx", ".ts"],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};