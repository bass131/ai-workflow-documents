import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';
import { pagesLocation } from './pages-location.mjs';

const { base } = pagesLocation();
const root = resolve('dist-pages');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.wasm': 'application/wasm', '.webp': 'image/webp' };
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
  if (screenshotDir) await page.screenshot({ path: resolve(screenshotDir, name + '.png'), fullPage: !name.startsWith('menu-'), animations: 'disabled' });
};
try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light' });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()); });
  await page.goto(origin + base, { waitUntil: 'networkidle' });

  const woodUrl = await page.locator('.flow').evaluate(element => getComputedStyle(element).backgroundImage.match(/url\("([^\"]+)"\)/)?.[1]);
  assert(woodUrl && new URL(woodUrl).pathname.startsWith(base), 'Wood image escaped Pages base');
  const wood = await context.request.get(woodUrl);
  assert(wood.ok() && wood.headers()['content-type'].startsWith('image/webp'), 'Wood image missing or incorrect MIME');
  assert((await wood.body()).length < 80000, 'Wood image exceeded 80KB budget');
  assert.deepEqual(await page.evaluate(url => new Promise((resolve, reject) => {
    const image = new Image(); image.onload = () => resolve([image.naturalWidth, image.naturalHeight]); image.onerror = reject; image.src = url;
  }), woodUrl), [768, 768]);
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
  const tocLink = page.locator('.right-sidebar starlight-toc a').filter({ hasText: '02 · 필요한 만큼 나눈다' });
  await tocLink.click();
  await page.waitForFunction(() => [...document.querySelectorAll('.right-sidebar a')].some(link => link.textContent.includes('02 · 필요한 만큼 나눈다') && link.getAttribute('aria-current') === 'true'));
  const group = page.locator('.workshop-sidebar details').filter({ has: page.locator('summary', { hasText: '워크플로 가이드' }) });
  await group.locator('summary').click();
  assert.equal(await group.getAttribute('open'), null);
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await group.getAttribute('open'), null, 'Sidebar group preference did not persist');
  await group.locator('summary').click();
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
    const menu = page.getByRole('button', { name: '메뉴', exact: true });
    await menu.click();

    const menuWoodUrl = await page.locator('.workshop-sidebar').evaluate(async element => {
      const url = getComputedStyle(element).backgroundImage.match(/url\("([^\"]+)"\)/)?.[1];
      if (!url) throw new Error('Missing menu wood image');
      const image = new Image(); image.src = url; await image.decode(); return url;
    });
    assert.equal(menuWoodUrl, woodUrl, 'Menu must share the optimized home texture');
    await capture(page, 'menu-mobile-' + theme);
    assert(await page.locator('#starlight__sidebar').evaluate(el => el.matches(':popover-open')));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#starlight__sidebar').evaluate(el => el.matches(':popover-open')), false);
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

  // The shared header must keep every control reachable at its layout breakpoints.
  for (const width of [320, 768, 950, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['', 'workflow/overview/']) {
      await page.goto(origin + base + route, { waitUntil: 'networkidle' });
      const header = await page.evaluate(() => {
        const element = document.querySelector('body.home .home-header, .page > header.header');
        const controls = [...element.querySelectorAll('a,button[data-open-modal],select')];
        const menu = document.querySelector('.sl-menu-button');
        if (menu) controls.push(menu);
        const boxes = controls.filter(control => control.checkVisibility()).map(control => control.getBoundingClientRect());
        const overlap = boxes.some((a, i) => boxes.slice(i + 1).some(b => a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1));
        return { overlap, offscreen: boxes.some(box => box.left < 0 || box.right > innerWidth || box.top < 0), height: element.getBoundingClientRect().height, wood: getComputedStyle(element).backgroundImage.includes('wood049') };
      });
      assert(header.wood && !header.overlap && !header.offscreen && header.height <= 120, 'Header controls overlap or escape at ' + width + ': ' + route);
    }
  }
  assert.equal(await page.locator('.section-nav a[aria-current]').textContent(), '가이드');
  const anchor = page.locator('.right-sidebar starlight-toc a:visible').filter({ hasText: '02 · 필요한 만큼 나눈다' });
  await anchor.click();
  await page.waitForFunction(() => {
    const heading = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    return heading && heading.getBoundingClientRect().top >= document.querySelector('.page > header.header').getBoundingClientRect().bottom;
  });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.locator('.header-theme select').selectOption('dark');
  assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
  await page.locator('.header-theme select').selectOption('auto');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
  const missing = await context.request.get(origin + base + 'not-a-page/');
  assert.equal(missing.status(), 404);
  assert((await missing.text()).includes('href="' + base + '"'), '404 home link must use absolute base');
  assert.deepEqual(errors, []);
  console.log('PASS Pages browser smoke: ' + routes.length + ' routes, responsive headers/active section/anchor offset, optimized wood/base/size, sidebar persistence, TOC tracking, scenarios/keyboard, themes, Korean search and result navigation, light/dark mobile and search, system preference, 320px, mobile menu, 404 (' + base + ')');
} finally {
  if (browser) await browser.close();
  await new Promise(done => server.close(done));
}
