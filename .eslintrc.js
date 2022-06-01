module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "airbnb/hooks",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-filename-extension": ["off"],
    "func-names": ["error", "as-needed"],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
    "no-plusplus": ["off"],
    "react/prop-types": ["warn"],
    "no-unused-vars": ["error", { varsIgnorePattern: "_" }],
    "jsx-a11y/label-has-associated-control": ["warn"],
    "max-len": ["off"]
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/core-modules": ["styled-jsx/css"],
  },
};
