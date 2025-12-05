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
function sourceToCompiledPath(
  sourcePath: string,
  outputDir: string,
): string | null {
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
    if (
      segments.length >= 2 &&
      segments[segments.length - 1] === segments[segments.length - 2]
    ) {
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
