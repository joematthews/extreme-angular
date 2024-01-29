# Opinionated Angular 17

![image](https://github.com/joematthews/opinionated-angular/assets/14097616/bfc78560-98a8-4959-8327-4e94121bf4dd)

This is an opinionated Angular starter project that enforces best practices and provides a robust foundation for building modern, scalable web applications using Angular and its ecosystem of tools and libraries. Please feel free to use this as-is, or as inspiration, for your next Angular project ❤️

> [!NOTE]  
> If you run into _any issues at all_ with the installation, upgrade, or usage of opinionated-angular, then please search through the [issues](https://github.com/joematthews/opinionated-angular/issues). If you do not see a similar issue, then please create a new issue -- thank you! 🙏

## Table of Contents

- [Installation & Starting](#installation--starting)
- [Key Features](#key-features)
  - [Angular Material & Dark Theme](#angular-material--dark-theme)
  - [SSR & Pre-rendering](#ssr--pre-rendering)
  - [Component Preferences for CLI Generation](#component-preferences-for-cli-generation)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Typescript](#typescript)
  - [Prettier](#prettier)
  - [Eslint](#eslint)
  - [Stylelint](#stylelint)
  - [VSCode](#vscode)
  - [Husky & Lint-Staged](#husky--lint-staged)
- [Updating](#updating)
- [Diff & Base Branch](#diff--base-branch)

## Installation & Starting

These instructions assume you have installed [git version control](https://git-scm.com/) and the latest version of [Node.js LTS](https://nodejs.org/en/download).

To create a new project, I recommend keeping only the most recent commit and renaming the remote branch to 'upstream'. (Replace `new_project_name` with the name of your project):

```sh
git clone --depth=1 --origin=upstream git@github.com:joematthews/opinionated-angular.git new_project_name
```

Change to the new project directory and install the dependencies:

```sh
cd new_project_name
npm install
```

Use the shortcut `CTRL+SHIFT+H` in VSCode to search and replace `opinionated-angular` with your chosen project name.

To start the development server run `npm start`.

> [!NOTE]  
> If you're using [VSCode](https://code.visualstudio.com/) and [Chrome](https://www.google.com/chrome/), then press `F5` on the keyboard to start the app in debug mode.

## Key Features

The goal of these changes is to enforce 'best practices' while still being 100% compatible with the [latest Angular documentation](https://angular.io/docs).

### Angular Material & Dark Theme

Enables [Angular Material](https://material.angular.io/guide/getting-started) and uses a [dark theme](./src/theme.scss) that automatically switches from dark to light based on the light/dark preference set in the OS (Windows, Mac, Linux). _The default theme is dark._

Changes `density` to `-2` to make the UI (including buttons) more compact and more inline with web expectations.

Downloads the [Roboto font](https://fonts.google.com/specimen/Roboto) from the Google font api in the [index.html file](./src/index.html). The font is set in the [styles.scss file](./src/styles.scss).

Enables [Animations](https://angular.io/guide/animations) for Angular Material and custom components.

### SSR & Pre-rendering

Enables [Server-side-rendering and pre-rendering](https://angular.io/guide/ssr) to improve SEO and user experience. To start the SSR server run the following commands:

```sh
npm run build
npm run serve:ssr:new_project_name
```

> [!NOTE]
> Replace `new_project_name` above with the name of your project.

### Component Preferences for CLI Generation

The following preferences are set in [angular.json](./angular.json) for component generation:

```json
{
  "inlineTemplate": true,
  "inlineStyle": true,
  "style": "scss"
}
```

Inline templates and inline styles encourages small component sizes. Customize the max lines for inline-templates and styles in the [eslintrc.json file](./.eslintrc.json).

SCSS makes it possible to adjust the [Angular Material theming](https://v7.material.angular.io/guide/theming) for each component.

### Internationalization (i18n)

Enables [Internationalization](https://angular.io/guide/i18n-overview) and requires `i18n` attributes on all elements that include text.

Although you may not require internationalization capabilities right now, adding `i18n` attributes as-you-go may make it less painful to use internationalization in the future.

> [!NOTE]
> Saving a document will automatically add missing `i18n` attributes.

### Typescript

Adds the following compiler options to the [tsconfig.json file](./tsconfig.json) to help with writing cleaner code:

- [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
- [noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
- [noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
- [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)

### Prettier

Uses [Prettier](https://prettier.io/) to provide opinionated formatting so diffs contain less formatting changes and teams argue less about formatting in general.

In the [.prettierrc.json file](./.prettierrc.json), `htmlWhitespaceSensitivity` is set to `ignore` to improve the formatting of templates. This will trim whitespace around and inside elements. Use `&nbsp;` (non-breaking space) to explicitly enforce spacing between inline-elements.

The following prettier plugins are used:

- [prettier-plugin-sh](https://www.npmjs.com/package/prettier-plugin-sh)
  - Enables formatting of shell scripts; eg, git hooks.
- [prettier-plugin-css-order](https://www.npmjs.com/package/prettier-plugin-css-order)
  - Automatically orders SCSS/CSS properties using [concentric-css](https://github.com/brandon-rhodes/Concentric-CSS)
- [prettier-plugin-organize-imports](https://www.npmjs.com/package/prettier-plugin-organize-imports)
  - Automatically orders, arranges, and removes unused imports.

### Eslint

The [.eslintrc.json file](./.esltinrcjson) is set up to use [overrides](https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work) for each of the following file types: \*.js, \*.ts, \*spec.ts, \*.html, \*.json, and \*.md.

To help ensure all project files are linted, the following eslint plugins are used:

- [@angular-eslint](https://github.com/angular-eslint/angular-eslint)
  - Enables all [rules for typescript](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/README.md) and all [rules for templates](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/README.md) unless explicitly disabled or modified.
- [@typescript-eslint](https://typescript-eslint.io/)
  - Uses both [strict-type-checked](https://typescript-eslint.io/linting/configs#strict-type-checked) and [stylistic-type-checked](https://typescript-eslint.io/linting/configs#stylistic-type-checked) rule sets.
- [eslint-plugin-rxjs](https://www.npmjs.com/package/eslint-plugin-rxjs)
  - Uses recommended rule set.
- [eslint-plugin-jasmine](https://www.npmjs.com/package/eslint-plugin-jasmine)
  - Uses recommended rule set.
- [eslint-plugin-markdown](https://www.npmjs.com/package/eslint-plugin-markdown)
  - Uses recommended rule set.
- [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc)
  - Uses recommended rule set.
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
  - Removes any rules that may conflict with prettier formatting.

### Stylelint

Uses [stylelint](https://stylelint.io/) and the [stylelint-scss plugin](https://www.npmjs.com/package/stylelint-scss) to lint CSS and SCSS using the recommended rule sets for both. Rules for stylelint can be modified in the [.stylelintrc.json file](./.stylelintrc.json).

### VSCode

Recommends VSCode extensions for [Angular](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template), [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), [Intellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode), and [Intellicode Completions](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode-completions) automatically via a pop-up when the project is opened for the first time. These recommendations are set in the [.vscode/extensions.json file](./vscode/extensions.json).

Configures the following settings in the [.vscode/settings.json file](.vscode/settings.json):

- Sets Prettier as default formatter
- Formats code, and fix linting errors (if possible), on save with `CTRL+S` or via the menu.
- Auto saves after 2 seconds (does not automatically format code or fix errors)

### Husky & Lint-staged

Uses [Husky](https://typicode.github.io/husky/) to help manage the [pre-commit](./.husky/pre-commit) and [pre-push](./.husky/pre-push) git hooks.

Uses [Lint-staged](https://www.npmjs.com/package/lint-staged) to run prettier, eslint, stylelint, and [tsc-files](https://www.npmjs.com/package/tsc-files) against all staged files before committing to git.

Runs `npm run test:ci` before each push.

## Updating

> [!CAUTION]
> Depending on the maturity of your project, it may be better to look at the [release notes](https://github.com/joematthews/opinionated-angular/releases) and [commits](https://github.com/joematthews/opinionated-angular/commits/main/) and manually make changes instead of merging. If the Angular version has changed, then follow the [instructions to update Angular](https://angular.io/guide/updating) first before attempting to merge or make changes.

To pull in the latest changes, I recommend checking out a 'update' branch and merging the latest changes from `upstream/main`:

```sh
git checkout main && git pull
git checkout -b update
git merge upstream/main
```

You may have to [resolve merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/overview#_merge-conflicts). After a successful merge, install dependencies and then format, lint, test, and fix any new errors for all files:

```sh
npm install
npm run format
npm run lint
npm run lint:style
npm run test
```

Merge the update branch back into the main branch:

```sh
git checkout main && git pull
git merge update
```

Finally, delete the update branch:

```sh
git branch -d update
```

## Diff & Base Branch

Compare the [differences between the `main` and `base` branches](https://github.com/joematthews/opinionated-angular/compare/base...main?diff=split&w=) to see all the changes.

The `base` branch was generated with [Angular CLI](https://angular.io/cli) version `17.1.1` using the following command and then formatted using Prettier with all plugins enabled. This was done so that formatting differences do not show in the diff.

```sh
ng new --inline-template --inline-style --routing --style=scss --strict --ssr --commit opinionated-angular
```
