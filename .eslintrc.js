module.exports = {
   "parser": "babel-eslint",
   "extends": ["airbnb-base", 'plugin:react/recommended'],
  "rules": {
    "import/prefer-default-export": "off",
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "browser": true,
    "node": true
  }
};
