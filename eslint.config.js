const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintConfigPrettier = require("eslint-config-prettier");
const jsonc = require("eslint-plugin-jsonc");
const jasmine = require("eslint-plugin-jasmine");
const globals = require("globals");

module.exports = tseslint.config(
  { ignores: [".angular/*", "dist/*"] },
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsAll,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateAll,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/i18n": "off",
    },
  },
  {
    files: ["**/*.json"],
    extends: [
      ...jsonc.configs["flat/recommended-with-jsonc"],
      ...jsonc.configs["flat/prettier"],
    ],
    rules: {},
  },
  {
    files: ["**/*.spec.ts"],
    extends: [jasmine.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      globals: {
        ...globals.jasmine,
      },
    },
    plugins: { jasmine },
    rules: {},
  },
);
