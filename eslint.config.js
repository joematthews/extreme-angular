import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import { configs as ngConfigs, processInlineTemplates } from "angular-eslint";
import prettierConfig from "eslint-config-prettier";
import { configs as jsoncConfigs } from "eslint-plugin-jsonc";
import globals from "globals";
import { config, configs as tsConfigs } from "typescript-eslint";

export default config(
  { ignores: [".angular/*", "dist/*"] },
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended, prettierConfig],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
  {
    files: ["**/*.ts"],
    ignores: ["**/*.spec.ts"],
    extends: [
      eslint.configs.recommended,
      ...tsConfigs.strictTypeChecked,
      ...tsConfigs.stylisticTypeChecked,
      ...ngConfigs.tsRecommended,
      prettierConfig,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: processInlineTemplates,
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
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...ngConfigs.templateRecommended,
      ...ngConfigs.templateAccessibility,
      prettierConfig,
    ],
    rules: {},
  },
  {
    files: ["**/*.json"],
    extends: [
      ...jsoncConfigs["flat/recommended-with-jsonc"],
      ...jsoncConfigs["flat/prettier"],
    ],
    rules: {},
  },
  {
    files: ["src/**/*.spec.ts"],
    extends: [
      eslint.configs.recommended,
      ...tsConfigs.strictTypeChecked,
      ...tsConfigs.stylisticTypeChecked,
      vitest.configs.recommended,
      prettierConfig,
    ],
    languageOptions: {
      globals: vitest.environments.env.globals,
      parserOptions: {
        project: "./tsconfig.spec.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {},
  },
);
