# Extreme Angular 17

![image](https://github.com/joematthews/extreme-angular/assets/14097616/bfc78560-98a8-4959-8327-4e94121bf4dd)

This is an opinionated Angular starter project that enforces best practices and provides a robust foundation for building modern, accessible web applications using Angular and its ecosystem of tools and libraries. Please feel free to use this as-is, or as inspiration, for your next Angular project ❤️

You can run and explore extreme-angular on StackBlitz: https://stackblitz.com/github/joematthews/extreme-angular?preset=node

> [!NOTE]  
> If you run into _any issues at all_ with installing, updating, or using extreme-angular, then please search through the [issues](https://github.com/joematthews/extreme-angular/issues). If you do not see a similar issue, then please create a new issue -- thank you! 🙏

## Table of Contents

- [Installation & Starting](#installation--starting)
- [Key Features](#key-features)
  - [Accessibility (a11y)](#accessibility-a11y)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Angular Material & Dark Theme](#angular-material--dark-theme)
  - [Server-side-rendering & Pre-rendering](#server-side-rendering--pre-rendering)
  - [Typescript](#typescript)
  - [Prettier](#prettier)
  - [Eslint](#eslint)
  - [Stylelint](#stylelint)
  - [VSCode](#vscode)
  - [Code Spell Checker](#code-spell-checker)
  - [Commitizen & Commitlint](#commitizen--commitlint)
  - [Husky & Lint-Staged](#husky--lint-staged)
  - [Notes directory](#notes-directory)
- [Updating](#updating)
- [Tips & Tricks](#tips--tricks)
  - [NestJS](#nestjs)
  - [Inlay Hints](#inlay-hints)
  - [Font Ligatures](#font-ligatures)
  - [Catppuccin](#catppuccin)

## Installation & Starting

These instructions assume you have installed [git version control](https://git-scm.com/) and the latest version of [Node.js LTS](https://nodejs.org/en/download).

To create a new project, I recommend cloning only the most recent commit and renaming the remote branch to 'upstream'. (Replace `new_project_name` with the name of your project):

```sh
git clone --depth=1 --origin=upstream git@github.com:joematthews/extreme-angular.git new_project_name
```

Change to the new project directory and install the dependencies:

```sh
cd new_project_name
npm install
```

Use the shortcut `CTRL+SHIFT+H` in VSCode to search and replace `extreme-angular` with your chosen project name.

To start the development server run `npm start`.

> [!NOTE]  
> If you're using [VSCode](https://code.visualstudio.com/) and [Chrome](https://www.google.com/chrome/), then press `F5` on the keyboard to start the app in debug mode.

## Key Features

The goal of these changes is to enforce 'best practices' while still being 100% compatible with the [latest Angular documentation](https://angular.io/docs).

### Accessibility (a11y)

extreme-angular enables _all_ of the accessibility rules from [angular-eslint](https://github.com/angular-eslint/angular-eslint) by default including image alt text, form labels, no autofocus, valid ARIA, and more.

In my experience these rules are easy to work with if enabled _early_ in the development process and early adoption of these rules is also very helpful for avoiding common accessibility anti-patterns.

If you run into a problem with any of these accessibility rules I encourage you to open up an [issue](https://github.com/joematthews/extreme-angular/issues) so we can troubleshoot the the errors or concerns together.

For a full list of accessibility-centric rules, check out the [angular-eslint template rules](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/README.md)

The [Accessibility in Angular guide](https://angular.io/guide/accessibility) is a great place to start learning about accessibility in Angular and it provides resources on the topic of accessibility.

Please let me know if more can be done to improve the accessibility of extreme-angular by creating an issue. Thank you.

### Internationalization (i18n)

Enables [Internationalization](https://angular.io/guide/i18n-overview) and requires `i18n` attributes on all elements that include text.

Although you may not require internationalization capabilities right now, adding `i18n` attributes as-you-go may make it less painful to use internationalization in the future.

To disable i18n enforcement, set `"@angular-eslint/template/i18n"` to `"off"` within the `*.html` section of the [.eslintrc.json file](./.eslintrc.json):

```
"rules": {
  "@angular-eslint/template/i18n": "off"
}
```

> [!NOTE]
> Saving a document using VSCode will automatically add missing `i18n` attributes using `eslint --fix`.

### Angular Material & Dark Theme

Enables [Angular Material](https://material.angular.io/guide/getting-started) and uses a [dark theme](./src/theme.scss) that automatically switches from dark to light based on the light/dark preference set in the OS. _The default theme is dark._

Changes `density` to `-2` to make the UI (including buttons) more compact and more inline with web expectations.

Downloads the [Roboto font](https://fonts.google.com/specimen/Roboto) from the Google font api in the [index.html file](./src/index.html). The font is set in the [styles.scss file](./src/styles.scss).

Enables [Animations](https://angular.io/guide/animations) for Angular Material and custom components.

### Server-side-rendering & Pre-rendering

Enables [Server-side-rendering and pre-rendering](https://angular.io/guide/ssr) to improve SEO and user experience. To start the SSR server run the following commands:

```sh
npm run build
npm run serve:ssr:new_project_name
```

> [!NOTE]
> Replace `new_project_name` above with the name of your project.

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

Use `npm run format` to format all relevant files within the project.

### Eslint

The [.eslintrc.json file](./.eslintrc.json) is set up to use [overrides](https://eslint.org/docs/latest/use/configure/configuration-files#how-do-overrides-work) for each of the following file types: \*.js, \*.ts, \*spec.ts, \*.html, \*.json, and \*.md.

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

Use `npm run lint` to lint all relevant files within the project.

### Stylelint

Uses [Stylelint](https://stylelint.io/) to lint CSS and SCSS using the [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) configurations.

Rules for stylelint are split between \*.css & \*.scss overrides and can be modified in the [.stylelintrc.json file](./.stylelintrc.json).

Use `npm run lint:style` to lint all styles within the project.

### VSCode

Recommends VSCode extensions for [Angular](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template), [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint), [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), [Intellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode), and [Intellicode Completions](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode-completions) automatically via a pop-up when the project is opened for the first time. These recommendations are set in the [.vscode/extensions.json file](.vscode/extensions.json).

Configures the following settings in the [.vscode/settings.json file](.vscode/settings.json):

- Sets Prettier as default formatter
- Formats code, and fix linting errors (if possible), on save with `CTRL+S` or via the menu.
- Auto saves after 2 seconds (does not automatically format code or fix errors)

### Code Spell Checker

Enables spell checking for all project files.

Add project specific words to [.cspell.json](.cspell.json).

I highly recommend installing [Code Spell Checker for VSCode](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker). With this extension you can select "Add to config: .cspell.json" from the 'Quick Fix' menu of misspelled words.

Use `npm run check-spelling` to look for misspelled words in the project.

### Commitizen & Commitlint

Uses [Commitizen](https://commitizen.github.io/cz-cli) to suggest consistent formatting of commit messages.

On `git commit`, a interactive prompt will appear:

```
? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests
```

Uses [Commitlint](https://commitlint.js.org/#/) and [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) to enforce good commit messages. Commitlint can be configured in [commitlint.config.js](./commitlint.config.js).

### Husky & Lint-staged

Uses [Husky](https://typicode.github.io/husky/) to manage the [pre-commit](.husky/pre-commit), [pre-push](.husky/pre-push), [prepare-commit-msg](.husky/prepare-commit-msg), and [commit-msg](.husky/commit-msg) git hooks.

Uses [Lint-staged](https://www.npmjs.com/package/lint-staged) to run prettier, eslint, stylelint, cspell, and [tsc-files](https://www.npmjs.com/package/tsc-files) against all staged files before committing to git.

Runs `npm run test:ci` before each push.

Runs commitizen wizard in the `prepare-commit-msg` hook and runs commitlint in the `commit-msg` hook.

### Notes directory

Files in the `./notes` directory are ignored by git but are searchable within VSCode.

This may be useful for keeping personal markdown files for notes or reference including:

- Notes about clients
- Todo lists
- Code snippets & notebooks (iTypescript, tslab, etc)

## Updating

> [!CAUTION]
> Depending on the maturity of your project, it may be better to look at the [release notes](https://github.com/joematthews/extreme-angular/releases) and [commits](https://github.com/joematthews/extreme-angular/commits/main/) and manually make changes instead of merging. If the Angular version has changed, then follow the [instructions to update Angular](https://angular.io/guide/updating) first before attempting to merge or make changes.

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

## Tips & Tricks

These are tips and tricks I feel are too opinionated to include in the repository. If this section gets out of hand I will probably move it into a separate repository.

### Inlay Hints

I _highly_ recommend enabling [inlay hints](https://code.visualstudio.com/Docs/editor/editingevolved#_inlay-hints) in VSCode. They give me the confidence to use Typescript's [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) without feeling the need specify types 'for visibility'.

Add the following to your user settings to enable inlay hints for javascript & typescript:

```json
{
  "editor.inlayHints.enabled": "onUnlessPressed",
  "javascript.inlayHints.enumMemberValues.enabled": true,
  "javascript.inlayHints.functionLikeReturnTypes.enabled": true,
  "javascript.inlayHints.parameterNames.enabled": "all",
  "javascript.inlayHints.parameterTypes.enabled": true,
  "javascript.inlayHints.propertyDeclarationTypes.enabled": true,
  "javascript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.enumMemberValues.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.inlayHints.parameterNames.enabled": "all",
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.variableTypes.enabled": true
}
```

Use `CTRL + ALT` (or `CTRL + OPTION` on Mac) to temporarily disable hints -- Or, change `editor.inlayHints.enabled` to `offUnlessPressed` to reverse this behavior.

### Font Ligatures

VSCode is capable of using 'font ligatures' -- not everyone likes font ligatures, but I really enjoy them.

The two most popular fonts that support font ligatures are [Fira Code](https://github.com/tonsky/FiraCode) and [Jet Brains Mono](https://www.jetbrains.com/lp/mono/). I typically use the 'Regular' `*.ttf` variant of each font.

After you've downloaded and installed the font of your choice, you can set the font and enable font ligatures in your settings:

```json
{
  "editor.fontFamily": "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true
}
```

These are excellent fonts for readability even if you choose to leave `editor.fontLigatures` disabled.

The fira code repository maintains [a list of alternative fonts with ligatures](https://github.com/tonsky/FiraCode#alternatives).

### Catppuccin

Looking for a new theme to try? [Catppuccin](https://github.com/catppuccin) is great theme that I describe as 'modern Darcula'.

Catppuccin has 4 flavours: 🌻 Latte, 🪴 Frappé, 🌺 Macchiato, & 🌿 Mocha.

[Catppuccin is everywhere](https://github.com/catppuccin/catppuccin?tab=readme-ov-file#-ports-and-more). I also use it for my [macOS terminal theme](https://github.com/catppuccin/Terminal.app).

VSCode has two extensions: [Catppuccin for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc) and [Catppuccin Icons for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons).

My favorite is 🪴 Frappé.
