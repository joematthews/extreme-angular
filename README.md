# Opinionated Angular 17

![image](https://github.com/joematthews/opinionated-angular/assets/14097616/4cbcfd9a-ff9b-447c-bf73-059b1d4ba5c9)

This is an opinionated 'starter project' for [Angular](https://angular.dev). This project can be used as-is for new projects or used as inspiration for existing projects.

> [!NOTE]  
> If you run into _any issues at all_ with the installation, upgrade, or usage of opinionated-angular, then please search through the [issues](https://github.com/joematthews/opinionated-angular/issues). If you do not see a similar issue, then please create a new issue -- thank you! 🙏

## Table of Contents

- [Installation & Starting](#installation--starting)
- [Features, Changes & Notes](#features-changes--notes)
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
- [Diff](#diff)

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

## Features, Changes & Notes

The goal of these changes is to enforce 'best practices' while still being 100% compatible with the [latest Angular documentation](https://angular.io/docs).

### Angular Material & Dark Theme

[Angular Material](https://material.angular.io/guide/getting-started) is installed and uses a [dark theme](./src/theme.scss) that automatically switches from dark to light based on the light/dark preference set in the OS (Windows, Mac, Linux). The default theme is dark.

Changed `density` to `-2` to make the UI (including buttons) more compact and more inline with web expectations.

The [Roboto font](https://fonts.google.com/specimen/Roboto) is used and is downloaded from the Google font api via the [index.html file](./src/index.html).

### SSR & Pre-rendering

[Server-side-rendering and pre-rendering](https://angular.io/guide/ssr) are enabled to improve SEO and user experience. To start the SSR server run the following commands:

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

Inline templates and inline styles are used to encourage small component sizes. The max lines set for inline templates (30) and styles (15) can be adjusted in the [eslintrc.json file](./.eslintrc.json).

SCSS is used for components to make it possible to adjust [Angular Material theming](https://v7.material.angular.io/guide/theming) for each component.

### Internationalization (i18n)

[Internationalization](https://angular.io/guide/i18n-overview) is enabled and `i18n` attributes are required on all elements that include text. Saving a document will automatically add missing `i18n` attributes.

Although you may not require internationalization capabilities right now, adding `i18n` attributes as-you-go may make it less painful to use internationalization in the future.

### Typescript

The following compiler options have been added to the [tsconfig.json file](./tsconfig.json) to help with writing cleaner code:

```json
{
  "exactOptionalPropertyTypes": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noUncheckedIndexedAccess": true
}
```

### Prettier

[Prettier](https://prettier.io/) is used to provide opinionated formatting so diffs contain less formatting changes and teams argue less about formatting in general.

In the [.prettierrc.json file](./.prettierrc.json), `htmlWhitespaceSensitivity` has been set to `css` to improve the formatting of templates. This will trim whitespace immediately before and after inline element. (If disabled, this setting will be difficult to reenable in the future.)

The following prettier plugins are used:

- [prettier-plugin-sh](https://www.npmjs.com/package/prettier-plugin-sh)
  - Enables formatting of shell scripts; eg, git hooks.
- [prettier-plugin-css-order](https://www.npmjs.com/package/prettier-plugin-css-order)
  - Automatically orders SCSS/CSS properties using [css-declaration-sorter](https://github.com/Siilwyn/css-declaration-sorter/)
- [prettier-plugin-organize-imports](https://www.npmjs.com/package/prettier-plugin-organize-imports)
  - Automatically orders, arranges, and removes unused imports.

### Eslint

The [.eslintrc.json file](./.esltinrcjson) is set up to use [overrides](https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work) for each file type: \*.js, \*.ts, \*spec.ts, \*.html, \*.json, and \*.md

The following eslint plugins are used:

- [@angular-eslint](https://github.com/angular-eslint/angular-eslint)
  - All [rules for typescript](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/README.md) and all [rules for templates](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/README.md) are enabled unless explicitly disabled or modified.
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

[Stylelint](https://stylelint.io/) and the [stylelint-scss plugin](https://www.npmjs.com/package/stylelint-scss) are used to lint CSS and SCSS using the recommended rule sets for both.

Rules for stylelint can be modified in the [.stylelintrc.json file](./.stylelintrc.json).

### VSCode

The VSCode extensions for [Angular](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template), [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), [Intellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode), and [Intellicode Completions](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode-completions) are recommended automatically via a pop-up when the project is opened for the first time. These recommendations are set in the [.vscode/extensions.json file](./vscode/extensions.json).

The following settings are configured in the [.vscode/settings.json file](.vscode/settings.json):

- Set Prettier as default formatter
- Format code, and fix linting errors (if possible), on save with `CTRL+S` of via menu.
- Auto save after 2 seconds (does not automatically format code or fix errors)

### Husky & Lint-staged

[Husky](https://typicode.github.io/husky/) is used to help manage the [pre-commit](./.husky/pre-commit) and [pre-push](./.husky/pre-push) git hooks.

[Lint-staged](https://www.npmjs.com/package/lint-staged) is used to run prettier, eslint, stylelint, and [tsc-files](https://www.npmjs.com/package/tsc-files) against all staged files before committing to git.

`npm run test:ci` is ran before each push.

## Updating

> [!CAUTION]
> Depending on the maturity of your project, it may be better to look at the [release notes](https://github.com/joematthews/opinionated-angular/releases) and [commits](https://github.com/joematthews/opinionated-angular/commits/main/) and manually make changes instead of merging. If the Angular version has changed then follow the [instructions to update Angular](https://angular.io/guide/updating) first before attempting to merge or make changes.

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

The `base` branch was generated using version `17.1.1` of the [Angular CLI](https://angular.io/cli) and then formatted using Prettier:

```sh
ng new --inline-template --inline-style --routing --style=scss --strict --ssr --commit opinionated-angular
```
