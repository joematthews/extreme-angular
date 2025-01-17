# Extreme Angular 19: A Stricter Starter Template

![Meme showing Iron Man wearing the Nano Gauntlet before saving Earth. The caption reads, 'WHEN YOU FINALLY GET ALL THE DEV TOOLS TO WORK TOGETHER'](https://github.com/user-attachments/assets/1a2cbde4-45dc-4c10-920a-5a238e19f59b)

Extreme Angular is pre-configured with a strict and opinionated set of development tools—including TypeScript, ESLint, Prettier, Stylelint, and CSpell—to enforce best practices, ensure consistent code quality, and promote accessibility while remaining fully compatible with the [official Angular documentation](https://angular.dev/overview).

However, Extreme Angular is not a fully-featured dashboard or a component library. It contains no custom application logic, components, or complex modifications. Instead, it offers a clean, strict base for your Angular project, created using the following `ng new` command:

```sh
ng new --strict --style=scss --ssr=false
```

For additional utility like Angular Material, server-side rendering (SSR), internationalization (i18n), or End to End Testing (e2e) check out the [Optional Angular Schematics](#optional-angular-schematics) section.

## Contributions, Issues, & Suggestions

If you have a suggestion or run into any issues _at all_ then first search through the [issues](https://github.com/joematthews/extreme-angular/issues), and then create a new one if necessary! :mega:

To contribute, [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo), check out a new branch, make your changes, and then [submit a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). :octopus:

Thank you for your contributions!

## Table of Contents

- [Getting Started](#getting-started)
  - [LICENSE.md](#licensemd)
- [Dev Tools Implemented](#dev-tools-implemented)
  - [Typescript](#typescript)
  - [Eslint](#eslint)
    - [Accessibility (a11y)](#accessibility-a11y) :accessibility:
  - [Stylelint](#stylelint)
  - [Prettier](#prettier)
  - [Code Spell Checker](#code-spell-checker)
  - [VSCode](#vscode)
  - [Husky, Commitlint, tsc-files, and Lint-Staged (Git hooks)](#husky-commitlint-tsc-files-and-lint-staged-git-hooks)
  - [Shove Progress](#shove-progress)
  - [Continuous Integration (CI) Using GitHub Actions](#continuous-integration-ci-using-github-actions)
- [Optional Angular Schematics](#optional-angular-schematics)
  - [Angular Material & Angular CDK](#angular-material--angular-cdk)
  - [Server-side & hybrid rendering (SSR)](#server-side--hybrid-rendering-ssr)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [End to End Testing (e2e)](#end-to-end-testing-e2e)
- [Tips & Tricks](#tips--tricks)
  - [Git Config](#git-config)
  - [Inlay Hints in VSCode](#inlay-hints-in-vscode)
  - [Font Ligatures](#font-ligatures)
  - [Catppuccin Theme](#catppuccin)
  - [Oh My Bash / Oh My Zsh / Oh My Posh](#oh-my-zsh--oh-my-bash--oh-my-posh)
  - [JetBrains Webstorm & Rider](#jetbrains-ides)
- [Updating](#updating)

## Getting Started

If you have a GitHub account, an easy way to get started is to select "Use this template" in the top right corner of the [GitHub page for Extreme Angular](https://github.com/joematthews/extreme-angular) and then select "Create a new repository". This will allow you to rename your repository and set it to private.

Alternatively, if you do not have a GitHub account, I recommend cloning only the most recent commit and renaming the remote branch to 'upstream'. (Replace `new_project_name` with the name of _your_ project):

```sh
git clone --depth=1 --origin=upstream https://github.com/joematthews/extreme-angular.git new_project_name
```

Change to the new project directory and install the dependencies:

```sh
cd new_project_name
npm install
```

Use the shortcut `CTRL+SHIFT+H` in VSCode to search and replace `extreme-angular` with your chosen project name.

To start the development server run `npm start`.

> [!TIP]  
> If you're using [VSCode](https://code.visualstudio.com/) and [Chrome](https://www.google.com/chrome/), then press `F5` on the keyboard to start the app in debug mode. For more information check out: [TypeScript in Visual Studio Code](https://code.visualstudio.com/docs/languages/typescript).

> [!TIP]
> The "Dev Tools Implemented" section below is project-agnostic -- consider adding it to your project's README.md or CONTRIBUTING.md!

### LICENSE.md

The documentation and configuration files in this project are licensed under the [MIT license](https://tlo.mit.edu/understand-ip/exploring-mit-open-source-license-comprehensive-guide).

I keep the copyright from [Angular's license](https://angular.dev/license) and add my own copyright out of respect and clarity.

If your project also uses the MIT license, then please consider adding a new copyright line to [LICENSE.md](LICENSE.md):

```
...
Copyright (c) 2010-2024 Google LLC. https://angular.dev/license

Copyright (c) 2024-2025 Joe Matthews, et al. https://github.com/joematthews/extreme-angular

Copyright (c) 2025 Your Name or Company
...
```

If your project is [closed source](https://simple.wikipedia.org/wiki/Closed_source) or uses a [different license](https://opensource.org/licenses), then please consider renaming the file to `LICENSE-Angular.md` or include the original license in another document.

Thank you!

## Dev Tools Implemented

This section outlines how each tool is configured, and how they can be leveraged to ensure clean and maintainable code.

Use this script to run all checks against all project files:

```sh
npm run lint:all
```

> [!CAUTION]
> These tools are not perfect and they are not a substitute for learning and utilizing the best practices outlined in the Angular guides for [Style](https://angular.dev/style-guide), [Security](https://angular.dev/best-practices/security), [Accessibility](https://angular.dev/best-practices/a11y), and [Performance](https://angular.dev/best-practices/runtime-performance).

### Typescript

In addition to setting `"strict": true` in the TypeScript configuration, Angular's template checking is enabled with Strict Mode as defined in [tsconfig.json](tsconfig.json).

The following TypeScript compiler options have been added to enforce cleaner and more maintainable code:

- [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
- [noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
- [noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
- [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)

These options help ensure stricter type-checking and eliminate unused or potentially unsafe code.

To check for errors in \*.ts files:

```
npm run lint:tsc:app
```

To check for errors in \*.spec.ts files:

```
npm run lint:tsc:spec
```

### Eslint

[ESlint](https://eslint.org/) is used for linting JavaScript, TypeScript, HTML, and JSON files in the project. The linting configuration is set in [eslint.config.js](./eslint.config.js), with specific overrides for the following file types: `*.js`, `*.ts`, `*.spec.ts`, `*.html`, and `*.json`.

To ensure effective linting for all project files, the following ESLint plugins are used:

- [@angular-eslint](https://github.com/angular-eslint/angular-eslint)
  - Enables all TypeScript and template rules unless explicitly disabled or modified.
  - [@angular-eslint rules configuration matrix](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/README.md).
  - [@angular-eslint/template rules configuration matrix](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/README.md).
- [@typescript-eslint](https://typescript-eslint.io/)
  - Uses both [strict-type-checked](https://typescript-eslint.io/linting/configs#strict-type-checked) and [stylistic-type-checked](https://typescript-eslint.io/linting/configs#stylistic-type-checked) rule sets.
  - [typescript-eslint rules configuration matrix](https://typescript-eslint.io/rules/).
- [eslint-plugin-jasmine](https://www.npmjs.com/package/eslint-plugin-jasmine)
  - Uses `recommended` rule set.
  - [eslint-plugin-jasmine rules configuration matrix](https://typescript-eslint.io/rules/).
- [eslint-plugin-jsonc](https://www.npmjs.com/package/eslint-plugin-jsonc)
  - Uses `recommended` rule set.
  - [eslint-plugin-jsonc rules configuration matrix](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/).
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
  - Disables rules that may conflict with Prettier formatting.

To lint all relevant files in the project (not just those in src/):

```sh
npm run lint
```

> [!TIP]
> Suppress the urge to immediately set rules to "off" or "warn". First, look up the rule and the problem it is correcting for and discuss the rule with other developers on the project.

#### Accessibility (a11y)

This project enables all the accessibility rules provided by angular-eslint by default (denoted by :accessibility: in the @angular-eslint/template rules configuration matrix linked above).

Includes rules for image alt text, form labels, no autofocus, valid ARIA, and more.

These rules are easier to work with if enabled _early_ in the development process and early adoption of these rules is also very helpful for avoiding common accessibility antipatterns.

The [Accessibility in Angular guide](https://angular.dev/best-practices/a11y) is a great place to start learning about accessibility in Angular, and it provides resources on the topic of accessibility.

### Stylelint

[Stylelint](https://stylelint.io/) is used to lint CSS and SCSS files in the project. It is configured with the [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) configurations.

Rules for linting are applied separately to `.css` and `.scss` files, and can be customized in [.stylelintrc.json](./.stylelintrc.json).

To lint all CSS and SCSS files:

```sh
npm run lint:style
```

### Prettier

[Prettier](https://prettier.io/) is used to enforce consistent code formatting, reducing diffs by minimizing formatting changes.

In [.prettierrc.json](./.prettierrc.json), the `htmlWhitespaceSensitivity` option is set to `ignore` to better format templates. This setting trims unnecessary whitespace around and inside HTML elements. Use `&nbsp;` (non-breaking space) when you need to explicitly maintain spacing between inline elements.

The following Prettier plugins are used:

- [prettier-plugin-sh](https://www.npmjs.com/package/prettier-plugin-sh): Formats shell scripts, such as Git hooks.
- [prettier-plugin-css-order](https://www.npmjs.com/package/prettier-plugin-css-order): Automatically organizes SCSS/CSS properties using [concentric-css](https://github.com/brandon-rhodes/Concentric-CSS)
- [prettier-plugin-organize-imports](https://github.com/trivago/prettier-plugin-sort-imports): Automatically organizes, arranges, and removes unused imports.

To format files within the project:

```sh
npm run format
```

To check if all files are properly formatted:

```sh
npm run lint:format
```

### Code Spell Checker

[CSpell](https://github.com/streetsidesoftware/cspell) is used for spell checking for all project files.

To add project-specific words, update [.cspell.json](.cspell.json).

The [Code Spell Checker Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) allows you to quickly add misspelled words to the configuration by selecting "Add to config: .cspell.json" from the 'Quick Fix' menu.

To find misspelled words in all files within the project:

```sh
npm run lint:spelling
```

### VSCode

The following VSCode extensions will be recommended when opening the project ([.vscode/extensions.json](.vscode/extensions.json)):

- [Angular](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

The following VSCode settings have been set in [.vscode/settings.json](.vscode/settings.json):

- Prettier set as default formatter.
- Auto format and [fix linting errors on save](https://github.com/microsoft/vscode-eslint?tab=readme-ov-file#version-204).
- Auto-save after 3 seconds (doesn't format or fix errors).
- [Disable VSCode's default CSS/SCSS linters](https://github.com/stylelint/vscode-stylelint?tab=readme-ov-file#disable-vs-codes-built-in-linters-optional).
- [Stylelint configured to lint CSS & SCSS](https://github.com/stylelint/vscode-stylelint?tab=readme-ov-file#%EF%B8%8F-only-css-and-postcss-are-validated-by-default).

### Husky, Commitlint, tsc-files, and Lint-Staged (Git hooks)

[Husky](https://typicode.github.io/husky/) is used to manage the [pre-commit](.husky/pre-commit), [pre-push](.husky/pre-push), and [commit-msg](.husky/commit-msg) git hooks.

[Commitlint](https://commitlint.js.org/#/) is used to enforce good commit messages according to the [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) configuration in the commit-msg git hook. Additional Commitlint configuration is kept in [commitlint.config.js](./commitlint.config.js).

[Lint-staged](https://www.npmjs.com/package/lint-staged) is used to run Prettier, ESlint, Stylelint, CSpell, and [tsc-files](https://www.npmjs.com/package/tsc-files) in the pre-commit git hook against all staged files. Lint-staged configuration is kept in [.lintstagedrc.json](.lintstagedrc.json)

### Shove Progress

You can bypass the git hooks using `git commit --no-verify` and `git push --no-verify`. Or, use the `shove` script in emergencies when progress needs to be backed up quickly:

```sh
npm run shove
```

The shove script will stage all files, commit with the commit message `wip: shoved`, and then push.

> [!NOTE]
> The shove script sets [git config push.autoSetupRemote true](https://git-scm.com/docs/git-push#Documentation/git-push.txt-pushautoSetupRemote) to increase likelihood that the push will be successful. If you prefer to set the remote branch names manually you will need to set this back to `false`.

> [!WARNING]
> The `--no-verify` flag cannot be disabled! To protect against untested code use a Continuous Integration solution.

### Continuous Integration (CI) Using GitHub Actions

The [on-pull-request.yml](.github/workflows/on-pull-request.yml) action checks all files and run tests when a branch is pushed that is associated with a GitHub pull request.

Pull requests on GitHub cannot be merged until all checks and tests pass. The output of these workflows can found in the 'Actions' tab on the GitHub repository.

To execute these checks and tests locally:

```sh
npm run ci:all
```

## Optional Angular Schematics

### Angular Material & Angular CDK

Looking for an a11y-friendly, MIT-licensed, Angular component library that strictly adheres to the [Material Design language](https://m3.material.io/) and integrates well with Angular's core libraries, and comes with animations? Then check out [Angular Material](https://material.angular.io/).

The Angular Material documentation is very good and covers many topics including [Supporting Light and Dark Mode](https://material.angular.io/guide/theming#supporting-light-and-dark-mode)

For design-agnostic template utilities, consider installing the [Angular CDK](https://material.angular.io/cdk/categories):

```sh
ng add @angular/cdk
```

To add animations to your own components, check out [Introduction to Angular animations](https://angular.dev/guide/animations)

### Server-side & hybrid rendering (SSR)

Consider enabling [Server-side & hybrid rendering](https://angular.dev/guide/performance) to improve SEO and user experience (at the cost of increased deployment complexity).

### Internationalization (i18n)

Angular has powerful [Internationalization](https://angular.dev/guide/i18n) capabilities.

If you plan to implement internationalization in the future, adding i18n attributes early on can make the process easier to scale naturally.

To enable the i18n ESLint rule, simply remove or configure the following rule from the \*.html section of [eslint.config.js](./eslint.config.js):

> [!NOTE]
> You may also need to configure the [@angular-eslint/template/i18n](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/i18n.md) rule according to your project's needs.

> [!TIP]
> Using `eslint --fix` can automatically add i18n tags in many cases.

## End to End Testing (e2e)

Angular has schematics available for several end to end testing frameworks. The [Angular End to End Testing guide](https://angular.dev/tools/cli/end-to-end) will walk you through the steps to set one up.

To install a e2e testing framework in your project run this command:

```sh
ng e2e
```

The package [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright) supports ESlint 9 has rules for the popular [Playwright](https://playwright.dev/) framework. To incorporate these rules, import the plugin and then add a new config object that targets `e2e/**/*.spec.ts` files to [eslint.config.js](eslint.config.js):

```js
const playwright = require("eslint-plugin-playwright");
...
  {
    files: ["e2e/**/*.spec.ts"],
    extends: [...playwright.configs["flat/recommended"], eslintConfigPrettier],
    rules: { ...playwright.configs["flat/recommended"].rules },
  },
}
```

## Tips & Tricks

These are tips and tricks that are too opinionated or situational to include in the repository configuration or are not related to Angular project configuration.

### Git Config

To automatically set the remote branch name to match the local branch name on push:

```
git config push.autoSetupRemote true
```

You can use VSCode to edit commit messages when using commands like `git commit`, `git rebase`, and `git commit --amend`. This will only work if the [code command](https://code.visualstudio.com/docs/editor/command-line) in the PATH. Follow these [instructions to set up the vscode cli on macOS](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) if it is not already set up. Run this command to set it up:

```
git config core.editor "code --wait"
```

If you use GitHub, and you'd prefer to not show your email in public commits, set your email to the one found on your GitHub account settings under the 'Email' tab. This is the same email used by GitHub Desktop, and when edits are made directly on the GitHub site.

```
git config user.email "14097616+joematthews@users.noreply.github.com
```

> [!TIP]
> You can add the `--global` flag to these commands to make them the default for all projects.

### Inlay Hints in VSCode

I _highly_ recommend enabling [inlay hints in vscode](https://code.visualstudio.com/Docs/editor/editingevolved#_inlay-hints). They give me the confidence to use Typescript's [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) without feeling the need specify types 'for visibility'.

Add the following to the vscode user settings to enable all inlay hints for JavaScript & Typescript:

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

To temporarily disable inlay hints use `CTRL + ALT` (or `CTRL + OPTION` on Mac) -- Or, to reverse this behavior use:

```json
{
  "editor.inlayHints.enabled": "offUnlessPressed"`
  ...
}
```

### Font Ligatures

VSCode is capable of using 'font ligatures' -- not everyone likes font ligatures, but I really enjoy them.

The two most popular fonts that support font ligatures are [Fira Code](https://github.com/tonsky/FiraCode) and [Jet Brains Mono](https://www.jetbrains.com/lp/mono/). I typically use the 'Regular' `*.ttf` variant of each font.

After downloading and installing the font of choice, add the font to the `fontFamily` and enable font `fontLigatures` in the vscode user settings:

```json
{
  "editor.fontFamily": "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true
}
```

The fira code repository maintains [a list of alternative fonts with ligatures](https://github.com/tonsky/FiraCode#alternatives).

### Oh My Zsh / Oh My Bash / Oh My Posh

- [Oh My Zsh](https://ohmyz.sh/): Popular on macOS, where zsh is now default.
- [Oh My Bash](https://github.com/ohmybash/oh-my-bash): Popular on Linux, where bash is usually default.
- [Oh My Posh](https://ohmyposh.dev/): Cross-platform. Works with many shells.

The theme `robbyrussel` (default on oh-my-zsh) is an excellent, minimal theme that is available for all three.

These are great frameworks for managing shell configuration. They include helpful functions, plugins, helpers, and themes.

Shell configuration frameworks are a quick way to add git branch & status information to the shell prompt.

### JetBrains IDEs

[Webstorm, Rider & RustRover are now free to use for non-commercial use!](https://sales.jetbrains.com/hc/en-gb/articles/18950890312210-The-free-non-commercial-licensing-FAQ)

Here are some tips for configuring the dev tools for this project in JetBrains IDEs:

- Eslint, Stylelint, Prettier
  - Search for each name in the settings to easily find all relevant configuration.
  - Double check all three plugins are installed.
  - Set configuration to 'Automatic' for each and match the file extensions that are found in scripts section of [package.json](./package.json).
  - (Optional) Set "Run on save" for each plugin if preferred.
- Install the "CSpell Check" plugin to reduce conflicts with JetBrains' built-in spell-checking.
- (Optional) Set keymap to 'VSCode' or 'VSCode (macOS)' for an easier transition
- (Optional) Search for 'ligatures' in the settings to enable font ligatures. JetBrainsMono is capable of displaying ligatures and is installed with the IDE

## Updating

> [!WARNING]
> Depending on the maturity of the project, it may be better to look at the current configuration files for extreme-angular & [release notes](https://github.com/joematthews/extreme-angular/releases) and then manually make changes instead of merging. If the Angular version has changed, then follow the [guide to update Angular](https://angular.dev/update) first before attempting to merge or make changes.

To pull in the latest changes, check out an 'update' branch and merging the latest changes from `upstream/main`:

```sh
git checkout main && git pull
git checkout -b update
git merge upstream/main
```

> [!NOTE]
> The name of the remote may not be `upstream` depending on how this project was cloned.

There may be [merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/overview#_merge-conflicts) that need to be resolved. After a successful merge, install dependencies and then format, lint, test, and fix any new errors for all files:

```sh
npm install
npm run ci:all
```
