module.exports = {
    "parser": "babel-eslint",
    "root": true,
    "extends": "./node_modules/eslint-config-google/index.js",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "generator": true,
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "max-len": ["error", {
            code: 120
        }],
        "require-jsdoc": 0
    },
    "plugins": [],
};