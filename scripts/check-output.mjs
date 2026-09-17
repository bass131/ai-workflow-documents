import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import assert from 'node:assert/strict';
import { languages, languageFromPath } from '../src/data/languages.ts';
import { pagesLocation } from './pages-location.mjs';

const isPages = process.argv.includes('--pages');
const { site = 'http://localhost', base = '/' } = isPages ? pagesLocation() : {};
const root = resolve(isPages ? 'dist-pages' : 'dist');
const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const file = resolve(dir, name);
    if (statSync(file).isDirectory()) walk(file); else files.push(file);
  }
}
walk(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
assert(htmlFiles.length >= 6, 'Expected the home, documentation and 404 pages');
let references = 0;
const texts = new Map(htmlFiles.map(file => [file, readFileSync(file, 'utf8')]));
for (const [file, html] of texts) {
  const route = relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
  const pageUrl = new URL(base + route, site);
  const lang = languageFromPath(pageUrl.pathname, base).code;
  assert(html.includes('lang="' + lang + '"'), route + ': incorrect page language');
  assert(/<title>[^<]+<\/title>/.test(html), route + ': missing title');
  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*?\b(?:href|src)="([^"]+)"[^>]*>/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(data:|mailto:|tel:|javascript:)/.test(raw)) continue;
    const url = new URL(raw, pageUrl);
    if (url.origin !== pageUrl.origin) continue;
    assert(url.pathname.startsWith(base), route + ': reference escaped base: ' + raw);
    if (/\brel="canonical"/.test(match[0])) continue;
    let target = resolve(root, decodeURIComponent(url.pathname.slice(base.length)));
    assert(target === root || target.startsWith(root + sep), 'Reference escaped output');
    if (existsSync(target) && statSync(target).isDirectory()) target = resolve(target, 'index.html');
    assert(existsSync(target), route + ': missing ' + raw);
    if (url.hash && texts.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(texts.get(target).includes('id="' + id + '"'), route + ': missing fragment ' + raw);
    }
    references++;
  }
}

// CSS backgrounds include the locally optimized timber image and must obey the same base.
for (const file of files.filter(file => /\.(?:css|html)$/.test(file))) {
  const route = relative(root, file).split(sep).join('/');
  const fileUrl = new URL(base + route, site);
  const source = readFileSync(file, 'utf8');
  const css = file.endsWith('.html') ? [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map(match => match[1]).join('\n') : source;
  for (const match of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    const raw = match[1].trim();
    if (/^(?:data:|#)/.test(raw)) continue;
    const url = new URL(raw, fileUrl);
    if (url.origin !== fileUrl.origin) continue;
    assert(url.pathname.startsWith(base), route + ': CSS reference escaped base: ' + raw);
    const target = resolve(root, decodeURIComponent(url.pathname.slice(base.length)));
    assert(target.startsWith(root + sep) && existsSync(target), route + ': missing CSS asset: ' + raw);
    references++;
  }
}

// Only public output is scanned. Operational guides and test fixtures are never copied into dist.
const privatePatterns = [
  /[A-Za-z]:[\\/](?:Users|Dev)[\\/]/,
  /\/Users\/[^/]+\//,
  /(?:github_pat_|gh[pousr]_)[A-Za-z0-9_]{20,}/,
  /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,
  /(?:notion\.so|notion\.site)\//i,
];
for (const file of files.filter(file => /\.(?:html|js|json|css|svg|xml|txt|md|map)$/.test(file))) {
  const text = readFileSync(file, 'utf8');
  assert(!privatePatterns.some(pattern => pattern.test(text)), 'Potential private data in ' + relative(root, file));
  assert(!/(^|[\\/])(?:AGENTS\.md|README\.md|VALIDATION\.md|\.env|node_modules)([\\/]|$)/.test(relative(root, file)), 'Operational file in public output');
}
assert(existsSync(resolve(root, 'pagefind/pagefind.js')), 'Missing search bundle');
const index = JSON.parse(readFileSync(resolve(root, 'pagefind/pagefind-entry.json'), 'utf8'));
for (const {code} of languages) assert(index.languages[code]?.page_count >= 8, 'Missing search pages for ' + code);
console.log('PASS ' + htmlFiles.length + ' HTML pages, ' + references + ' internal references, English/Korean search indexes, public-output scan (' + base + ')');
