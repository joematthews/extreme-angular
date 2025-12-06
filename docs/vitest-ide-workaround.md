# VS Code Vitest Extension Workaround

> **Status:** Experimental and unsupported
> **Tracking issue:** [angular/angular-cli#31734](https://github.com/angular/angular-cli/issues/31734)

Angular 21 uses Vitest for unit testing through its `@angular/build:unit-test` builder. However, the [VS Code Vitest extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) doesn't work out of the box because it expects a `vitest.config.ts` file to hook into.

This guide explains how to add a workaround that enables Test Explorer integration in VS Code. **This is not officially supported** and may break with future Angular updates.

## How It Works

The workaround:

1. Runs `ng test --dump-virtual-files` to compile tests to `.angular/cache`
2. Creates a Vite plugin that proxies your source `.spec.ts` files to Angular's compiled output
3. Auto-rebuilds when source files are newer than compiled output

This lets VS Code's Test Explorer show your source files while actually running Angular's pre-compiled test bundles.

## Prerequisites

- Angular 21 project with Vitest (default for `ng new`)
- VS Code with the [Vitest extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

## Implementation

### Step 1: Add vitest.config.ts

Create `vitest.config.ts` in your project root:

```ts
/// <reference types="vitest" />
/**
 * WORKAROUND: Vitest + Angular 21 integration for IDEs.
 *
 * Angular's unit-test builder doesn't yet support running Vitest directly,
 * preventing IDE vitest tooling from working as expected.
 *
 * This config/hack works around that by:
 *   1. Using `ng test --dump-virtual-files` to compile tests to .angular/cache
 *   2. Proxying source files (src/**\/*.spec.ts) to the compiled JS output
 *   3. Auto-rebuilding when source files are newer than compiled output
 *
 * This allows the VS Code Vitest extension to show source files in the tree
 * while actually running Angular's pre-compiled test bundles.
 *
 * TEMPORARY: This workaround will be obsolete when Angular supports Vitest natively.
 * Track progress: https://github.com/angular/angular-cli/issues/31734
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

function findTestOutputDir(): string | null {
  const angularCacheBase = '.angular/cache';
  if (!existsSync(angularCacheBase)) return null;

  // Find version directory (e.g., "21.0.0")
  const version = readdirSync(angularCacheBase)
    .filter((f) => /^\d+\.\d+\.\d+$/.test(f))
    .sort()
    .reverse()[0];
  if (!version) return null;

  // Find project directory
  const versionDir = join(angularCacheBase, version);
  const projects = readdirSync(versionDir).filter(
    (f) => f !== 'angular-webpack' && f !== 'babel-webpack',
  );
  const project = projects[0];
  if (!project) return null;

  const outputDir = join(versionDir, project, 'unit-test', 'output-files');
  if (!existsSync(outputDir)) return null;
  return outputDir;
}

/**
 * Checks if any source files are newer than the compiled output.
 */
function needsRebuild(outputDir: string): boolean {
  const initTestbed = join(outputDir, 'init-testbed.js');
  if (!existsSync(initTestbed)) return true;

  const compiledTime = statSync(initTestbed).mtimeMs;

  // Check all spec files and their related source files
  function checkDir(dir: string): boolean {
    if (!existsSync(dir)) return false;

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        if (checkDir(fullPath)) return true;
      } else if (
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.html') ||
        entry.name.endsWith('.scss') ||
        entry.name.endsWith('.css')
      ) {
        if (statSync(fullPath).mtimeMs > compiledTime) return true;
      }
    }
    return false;
  }

  return checkDir('src');
}

/** Rebuilds Angular test files by running ng test with dump-virtual-files. */
function rebuildTests(): void {
  console.log('\x1b[36m[vitest] Rebuilding Angular tests...\x1b[0m');
  try {
    execSync('npx ng test --watch=false --dump-virtual-files', {
      stdio: 'inherit',
      timeout: 120000,
    });
  } catch {
    // ng test exits with error if tests fail, but files are still dumped
    // We can continue since we just need the compiled output
  }
}

/**
 * Maps source spec file paths to their compiled equivalents in Angular's cache.
 * Example: src/app/app.spec.ts -> .angular/cache/.../spec-app-app.js
 *
 * WINDOWS BUG WORKAROUND: Angular's test-discovery.js has a bug where testFiles are
 * converted to POSIX paths but the roots array is not, causing removePrefix to fail
 * and fall back to basename only (e.g., spec-app.js instead of spec-app-app.js).
 * See: node_modules/@angular/build/src/builders/unit-test/test-discovery.js
 */
function sourceToCompiledPath(sourcePath: string, outputDir: string): string | null {
  // Handle both absolute and relative paths
  const normalizedPath = sourcePath.replace(/\\/g, '/');
  let relativePath: string | undefined;

  if (normalizedPath.includes('/src/')) {
    relativePath = normalizedPath.split('/src/')[1];
  } else if (normalizedPath.startsWith('src/')) {
    relativePath = normalizedPath.substring(4);
  }

  if (!relativePath) {
    return null;
  }

  // Convert app/foo.spec.ts -> spec-app-foo.js
  const withoutExt = relativePath.replace(/\.spec\.ts$/, '');
  const compiledName = `spec-${withoutExt.replace(/\//g, '-')}.js`;
  const compiledPath = join(outputDir, compiledName);

  if (existsSync(compiledPath)) {
    return compiledPath;
  }

  // Windows uses different naming - try alternative patterns
  if (process.platform === 'win32') {
    const segments = withoutExt.split('/');

    // Try shortened names that Windows/Angular might use
    const lastSegment = segments.at(-1) ?? '';
    const fallbacks = [
      `spec-${lastSegment}.js`, // Just filename: spec-app.js
    ];

    // If path has duplicates like app/app, try without duplication
    if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
      fallbacks.push(`spec-${segments.slice(0, -1).join('-')}.js`);
    }

    for (const fallback of fallbacks) {
      const fallbackPath = join(outputDir, fallback);
      if (existsSync(fallbackPath)) {
        return fallbackPath;
      }
    }
  }

  return null;
}

/**
 * Vite plugin that redirects source spec file imports to compiled output.
 * Checks freshness on every load to work with VS Code extension caching.
 */
function angularTestProxyPlugin(outputDir: string): Plugin {
  let absoluteOutputDir = resolve(outputDir);
  let currentOutputDir = outputDir;

  function doRebuild(): void {
    rebuildTests();
    const newDir = findTestOutputDir();
    if (newDir) {
      currentOutputDir = newDir;
      absoluteOutputDir = resolve(newDir);
    }
  }

  return {
    name: 'angular-test-proxy',
    enforce: 'pre',

    resolveId(id) {
      // Handle chunk imports from compiled files
      if (id.startsWith('./chunk-') && id.endsWith('.js')) {
        const chunkPath = join(absoluteOutputDir, id.substring(2));
        if (existsSync(chunkPath)) return chunkPath;
      }

      // Handle spec file resolution
      if (id.endsWith('.spec.ts')) {
        const compiled = sourceToCompiledPath(id, currentOutputDir);
        if (compiled) return resolve(compiled);
      }

      return null;
    },

    load(id) {
      // If loading a source spec file, check freshness and redirect to compiled
      if (id.endsWith('.spec.ts')) {
        // Check freshness on EVERY load - critical for VS Code extension
        if (needsRebuild(currentOutputDir)) doRebuild();

        const compiled = sourceToCompiledPath(id, currentOutputDir);
        if (compiled) return readFileSync(compiled, 'utf-8');
      }
      return null;
    },
  };
}

// Check if test output exists and is up to date
let cacheDir = findTestOutputDir();
if (!cacheDir || needsRebuild(cacheDir)) {
  rebuildTests();
  cacheDir = findTestOutputDir();
}
if (!cacheDir)
  console.warn(
    '\x1b[33m[vitest] Angular test build not found. Run "npm run test:build" first.\x1b[0m',
  );

export default defineConfig({
  plugins: cacheDir ? [angularTestProxyPlugin(cacheDir)] : [],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'], // Show source files in the tree
    // Setup files run before each test file:
    // 1. vitest.setup.ts - checks for rebuild and rebuilds if needed
    // 2. init-testbed.js - Angular TestBed initialization
    setupFiles: cacheDir
      ? ['./vitest.setup.ts', `${cacheDir}/init-testbed.js`]
      : ['./vitest.setup.ts'],
    // Match Angular's test builder defaults
    isolate: false,
    sequence: {
      setupFiles: 'list',
    },
    pool: 'forks', // Force fresh module evaluation - forks pool doesn't share module cache
    cache: false, // Disable file system caching
  },
});
```

### Step 2: Add vitest.setup.ts

Create `vitest.setup.ts` in your project root:

```ts
/**
 * WORKAROUND: Vitest + Angular 21 integration for IDEs.
 * see comment in vitest.config.ts for more details.
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function findTestOutputDir(): string | null {
  const angularCacheBase = '.angular/cache';
  if (!existsSync(angularCacheBase)) return null;

  // Find version directory (e.g., "21.0.0")
  const version = readdirSync(angularCacheBase)
    .filter((f) => /^\d+\.\d+\.\d+$/.test(f))
    .sort()
    .reverse()[0];
  if (!version) return null;

  // Find project directory
  const versionDir = join(angularCacheBase, version);
  const project = readdirSync(versionDir).find(
    (f) => f !== 'angular-webpack' && f !== 'babel-webpack',
  );
  if (!project) return null;

  const outputDir = join(versionDir, project, 'unit-test', 'output-files');
  if (!existsSync(outputDir)) return null;
  return outputDir;
}

function needsRebuild(outputDir: string): boolean {
  const initTestbed = join(outputDir, 'init-testbed.js');
  if (!existsSync(initTestbed)) return true;

  const compiledTime = statSync(initTestbed).mtimeMs;

  function checkDir(dir: string): boolean {
    if (!existsSync(dir)) return false;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (checkDir(fullPath)) return true;
      } else if (
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.html') ||
        entry.name.endsWith('.scss') ||
        entry.name.endsWith('.css')
      ) {
        if (statSync(fullPath).mtimeMs > compiledTime) return true;
      }
    }
    return false;
  }

  return checkDir('src');
}

// Run rebuild check
const outputDir = findTestOutputDir();
if (!outputDir || needsRebuild(outputDir)) {
  console.log('\x1b[36m[vitest] Source changed, rebuilding...\x1b[0m');
  try {
    execSync('npx ng test --watch=false --dump-virtual-files', {
      stdio: 'inherit',
      timeout: 120000,
    });
  } catch {
    // ng test exits with error if tests fail, but files are still dumped
  }
}
```

### Step 3: Update tsconfig.json

Add `vitest/globals` types to the root `tsconfig.json` to help VS Code recognize test globals like `describe` and `it`:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

This should be added to the `compilerOptions` object in your root `tsconfig.json` file — not `tsconfig.spec.json`. Even though `tsconfig.spec.json` already includes these types for `ng test`, VS Code needs them in the root config for editor support when using this workaround.

### Step 4: Add VS Code extension recommendation

Update `.vscode/extensions.json`:

```json
{
  "recommendations": ["vitest.explorer"]
}
```

### Step 5: Build tests initially

Run the test build once to populate the cache:

```sh
npm run test:build
```

Or if you don't have that script:

```sh
npx ng test --watch=false --dump-virtual-files
```

### Step 6: Verify

1. Open VS Code
2. Install the Vitest extension if prompted
3. Open the Testing sidebar (beaker icon)
4. You should see your test files listed
5. Click the play button to run tests

## Known Limitations

- **Performance at scale:** The workaround may be slow with large test suites since it checks file timestamps on every load.
- **Windows path issues:** Angular has a bug where compiled test filenames differ on Windows. The workaround includes fallback logic, but edge cases may occur.
- **Cache invalidation:** If tests behave unexpectedly, try deleting `.angular/cache` and rebuilding.
- **No watch mode sync:** The VS Code extension won't automatically detect when `ng test --watch` rebuilds files.

## Reverting the Workaround

To remove this workaround and return to the default Angular setup:

### Step 1: Delete the config files

```sh
rm vitest.config.ts vitest.setup.ts
```

### Step 2: Remove types from tsconfig.json

If you added `"types": ["vitest/globals"]` to your root `tsconfig.json`, remove it. The types in `tsconfig.spec.json` are sufficient for `ng test`.

### Step 3: Remove extension recommendation

Edit `.vscode/extensions.json` and remove `"vitest.explorer"` from the recommendations array.

### Step 4: Clear the cache (optional)

```sh
rm -rf .angular/cache
```

### Step 5: Verify

Run tests to confirm everything still works:

```sh
npm test
```

Tests will continue to run via Angular's `@angular/build:unit-test` builder — you just won't have Test Explorer integration in VS Code.

## Future

This workaround should become unnecessary when Angular adds native IDE integration for Vitest. Track progress at [angular/angular-cli#31734](https://github.com/angular/angular-cli/issues/31734).

---

_Credit: This workaround was developed by [@replete](https://github.com/replete) in [PR #71](https://github.com/joematthews/extreme-angular/pull/71)._
