import assert from 'node:assert/strict';

export async function checkDocumentDrawer(page, context, origin, base, capture = async () => {}) {
  const panel = page.locator('#starlight__sidebar');
  const toggle = page.locator('.document-toggle');
  const isOpen = async () => await toggle.getAttribute('aria-expanded') === 'true';
  const waitState = async open => {
    await page.waitForFunction(open => document.querySelector('.document-toggle')?.getAttribute('aria-expanded') === String(open), open);
    await panel.waitFor({ state: open ? 'visible' : 'hidden' });
    assert.equal(await panel.getAttribute('aria-hidden'), String(!open));
  };
  const readingStart = () => page.evaluate(() => {
    const frame = document.querySelector('.main-frame');
    return frame ? parseFloat(getComputedStyle(frame).paddingInlineStart) : document.querySelector('.home-body').getBoundingClientRect().x;
  });
  const centered = async () => {
    const reading = await page.locator('.main-pane .content-panel').first().evaluate(panel => {
      const container = panel.querySelector('.sl-container');
      const a = panel.getBoundingClientRect(), b = container.getBoundingClientRect();
      return { difference: Math.abs((b.left - a.left) - (a.right - b.right)), alignment: getComputedStyle(container).textAlign };
    });
    assert(reading.difference <= 2, 'Reading section should be centered');
    assert.notEqual(reading.alignment, 'center', 'Text alignment should be preserved');
  };
  let homeLinks;
  for (const width of [1440, 800, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['', 'workflow/overview/']) {
      await page.goto(origin + base + route, { waitUntil: 'networkidle' });
      await waitState(false); // Fresh visit, or a previously explicit close.
      assert.equal(await readingStart(), 0, 'Closed panel must release the left column');
      if (route) await centered();
      else {
        const title = await page.locator('.intro-title').evaluate(group => {
          const image = group.querySelector('.workshop-mascot').getBoundingClientRect();
          const heading = group.querySelector('h1').getBoundingClientRect();
          return { left: image.right <= heading.left, within: heading.right <= innerWidth, aligned: Math.abs(image.top + image.height / 2 - heading.top - heading.height / 2) < 2 };
        });
        assert(title.left && title.within && title.aligned, 'Mascot/title placement must be preserved');
      }
      await toggle.focus(); await page.keyboard.press('Enter'); await waitState(true);
      assert(await panel.locator('.drawer-close').evaluate(node => node === document.activeElement));
      assert.equal(await readingStart(), width >= 800 ? 320 : 0);
      assert.equal(await page.locator('.main-frame, .home-body').getAttribute('inert'), null, 'Open navigation is nonmodal');
      if (route) await centered();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Open navigation overflow');
      const links = await panel.locator('a').evaluateAll(nodes => nodes.map(node => ({ text: node.textContent.trim(), path: new URL(node.href).pathname })));
      if (!route) homeLinks = links;
      else { assert.deepEqual(links, homeLinks); assert.equal(await panel.locator('a[aria-current="page"]').textContent(), '전체 흐름'); }
      assert(await panel.locator('a:visible, summary:visible, button:visible').evaluateAll(nodes => Math.min(...nodes.map(node => node.getBoundingClientRect().height))) >= 43);
      if (width < 800) {
        assert(await page.evaluate(() => {
          const panel = document.querySelector('.document-drawer').getBoundingClientRect();
          const title = document.querySelector('h1').getBoundingClientRect();
          return panel.bottom <= title.top && title.bottom < innerHeight && panel.height <= innerHeight * .37;
        }), 'Mobile list must leave the new page heading visible below it');
        await panel.locator('a:visible').last().focus(); await page.keyboard.press('Tab');
        assert(await panel.evaluate(node => !node.contains(document.activeElement)), 'Tab should reach the page, not trap focus');
      }
      await page.locator('h1').click();
      assert(await isOpen(), 'Body clicks must not close the list');
      await capture(page, `drawer-${route ? 'docs' : 'home'}-${width}`);
      await page.keyboard.press('Escape'); await waitState(false);
      assert(await toggle.evaluate(node => node === document.activeElement), 'Escape restores the opener');
      assert.equal(await readingStart(), 0);
      await toggle.click(); await panel.locator('.drawer-close').click(); await waitState(false);
      assert(await toggle.evaluate(node => node === document.activeElement), 'Close restores the opener');
      await toggle.click(); await toggle.click(); await waitState(false);
    }
  }

  // Explicit open survives real links, reloads, and browser back/forward navigation.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + base, { waitUntil: 'networkidle' });
  await toggle.click();
  await panel.getByRole('link', { name: '전체 흐름', exact: true }).click();
  await page.waitForURL('**' + base + 'workflow/overview/'); await waitState(true);
  await panel.getByRole('link', { name: '목표와 성공 기준', exact: true }).click();
  await page.waitForURL('**' + base + 'workflow/goals-and-scope/'); await waitState(true);
  assert.equal(await panel.locator('a[aria-current="page"]').textContent(), '목표와 성공 기준');
  await page.reload({ waitUntil: 'networkidle' }); await waitState(true);
  await page.goBack({ waitUntil: 'networkidle' }); await waitState(true);
  await page.goForward({ waitUntil: 'networkidle' }); await waitState(true);
  await page.keyboard.press('Control+k'); await page.locator('dialog[open] input').waitFor();
  await page.locator('dialog input').fill('자율성');
  await page.locator('.pagefind-ui__result-link').filter({ hasText: '자율성' }).first().waitFor();
  await page.keyboard.press('Escape');
  assert(await isOpen(), 'Closing search must not change the list preference');
  await panel.getByRole('link', { name: '홈', exact: true }).click();
  await page.waitForURL(origin + base); await waitState(true);
  await panel.locator('.drawer-close').click(); await waitState(false);
  await page.reload({ waitUntil: 'networkidle' }); await waitState(false);
  await page.goBack({ waitUntil: 'networkidle' }); await waitState(false);
  await page.goForward({ waitUntil: 'networkidle' }); await waitState(false);

  // The same-origin preference synchronizes with another tab, including a cached page.
  await toggle.click();
  const other = await context.newPage();
  try {
    await other.goto(origin + base);
    assert.equal(await other.locator('.document-toggle').getAttribute('aria-expanded'), 'true');
    await other.locator('.document-toggle').click(); await waitState(false);
    await other.locator('.document-toggle').click(); await waitState(true);
  } finally { await other.close(); }
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.locator('.main-frame, .home-body').getAttribute('inert'), null);
  assert(await page.evaluate(() => document.querySelector('.document-drawer').getBoundingClientRect().bottom <= document.querySelector('h1').getBoundingClientRect().top));
  await page.setViewportSize({ width: 1440, height: 900 });
  await panel.locator('.drawer-close').click(); await waitState(false);

  // Invalid or unavailable storage never disables navigation or throws a page error.
  for (const mode of ['invalid', 'unavailable']) {
    const isolated = await context.browser().newContext(); const errors = [];
    await isolated.addInitScript(mode => {
      if (mode === 'invalid') localStorage.setItem('wf-document-list', 'invalid-value');
      else {
        const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
        Storage.prototype.getItem = function(key) { if (key === 'wf-document-list') throw new DOMException('Storage disabled', 'SecurityError'); return get.call(this, key); };
        Storage.prototype.setItem = function(key, value) { if (key === 'wf-document-list') throw new DOMException('Storage disabled', 'SecurityError'); return set.call(this, key, value); };
      }
    }, mode);
    try {
      const test = await isolated.newPage(); test.on('pageerror', e => errors.push(e.message));
      await test.goto(origin + base);
      assert.equal(await test.locator('.document-toggle').getAttribute('aria-expanded'), 'false');
      await test.locator('.document-toggle').click();
      assert.equal(await test.locator('.document-toggle').getAttribute('aria-expanded'), 'true');
      await test.locator('.drawer-close').click();
      assert.equal(await test.locator('.document-toggle').getAttribute('aria-expanded'), 'false');
      assert.deepEqual(errors, []);
    } finally { await isolated.close(); }
  }

  const touch = await context.browser().newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  try {
    const mobile = await touch.newPage(); await mobile.goto(origin + base);
    await mobile.locator('.document-toggle').tap();
    await mobile.locator('#starlight__sidebar').getByRole('link', { name: '전체 흐름', exact: true }).tap();
    await mobile.waitForURL('**' + base + 'workflow/overview/');
    await mobile.reload({ waitUntil: 'networkidle' });
    assert.equal(await mobile.locator('.document-toggle').getAttribute('aria-expanded'), 'true');
    await mobile.locator('h1').tap();
    assert.equal(await mobile.locator('.document-toggle').getAttribute('aria-expanded'), 'true');
    await mobile.locator('.drawer-close').tap();
    await mobile.locator('.document-drawer').waitFor({ state: 'hidden' });
  } finally { await touch.close(); }

  await page.goto(origin + base, { waitUntil: 'networkidle' });
  const mascot = page.locator('.workshop-mascot img');
  const asset = await mascot.getAttribute('src');
  assert(new URL(asset, origin).pathname.startsWith(base));
  const response = await context.request.get(new URL(asset, origin).href);
  assert(response.ok() && response.headers()['content-type'].startsWith('image/webp'));
  assert((await response.body()).length < 50000);
  assert.deepEqual(await mascot.evaluate(async img => {
    await img.decode(); const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
    return { width: img.naturalWidth, height: img.naturalHeight, alpha: ctx.getImageData(0, 0, 1, 1).data[3] };
  }), { width: 320, height: 320, alpha: 0 });
  assert.equal(await mascot.getAttribute('alt'), '');
  assert.equal(await page.locator('.workshop-mascot').getAttribute('aria-hidden'), 'true');
  assert.equal(await page.locator('.workshop-mascot').evaluate(el => getComputedStyle(el).animationIterationCount), '1');
  for (const theme of ['light', 'dark']) { await page.locator('#theme').selectOption(theme); await capture(page, 'mascot-home-' + theme); }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.workshop-mascot').evaluate(el => getComputedStyle(el).animationName), 'none');
  await toggle.click(); assert.equal(await panel.evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await page.keyboard.press('Escape'); await waitState(false);
  await page.locator('.reading-card').first().focus();
  assert.equal(await page.locator('.reading-card').first().evaluate(el => getComputedStyle(el).transform), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#theme').selectOption('light');
  await page.goto(origin + base, { waitUntil: 'networkidle' });
  console.log('PASS persistent document list: real navigation/reload/history/tab sync, explicit close/Escape, body clicks, storage exceptions, nonmodal mobile/touch, centered reading area, mascot and reduced motion');
}
