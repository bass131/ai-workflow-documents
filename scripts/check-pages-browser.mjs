import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
import { pagesLocation } from './pages-location.mjs';

const { base } = pagesLocation();
const root = resolve('dist-pages');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.wasm': 'application/wasm' };
const server = createServer((request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = pathname.startsWith(base) ? resolve(root, pathname.slice(base.length)) : '';
    if (!file || !(file === root || file.startsWith(root + sep))) { response.writeHead(404); response.end(); return; }
    if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
    const missing = !existsSync(file);
    if (missing) file = resolve(root, '404.html');
    response.writeHead(missing ? 404 : 200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    response.end(readFileSync(file));
  } catch { response.writeHead(400); response.end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const origin = 'http://127.0.0.1:' + server.address().port;
let browser;
const errors = [];
const screenshotDir = process.env.QA_SCREENSHOT_DIR;
if (screenshotDir) mkdirSync(screenshotDir, { recursive: true });
const capture = async (page, name) => {
  if (screenshotDir) await page.screenshot({ path: resolve(screenshotDir, name + '.png'), fullPage: true, animations: 'disabled' });
};
try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light' });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
  await page.goto(origin + base, { waitUntil: 'networkidle' });
  await capture(page, 'home-desktop-light');
  for (const [key, text] of Object.entries({ minor: '가정을 기록하고 진행', decision: '의존하는 작업만 대기', failure: '완료 불가 · 원인 확인', resume: '실제 상태와 기록을 대조' })) {
    const button = page.locator('[data-scenario=' + key + ']');
    await button.focus();
    await page.keyboard.press('Enter');
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#scenario-status').textContent(), text);
  }
  await page.locator('#theme').selectOption('dark');
  await capture(page, 'home-desktop-dark');
  await page.getByRole('link', { name: '전체 흐름 읽기' }).click();
  await page.waitForLoadState('networkidle');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await capture(page, 'docs-desktop-dark');
  await page.locator('starlight-theme-select select:visible').selectOption('light');
  await capture(page, 'docs-desktop-light');
  await page.keyboard.press('Control+k');
  await page.locator('dialog input').fill('재개');
  await page.locator('.pagefind-ui__result-link').first().waitFor();
  await capture(page, 'search-light');
  const results = page.locator('.pagefind-ui__result-link');
  assert((await results.allTextContents()).some(text => text.includes('재개')));
  for (const href of await results.evaluateAll(links => links.map(link => link.href))) {
    assert(new URL(href).pathname.startsWith(base), 'Search result escaped Pages base: ' + href);
  }
  await results.filter({ hasText: '단계 기록과 재개' }).first().click();
  await page.waitForURL('**' + base + 'workflow/phase-and-resume/**');
  assert.equal(await page.locator('h1').textContent(), '단계 기록과 재개');
  await page.goto(origin + base + 'design/decisions/', { waitUntil: 'networkidle' });
  const routes = [];
  function discover(dir, prefix = '') {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      if (item.isDirectory()) discover(resolve(dir, item.name), prefix + item.name + '/');
      else if (item.name === 'index.html') routes.push(prefix);
    }
  }
  discover(root);
  for (const route of routes) {
    const response = await context.request.get(origin + base + route);
    assert(response.ok(), route);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + base, { waitUntil: 'networkidle' });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile homepage overflow');
  await page.getByRole('link', { name: '전체 흐름 읽기' }).click();
  await page.getByRole('button', { name: '메뉴', exact: true }).click();
  await page.locator('#starlight__sidebar').getByRole('link', { name: '현재 선택과 재검토 기준', exact: true }).click();
  await page.waitForURL('**' + base + 'design/decisions/');
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile document overflow');
  for (const theme of ['light', 'dark']) {
    await page.goto(origin + base, { waitUntil: 'networkidle' });
    await page.locator('#theme').selectOption(theme);
    await page.locator('[data-scenario=failure]').click();
    await capture(page, 'home-mobile-' + theme);
    await page.goto(origin + base + 'workflow/phase-and-resume/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), theme + ' mobile overflow');
    await capture(page, 'docs-mobile-' + theme);
    await page.locator('button[data-open-modal]:visible').click();
    await page.locator('dialog input').fill('AgentDeck');
    await page.locator('.pagefind-ui__result-link').first().waitFor();
    await capture(page, 'search-mobile-' + theme);
    await page.keyboard.press('Escape');
  }
  await page.goto(origin + base, { waitUntil: 'networkidle' });
  await page.locator('#theme').selectOption('auto');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
  for (const route of ['', 'workflow/overview/']) {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(origin + base + route, { waitUntil: 'networkidle' });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '320px overflow');
  }
  const missing = await context.request.get(origin + base + 'not-a-page/');
  assert.equal(missing.status(), 404);
  assert((await missing.text()).includes('href="' + base + '"'), '404 home link must use absolute base');
  assert.deepEqual(errors, []);
  console.log('PASS Pages browser smoke: ' + routes.length + ' routes, scenarios/keyboard, themes, Korean search and result navigation, light/dark mobile and search, system preference, 320px, mobile menu, 404 (' + base + ')');
} finally {
  if (browser) await browser.close();
  await new Promise(done => server.close(done));
}
