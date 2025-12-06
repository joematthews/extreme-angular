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
