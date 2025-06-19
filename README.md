# Extreme Angular 20: A Stricter Starter Template

![Meme showing Iron Man wearing the Nano Gauntlet before saving Earth. The caption reads, 'WHEN YOU FINALLY GET ALL THE DEV TOOLS TO WORK TOGETHER'](https://github.com/user-attachments/assets/b7e3a75f-a082-465b-a9cd-7557732b0589)

Extreme Angular is a pre-configured Angular starter template with strict development tools that enforce best practices, ensure consistent code quality, and promote accessibility. It remains fully compatible with the [official Angular documentation](https://angular.dev/overview).

The underlying Angular project was generated with:

```
ng new --strict --style=scss --ssr=false
```

## Why Use Extreme Angular

- **Skip weeks of setup** — ESLint, Prettier, Stylelint, CSpell, Git hooks, and CI work out of the box
- **Zero configuration conflicts** — all tools are tested to work together seamlessly
- **Focus on what matters** — discuss logic and architecture instead of arguing about formatting
- **Consistent quality** — automatic code standards and accessibility checks across your team
- **Clean foundation** — no custom code or complex workarounds needed

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

Found an issue? Check the [existing issues](https://github.com/joematthews/extreme-angular/issues) first, then create a new one if needed.

## Table of Contents

- [Getting Started](#getting-started)
- [Dev Tools Implemented](#dev-tools-implemented)
  - [TypeScript](#typescript)
  - [ESLint](#eslint)
    - [Accessibility (a11y)](#accessibility-a11y) :accessibility:
  - [Stylelint](#stylelint)
  - [Prettier](#prettier)
  - [CSpell](#cspell)
  - [VS Code](#vs-code)
  - [Husky, Commitlint, tsc-files, and Lint-Staged (Git hooks)](#husky-commitlint-tsc-files-and-lint-staged-git-hooks)
  - [Shove Progress](#shove-progress)
  - [Continuous Integration (CI) Using GitHub Actions](#continuous-integration-ci-using-github-actions)
- [Optional Configuration](#optional-configuration)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [End to End Testing (e2e)](#end-to-end-testing-e2e)
- [Tips & Tricks](#tips--tricks)
  - [Custom Formatting](#custom-formatting)
  - [Git Config](#git-config)
  - [Inlay Hints in VS Code](#inlay-hints-in-vs-code)
  - [Font Ligatures](#font-ligatures)
  - [Shell Configuration Frameworks](#shell-configuration-frameworks)
  - [JetBrains IDEs](#jetbrains-ides)
- [Updating](#updating)
- [License Considerations](#license-considerations)

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

**Customize your project:**
Use `CTRL+SHIFT+H` in VS Code to search and replace `extreme-angular` with your chosen project name.

**Start developing:**

```sh
npm start
```

> [!TIP]
> If you're using [VS Code](https://code.visualstudio.com/) and [Chrome](https://www.google.com/chrome/), then press `F5` on the keyboard to start the app in debug mode. For more information check out: [TypeScript in Visual Studio Code](https://code.visualstudio.com/docs/languages/typescript).

> [!TIP]
> The "Dev Tools Implemented" section below is project-agnostic -- consider adding it to your project's README.md or CONTRIBUTING.md!

## Dev Tools Implemented

This section outlines how each tool is configured, and how they can be leveraged to ensure clean and maintainable code.

Use this script to run all checks against all project files:

```sh
npm run lint:all
```

> [!CAUTION]
> These tools are not perfect and they are not a substitute for learning and utilizing the best practices outlined in the Angular guides for [Style](https://angular.dev/style-guide), [Security](https://angular.dev/best-practices/security), [Accessibility](https://angular.dev/best-practices/a11y), and [Performance](https://angular.dev/best-practices/runtime-performance).

### TypeScript

Beyond Angular's default strict mode, this template enables additional TypeScript strictness in [tsconfig.json](tsconfig.json) to catch more potential issues at compile time:

**Enhanced compiler options:**

- **[exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)** — Prevents assigning `undefined` to optional properties, ensuring type safety when properties are explicitly optional vs. potentially undefined
- **[noUnusedLocals](https://www.typescriptlang.org/tsconfig#noUnusedLocals)** — Reports errors for unused local variables, helping keep your code clean and reducing bundle size
- **[noUnusedParameters](https://www.typescriptlang.org/tsconfig#noUnusedParameters)** — Reports errors for unused function parameters, encouraging cleaner function signatures and better code maintainability
- **[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess)** — Adds `undefined` to array access and object property access, forcing explicit checks and preventing runtime errors
- **[useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables)** — Changes catch clause variables from `any` to `unknown`, requiring explicit type checking for better error handling safety

**Type checking commands:**

```sh
npm run lint:tsc:app  # Check app files (*.ts)
npm run lint:tsc:spec # Check test files (*.spec.ts)
npm run lint:tsc:all  # Check all TypeScript files
```

### ESLint

[ESLint](https://eslint.org/) is used for linting JavaScript, TypeScript, HTML, and JSON files in the project. The linting configuration is set in [eslint.config.js](./eslint.config.js), with specific overrides for the following file types: `*.js`, `*.ts`, `*.spec.ts`, `*.html`, and `*.json`.

To ensure effective linting for all project files, the following ESLint plugins are used:

- [@angular-eslint](https://github.com/angular-eslint/angular-eslint)
  - Uses recommended TypeScript and template rules unless explicitly disabled or modified.
  - [@angular-eslint rules configuration matrix](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/README.md).
  - [@angular-eslint/template rules configuration matrix](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/README.md).
- [@typescript-eslint](https://typescript-eslint.io/)
  - Uses both [strict-type-checked](https://typescript-eslint.io/linting/configs#strict-type-checked) and [stylistic-type-checked](https://typescript-eslint.io/linting/configs#stylistic-type-checked) rule sets.
  - [typescript-eslint rules configuration matrix](https://typescript-eslint.io/rules/).
- [eslint-plugin-jasmine](https://github.com/tlvince/eslint-plugin-jasmine)
  - Uses `recommended` rule set.
  - [eslint-plugin-jasmine rules configuration matrix](https://typescript-eslint.io/rules/).
- [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc)
  - Uses `recommended` rule set.
  - [eslint-plugin-jsonc rules configuration matrix](https://ota-meshi.github.io/eslint-plugin-jsonc/rules/).
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
  - Disables rules that may conflict with Prettier formatting.

To lint all relevant files in the project (not just those in src/):

```sh
npm run lint
```

ESLint output is formatted using [eslint-formatter-mo](https://github.com/fengzilong/eslint-formatter-mo). To use normal formatting, remove the `-f mo` option from the `lint` script in [package.json](package.json):

```json
"lint": "eslint -f mo \"**/*.{js,ts,html,json}\"",
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

Rules for linting are applied separately to `.css` and `.scss` files, and they can be customized in [.stylelintrc.json](./.stylelintrc.json).

To lint all CSS and SCSS files:

```sh
npm run lint:style
```

### Prettier

[Prettier](https://prettier.io/) is used to enforce consistent code formatting, reducing diffs by minimizing formatting changes.

In [.prettierrc.json](./.prettierrc.json), the `htmlWhitespaceSensitivity` option is set to `ignore` to better format templates. This setting trims unnecessary whitespace around and inside HTML elements. Use `&nbsp;` (non-breaking space) when you need to explicitly maintain spacing between inline elements.

The following Prettier plugins are used:

- [prettier-plugin-sh](https://github.com/un-ts/prettier/tree/master/packages/sh): Formats shell scripts, such as Git hooks.
- [prettier-plugin-css-order](https://github.com/Siilwyn/prettier-plugin-css-order): Automatically organizes SCSS/CSS properties using [concentric-css](https://github.com/brandon-rhodes/Concentric-CSS)
- [prettier-plugin-organize-imports](https://github.com/trivago/prettier-plugin-sort-imports): Automatically organizes, arranges, and removes unused imports.

To format files within the project:

```sh
npm run format
```

To check if all files are properly formatted:

```sh
npm run lint:format
```

> [!IMPORTANT]  
> Angular v20 dropped the `.component` suffix from component templates, so an override has been setup in [.prettierrc.json](.prettierrc.json) to parse `["src/app/*.html"]` using the Angular parser. If you add additional Angular applications to the project, make sure to update the overrides array to include their HTML file paths (e.g., `'src/new-app/*.html'`) so Prettier can properly parse those template files.

### CSpell

[CSpell](https://github.com/streetsidesoftware/cspell) is used for spell checking for all project files.

To add project-specific words, update [.cspell.json](.cspell.json).

The [Code Spell Checker Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) allows you to quickly add misspelled words to the configuration by selecting "Add to config: .cspell.json" from the 'Quick Fix' menu.

The following dictionaries have been enabled: bash, companies, cpp, csharp, css, filetypes, fonts, go, html, latex, misc, node, npm, php, powershell, python, softwareTerms, and typescript.

To find misspelled words in all files within the project:

```sh
npm run lint:spelling
```

### VS Code

The following VS Code extensions will be recommended when opening the project ([.vscode/extensions.json](.vscode/extensions.json)):

- [Angular](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)

The following VS Code settings have been set in [.vscode/settings.json](.vscode/settings.json):

- Set Prettier as default formatter.
- Turn on format on save
- Turn on auto-save and set delay for 3 seconds (does not format).
- [Disable VS Code linter for CSS/SCSS](https://github.com/stylelint/vscode-stylelint?tab=readme-ov-file#disable-vs-codes-built-in-linters-optional).
- [Enable Stylelint linter CSS & SCSS](https://github.com/stylelint/vscode-stylelint?tab=readme-ov-file#%EF%B8%8F-only-css-and-postcss-are-validated-by-default).
- Switch to workspace version of TypeScript for IntelliSense

### Husky, Commitlint, tsc-files, and Lint-Staged (Git hooks)

[Husky](https://typicode.github.io/husky/) is used to manage the [pre-commit](.husky/pre-commit), [pre-push](.husky/pre-push), and [commit-msg](.husky/commit-msg) git hooks.

[Commitlint](https://commitlint.js.org/#/) is used to enforce good commit messages according to the [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint) configuration in the commit-msg git hook. Additional Commitlint configuration is kept in [commitlint.config.js](./commitlint.config.js).

[Lint-staged](https://github.com/lint-staged/lint-staged) is used to run Prettier, ESLint, Stylelint, CSpell, and [tsc-files](https://github.com/gustavopch/tsc-files) in the pre-commit git hook against all staged files. Lint-staged configuration is kept in [.lintstagedrc.json](.lintstagedrc.json)

### Shove Progress

You can bypass the git hooks using `git commit --no-verify` and `git push --no-verify`. Or, use the `shove` script in emergencies when progress needs to be backed up quickly:

```sh
npm run shove
```

The shove script will stage all files, commit with the commit message `wip: shoved`, and then push.

> [!NOTE]
> The shove script sets [git config push.autoSetupRemote true](https://git-scm.com/docs/git-push#Documentation/git-push.txt-pushautoSetupRemote) to increase the likelihood that the push will be successful. If you prefer to set the remote branch names manually you may need to set this option back to `false`.

> [!WARNING]
> The `--no-verify` flag cannot be disabled. To protect against untested code use a Continuous Integration solution.

### Continuous Integration (CI) Using GitHub Actions

The [on-pull-request.yml](.github/workflows/on-pull-request.yml) action checks all files and run tests when a branch is pushed that is associated with a GitHub pull request.

Pull requests on GitHub cannot be merged until all checks and tests pass. The output of these workflows can found in the 'Actions' tab on the GitHub repository.

To execute these checks and tests locally:

```sh
npm run ci:all
```

## Optional Configuration

### Internationalization (i18n)

Angular has powerful [Internationalization](https://angular.dev/guide/i18n) capabilities.

If you plan to implement internationalization in the future, adding i18n attributes early on can make the process easier to scale naturally.

To enable the i18n ESLint rule, simply add the following rule to the \*.html section of [eslint.config.js](./eslint.config.js):

```js
"@angular-eslint/template/i18n": "error",
```

> [!NOTE]
> You may also need to configure the [@angular-eslint/template/i18n](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/i18n.md) rule according to your project's needs.

> [!TIP]
> Using `eslint --fix` can automatically add i18n tags in many cases.

## End to End Testing (e2e)

Angular has schematics available for several end to end testing frameworks. The [Angular End to End Testing guide](https://angular.dev/tools/cli/end-to-end) will walk you through the steps to set one up.

The [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright) package has rules for the popular [Playwright](https://playwright.dev/) framework. To incorporate these rules, import the plugin in the [eslint.config.js](eslint.config.js) file and then add a new config object that targets `e2e/**/*.spec.ts` files:

```js
import { playwright } from "eslint-plugin-playwright";
```

```js
  {
    files: ['e2e/**/*.spec.ts'],
    extends: [...playwright.configs['flat/recommended'], prettierConfig],
    rules: { ...playwright.configs['flat/recommended'].rules },
  },
```

## Tips & Tricks

These are tips and tricks that are too opinionated or situational to include in the repository configuration or are not related to Angular project configuration.

### Custom Formatting

To customize the indentation, set the indent_size property in [.editorconfig](.editorconfig):

```ini
[*]
indent_size = 2
```

To customize the line width, set the printWidth property in [.prettierrc.json](.prettierrc.json):

```json
{
  "printWidth": 80
}
```

To use double quotes for TS files, set these properties in [.editorconfig](.editorconfig):

```ini
[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false
```

Finally, run `npm run format` to re-format all files, and check the result.

Here are some reasons for not changing the indentation, line width, and quote style:

- The Angular documentation and libraries use 2 space indentation and single quotes.
- [2 space indentation is traditional for various reasons](https://www.google.com/search?q=why+use+2+space+indentation+in+typescript).
- 4 space indentation can look pretty bad in JS/TS with an 80 character line limit.
- Changing the line width can make it more difficult to view editors side-by-side.

### Git Config

To automatically set the remote branch name to match the local branch name on push:

```
git config push.autoSetupRemote true
```

You can use VS Code to edit commit messages when using commands like `git commit`, `git rebase`, and `git commit --amend`. This will only work if the [code command](https://code.visualstudio.com/docs/editor/command-line) in the PATH. Follow these [instructions to set up the VS Code cli on macOS](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) if it is not already set up. Run this command to set it up:

```
git config core.editor "code --wait"
```

If you use GitHub, and you'd prefer to not show your email in public commits, set your email to the one found on your GitHub account settings under the 'Email' tab. This is the same email used by GitHub Desktop, and when edits are made directly on the GitHub site.

```
git config user.email "14097616+joematthews@users.noreply.github.com"
```

> [!TIP]
> You can add the `--global` flag to these commands to make them the default for all new projects.

### Inlay Hints in VS Code

I _highly_ recommend enabling [inlay hints in VS Code](https://code.visualstudio.com/Docs/editor/editingevolved#_inlay-hints). They give me the confidence to use TypeScript's [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) without feeling the need specify types 'for visibility'.

Add the following to the VS Code user settings to enable all inlay hints for JavaScript & TypeScript:

```json
{
  "editor.inlayHints.enabled": "onUnlessPressed",
  "javascript.inlayHints.functionLikeReturnTypes.enabled": true,
  "javascript.inlayHints.parameterNames.enabled": "literals",
  "javascript.inlayHints.parameterTypes.enabled": true,
  "javascript.inlayHints.propertyDeclarationTypes.enabled": true,
  "javascript.inlayHints.variableTypes.enabled": true,
  "typescript.inlayHints.enumMemberValues.enabled": true,
  "typescript.inlayHints.functionLikeReturnTypes.enabled": true,
  "typescript.inlayHints.parameterNames.enabled": "literals",
  "typescript.inlayHints.parameterTypes.enabled": true,
  "typescript.inlayHints.propertyDeclarationTypes.enabled": true,
  "typescript.inlayHints.variableTypes.enabled": true
}
```

To temporarily disable inlay hints use `CTRL + ALT` (or `CTRL + OPTION` on Mac) -- Or, to reverse this behavior use:

```json
{
  "editor.inlayHints.enabled": "offUnlessPressed"
}
```

### Font Ligatures

VS Code is capable of using 'font ligatures' -- not everyone likes font ligatures, but I really enjoy them.

The two most popular fonts that support font ligatures are [Fira Code](https://github.com/tonsky/FiraCode) and [Jet Brains Mono](https://www.jetbrains.com/lp/mono/). I typically use the 'Regular' `*.ttf` variant of each font.

After downloading and installing the font of choice, add the font to the `fontFamily` and enable `fontLigatures` in the VS Code user settings:

```json
{
  "editor.fontFamily": "'Fira Code', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true
}
```

The Fira Code repository maintains [a list of alternative fonts with ligatures](https://github.com/tonsky/FiraCode#alternatives).

### Shell Configuration Frameworks

- [Oh My Zsh](https://ohmyz.sh/): Popular on macOS, where zsh is now default.
- [Oh My Bash](https://github.com/ohmybash/oh-my-bash): Popular on Linux, where bash is usually default.
- [Oh My Posh](https://ohmyposh.dev/): Cross-platform. Popular on Windows. Works with many shells.
- [Starship](https://starship.rs/): Cross-platform. Written in Rust.

These are great frameworks for managing shell configuration. They include helpful functions, plugins, helpers, and themes.

Shell configuration frameworks are a quick way to add git branch & status information to the shell prompt.

### JetBrains IDEs

[Webstorm, Rider & RustRover are now free to use for non-commercial use!](https://sales.jetbrains.com/hc/en-gb/articles/18950890312210-The-free-non-commercial-licensing-FAQ)

Here are some tips for configuring the dev tools for this project in JetBrains IDEs:

- ESLint, Stylelint, Prettier
  - Search for each name in the settings to easily find all relevant configuration.
  - Double check all three plugins are installed.
  - Set configuration to 'Automatic' for each and match the file extensions that are found in scripts section of [package.json](./package.json).
  - (Optional) Set "Run on save" for each plugin if preferred.
- Install the "CSpell Check" plugin to reduce conflicts with JetBrains' built-in spell-checking.
- (Optional) Set keymap to 'VS Code' or 'VS Code (macOS)' for an easier transition
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

## License Considerations

The documentation and configuration files in this project are licensed under the [MIT license](https://tlo.mit.edu/understand-ip/exploring-mit-open-source-license-comprehensive-guide).

I keep the copyright from [Angular's license](https://angular.dev/license) and add my own copyright.

If your project also uses the MIT license, then please consider adding a new copyright line to [LICENSE.txt](LICENSE.txt):

```txt
Copyright (c) 2010-2025 Google LLC. https://angular.dev/license

Copyright (c) 2024-2025 Joe Matthews, et al. https://github.com/joematthews/extreme-angular

Copyright (c) 2025 Your Name or Company
```

If your project is [closed source](https://simple.wikipedia.org/wiki/Closed_source) or uses a [different license](https://opensource.org/licenses), then please consider renaming the file to `LICENSE-Angular.txt`.
