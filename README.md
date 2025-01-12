# Extreme Angular 19

![Meme showing Iron Man wearing the Nano Gauntlet before saving Earth. The caption reads, 'WHEN YOU FINALLY GET ALL THE LINTERS TO WORK TOGETHER'](https://github.com/user-attachments/assets/1a2cbde4-45dc-4c10-920a-5a238e19f59b)

Extreme Angular is an Angular starter template designed to help you build modern, accessible web applications. It comes with a pre-configured set of opinionated, strict development tools that enforce best practices and ensure consistent, high-quality code, while remaining fully compatible with the [Angular documentation](https://angular.dev/overview).

## What It Is

Extreme Angular is a highly opinionated and strict starter template with pre-configured development tools. It helps developers quickly start an Angular project that follows best practices for accessibility, code quality, and maintainability.

The project is built with strict settings that promote clean, error-free code, using a combination of TypeScript, ESLint, Prettier, Stylelint, and other tools.

## What It Is Not

This project is not a fully-featured application or a component library. In other words, it contains no custom application logic, components, or complex modifications — just a clean, fully configured foundation for your Angular app.

The underlying Angular project was created using `ng new --strict --styles=scss --ssr=false` with only minor modifications to the files in `src/` to comply with the dev tool configuration.

## Contributions, Issues, & Suggestions

If you have a suggestion or run in to any issues _at all_ then please first search through the [issues](https://github.com/joematthews/extreme-angular/issues), and then create a new issue! :mega:

To contribute,[fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo), check out a new branch, create a new branch, make your changes, and then [submit a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). :octopus:

Thank you for your contributions!

## Table of Contents

- [Getting Started](#getting-started)
- [Dev Tools Implemented](#dev-tools-implemented)
  - [Typescript Configuration](#typescript-configuration)
  - [Eslint](#eslint)
    - [Accessibility (a11y)](#accessibility-a11y) :accessibility:
    - [Internationalization (i18n)](#internationalization-i18n)
  - [Stylelint](#stylelint)
  - [Prettier](#prettier)
  - [Code Spell Checker](#code-spell-checker)
  - [VSCode](#vscode)
  - [Husky, Commitlint, tsc-files & Lint-Staged (Git Hooks)](#husky-commitlint-tsc-files--lint-staged-git-hooks)
  - [Continuous Integration (CI) Using Github Actions](#continuous-integration-ci-using-github-actions)
- [Tips & Tricks](#tips--tricks)
  - [Use VSCode as Git's Editor](#use-vscode-as-gits-editor)
  - [Inlay Hints in VSCode](#inlay-hints-in-vscode)
  - [Font Ligatures](#font-ligatures)
  - [Catppuccin Theme](#catppuccin)
  - [Oh My Bash / Oh My Zsh / Oh My Posh](#oh-my-zsh--oh-my-bash--oh-my-posh)
  - [JetBrains Webstorm & Rider](#jetbrains-webstorm--rider)
- [Opt-in Angular Schematics](#opt-in-angular-schematics)
  - [Angular Material & Angular CDK](#angular-material--angular-cdk)
  - [Server-side-rendering & Pre-rendering](#server-side-rendering--pre-rendering)
- [Updating](#updating)

## Getting Started

If you have a github account, an easy way to get started is to select "Use this template" in the top right corner of the [extreme-angular github page](https://github.com/joematthews/extreme-angular) and then select "Create a new repository". This will allow you to rename your repository and set it to private.

To use this project as a template in a git-neutral way, I recommend cloning only the most recent commit and renaming the remote branch to 'upstream'. (Replace `new_project_name` with the name of _your_ project):

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

> [!TIP]  
> If you're using [VSCode](https://code.visualstudio.com/) and [Chrome](https://www.google.com/chrome/), then press `F5` on the keyboard to start the app in debug mode. For more information check out: [TypeScript in Visual Studio Code](https://code.visualstudio.com/docs/languages/typescript).

> [!TIP]
> The "Dev Tools Implemented" section below is project-agnostic -- consider adding it to your project's README.md or CONTRIBUTING.md!

## Dev Tools Implemented

The section outlines how each tool is configured, and how they can be leveraged to ensure clean and maintainable code.

### Typescript Configuration

In addition to setting `"strict": true` in the TypeScript configuration, Angular's template checking is enabled with Strict Mode as defined in the in the [tsconfig.json file](tsconfig.json).

The following TypeScript compiler options have been added to enforce cleaner and more maintainable code:

- [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
- [noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)
- [noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)
- [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)

These options help ensure stricter type-checking and eliminate unused or potentially unsafe code.

### Eslint

[ESlint](https://eslint.org/) is used for linting JavaScript, TypeScript, HTML, and JSON files in the project. The linting configuration is set in the [eslint.config.js file](./eslint.config.js), with specific overrides for the following file types: `*.js`, `*.ts`, `*.spec.ts`, `*.html`, and `*.json`.

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

To lint all relevant files in the project (not just those in src/), run:

```sh
npm run lint
```

> [!TIP]
> Supress the urge to immediately set rules to "off" or "warn". First, look up the rule and the problem it is correcting for and discuss the rule with other developers on the project.

#### Accessibility (a11y)

This project enables _all_ the accessibility rules provided by angular-eslint by default (denoted by :accessibility: in the @angular-eslint/template rules configuration matrix linked above).

Includes rules for image alt text, form labels, no autofocus, valid ARIA, and more.

These rules are easier to work with if enabled _early_ in the development process and early adoption of these rules is also very helpful for avoiding common accessibility anti-patterns.

The [Accessibility in Angular guide](https://angular.io/guide/accessibility) is a great place to start learning about accessibility in Angular, and it provides resources on the topic of accessibility.

#### Internationalization (i18n)

Angular has powerful [Internationalization](https://angular.dev/guide/i18n) capabilities.

If you plan to implement internationalization in the future, adding i18n attributes early on can make the process easier to scale.

To enable the i18n ESLint rule, simply remove the following from the \*.html section of the eslint.config.js file: [eslint.config.js file](./eslint.config.js):

```json
  "@angular-eslint/template/i18n": "off"
```

> [!NOTE]
> You may also need to customize the [@angular-eslint/template/i18n](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/i18n.md) rule according to your project's needs.

> [!TIP]
> Using `eslint --fix` can automatically add i18n tags in many cases.

### Stylelint

[Stylelint](https://stylelint.io/) is used to lint CSS and SCSS files in the project. It is configured with the [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) configurations.

Rules for linting are applied separately to _.css and _.scss files, and can be customized in the in the [.stylelintrc.json file](./.stylelintrc.json).

To lint all CSS and SCSS files, run:

```sh
npm run lint:style
```

### Prettier

[Prettier](https://prettier.io/) is used to enforce consistent code formatting, reducing diffs by minimizing formatting changes.

In the [.prettierrc.json file](./.prettierrc.json), the `htmlWhitespaceSensitivity` option is set to `ignore` to better format templates. This setting trims unnecessary whitespace around and inside HTML elements. Use `&nbsp;` (non-breaking space) when you need to explicitly maintain spacing between inline elements.

The following Prettier plugins are used:

- [prettier-plugin-sh](https://www.npmjs.com/package/prettier-plugin-sh): Formats shell scripts, such as Git hooks.
- [prettier-plugin-css-order](https://www.npmjs.com/package/prettier-plugin-css-order): Automatically organizes SCSS/CSS properties using [concentric-css](https://github.com/brandon-rhodes/Concentric-CSS)
- [prettier-plugin-organize-imports](https://github.com/trivago/prettier-plugin-sort-imports): Automatically organizes, arranges, and removes unused imports.
- [prettier-plugin-organize-attributes](https://github.com/NiklasPor/prettier-plugin-organize-attributes): Automatically organizes html element attributes.

To format _all_ relevant files within the project run:

```sh
npm run format
```

### Code Spell Checker

[CSpell](https://github.com/streetsidesoftware/cspell) iss used for spell checking for all project files.

To add project-specific words, update the [.cspell.json file](.cspell.json).

The [Code Spell Checker Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) allows you to quickly add misspelled words to the configuration by selecting "Add to config: .cspell.json" from the 'Quick Fix' menu.

To find misspelled words in _all_ files within the project, run:

```sh
npm run lint:spelling
```

### VSCode

The following recommended VSCode extensions from the [.vscode/extensions.json file](.vscode/extensions.json) will be suggested upon opening the project:

- [Angular](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Intellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [Intellicode Completions](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode-completions)- [GitHub Markdown Preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview)

VSCode settings in [.vscode/settings.json](.vscode/settings.json):

- Prettier set as default formatter.
- Auto format and [fix linting errors on save](https://github.com/microsoft/vscode-eslint?tab=readme-ov-file#version-204).
- Auto-save after 3 seconds (doesn't format or fix errors).
- [Disable VSCode's default CSS/SCSS linters](https://github.com/stylelint/vscode-stylelint?tab=readme-ov-file#disable-vs-codes-built-in-linters-optional).
- [Stylelint configured to lint CSS & SCSS](https://github.com/stylelint/vscode-stylelint?tab=readme-ov-file#%EF%B8%8F-only-css-and-postcss-are-validated-by-default).

Files in the `./notes` directory are ignored in [.gitignore](.gitignore) but remain searchable in VSCode for personal notes or reference.

### Husky, Commitlint, tsc-files & Lint-Staged (Git Hooks)

[Husky](https://typicode.github.io/husky/) is used to manage the [pre-commit](.husky/pre-commit), [pre-push](.husky/pre-push), and [commit-msg](.husky/commit-msg) git hooks.

[Commitlint](https://commitlint.js.org/#/) is used to enforce good commit messages according to the [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) configuration in the commit-msg git hook. Additional Commitlint configuration is kept in [commitlint.config.js](./commitlint.config.js).

[Lint-staged](https://www.npmjs.com/package/lint-staged) is used to run prettier, eslint, stylelint, cspell, and [tsc-files](https://www.npmjs.com/package/tsc-files) in pre-commit git hook against all staged files. Lint-staged configuration is kept in [.lintstagedrc.json](.lintstagedrc.json)

### Continuous Integration (CI) Using Github Actions

The [on-pull-request.yml](.github/workflows/on-pull-request.yml) workflow is executed when pushing to a pull request branch. Then the sub-workflow [validate-code.yml](.github/workflows/validate-code.yml) is executed and runs the following commands:

```
- run: npm ci
- run: npm run format:ci
- run: npm run lint:all
- run: npm run test:ci
- run: npm run build
```

The pull request cannot be merged if there are any errors. The output of these workflows can from the 'Actions' tab on the github repository.

## Tips & Tricks

These are tips and tricks that are too opinionated or situational to include in the repository configuration or are not related to Angular project configuration.

### Use VSCode as Git's Editor

I prefer using vs code as my editor when using commands like `git commit` and `git rebase`. Run this command to set it up!

```
git config --global core.editor "code --wait"
```

> [!CAUTION]
> This will only work if the [code command](https://code.visualstudio.com/docs/editor/command-line) in the PATH. Follow these [instructions to setup the vscode cli on macOS](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) if it is not already set up.

### Inlay Hints in VSCode

I _highly_ recommend enabling [inlay hints in vscode](https://code.visualstudio.com/Docs/editor/editingevolved#_inlay-hints). They give me the confidence to use Typescript's [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) without feeling the need specify types 'for visibility'.

Add the following to to the vscode user settings to enable all inlay hints for javascript & typescript:

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

After downloading and installing the font of choice, add the font to the `fontFamily` and enable font `fontLigatures` in the vscode user settings:

```json
{
  "editor.fontFamily": "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true
}
```

The fira code repository maintains [a list of alternative fonts with ligatures](https://github.com/tonsky/FiraCode#alternatives).

### Catppuccin

Looking for a new theme to try? [Catppuccin](https://catppuccin.com/) is great theme.

Catppuccin has 4 flavours: 🌻 Latte, 🪴 Frappé, 🌺 Macchiato, & 🌿 Mocha.

[Catppuccin is everywhere](https://github.com/catppuccin/catppuccin?tab=readme-ov-file#-ports-and-more). I also use it for my [macOS terminal theme](https://github.com/catppuccin/Terminal.app).

VSCode has two extensions: [Catppuccin for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc) and [Catppuccin Icons for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons).

### Oh My Zsh / Oh My Bash / Oh My Posh

These are great frameworks for managing shell configuration. They include helpful functions, plugins, helpers, and themes.

Shell configuration frameworks are a quick way to add git branch & status information to the shell prompt.

### JetBrains Webstorm & Rider

[Webstorm and Rider are now free to use for non-commercial use!](https://blog.jetbrains.com/blog/2024/10/24/webstorm-and-rider-are-now-free-for-non-commercial-use/)

Here are some tips for configuring the dev tools for this project in JetBrains IDEs:

- Eslint, Stylelint, Prettier
  - Search for each name in the settings to easily find all relevant configuration.
  - Double check all three plugins are installed.
  - Set configuration to 'Automatic' for each and match the file extensions that are found in [script section of the package.json file](./package.json).
  - (Optional) Set "Run on save" for each plugin if preferred.
- Install the "CSpell Check" plugin to reduce conflicts with JetBrains' built-in spell-checking.
- (Optional) Set keymap to 'VSCode' or 'VSCode (macOS)' for an easier transition
- (Optional) Install Catppuccin Theme & Catppuccin Icons to be one of the cool kids.
- (Optional) Search for 'ligatures' in the settings to enable font ligatures. JetBrainsMono is capable of displaying ligatures and is installed with the IDE

## Opt-in Angular Schematics

### Angular Material & Angular CDK

Looking for an a11y-friendly, MIT-licensed, Angular component library that strictly adheres to the [Material Design language](https://m3.material.io/) and integrates well with Angular's core libraries, and comes with animations? Then check out [Angular Material](https://material.angular.io/).

The Angular Material documentation is very good and covers many topics including [Supporting Light and Dark Mode](https://material.angular.io/guide/theming#supporting-light-and-dark-mode)

For design-agnostic template utility, consider using the [Angular CDK](https://material.angular.io/cdk/categories) by itself.

### Server-side-rendering & Pre-rendering

Consider enabling [Server-side-rendering and pre-rendering](https://angular.io/guide/ssr) to improve SEO and user experience at the cost of increased deployment complexity.

## Updating

> [!WARNING]
> Depending on the maturity of the project, it may be better to look at the current configuration files for extreme-angular, [release notes](https://github.com/joematthews/extreme-angular/releases) and [commits](https://github.com/joematthews/extreme-angular/commits/main/) and manually make changes instead of merging. If the Angular version has changed, then follow the [instructions to update Angular](https://angular.io/guide/updating) first before attempting to merge or make changes.

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
npm run format
npm run lint:all
npm run test
```
