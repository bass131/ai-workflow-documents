import { execFileSync } from 'node:child_process';
import { pagesLocation } from './pages-location.mjs';
const { site, base } = pagesLocation();
console.log('Building Pages output for ' + site + base);
execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, BUILD_TARGET: 'pages' },
});
