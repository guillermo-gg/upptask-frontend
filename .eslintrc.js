module.exports = {
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  extends: "airbnb-typescript-prettier",
  rules: {
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "global-require": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/require-default-props": "off",
    "consistent-return": "off",
    "@typescript-eslint/ban-types": "warn",
    "no-param-reassign": "off",
  },
};
