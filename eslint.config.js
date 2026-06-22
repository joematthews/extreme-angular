// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const vitest = require('@vitest/eslint-plugin');
const jsonc = require('eslint-plugin-jsonc');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

module.exports = defineConfig([
  { ignores: ['.angular/', 'dist/'] },
  {
    files: ['**/*.js'],
    extends: [eslint.configs.recommended, prettierConfig],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      angular.configs.tsRecommended,
      prettierConfig,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      prettierConfig,
    ],
    rules: {},
  },
  {
    files: ['**/*.json'],
    extends: [...jsonc.configs['flat/recommended-with-jsonc'], ...jsonc.configs['flat/prettier']],
    rules: {},
  },
  {
    files: ['src/**/*.spec.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      vitest.configs.recommended,
      prettierConfig,
    ],
    languageOptions: {
      globals: vitest.environments.env.globals,
      parserOptions: {
        project: './tsconfig.spec.json',
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {},
  },
]);
