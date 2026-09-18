import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { languages, languageHref, languageStorageKey } from '../src/data/languages.ts';

export async function checkI18n(browser, origin, base, capture = async () => {}) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, locale: 'ko-KR' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('missing-page')) errors.push(r.status() + ' ' + r.url()); });
  const go = path => page.goto(origin + path, { waitUntil: 'networkidle' });
  const lang = () => page.locator('html').getAttribute('lang');
  const pick = async (code, path = '') => {
    const target = languageHref(code, path, base);
    await page.locator('.language-control select').selectOption(target);
    await page.waitForURL(origin + target);
    await page.waitForLoadState('networkidle');
    assert.equal(await lang(), code);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), languageStorageKey), code);
  };
  try {
    await go(base);
    assert.equal(await lang(), 'en', 'First visit must use English even with a Korean browser locale');
    await page.locator('#theme').selectOption('dark');
    await page.locator('.document-toggle').click();
    await pick('ko');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    assert.equal(await page.locator('.document-toggle').getAttribute('aria-expanded'), 'true');
    await page.reload({ waitUntil: 'networkidle' }); assert.equal(await lang(), 'ko');
    await go(base); assert.equal(await lang(), 'ko', 'Representative home must restore manual choice');
    await page.locator('.primary-link').click(); await page.waitForLoadState('networkidle');
    assert.equal(new URL(page.url()).pathname, base + 'ko/workflow/overview/');
    await pick('en', 'workflow/overview/');
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    assert.equal(await page.locator('.document-toggle').getAttribute('aria-expanded'), 'true');
    await pick('ko', 'workflow/overview/');
    await go(base + 'workflow/overview/');
    assert.equal(await lang(), 'en', 'An explicit English document must win over a Korean preference');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), languageStorageKey), 'ko', 'Opening a shared URL must not rewrite a manual preference');
    await go(base + 'ko/workflow/verification/'); assert.equal(await lang(), 'ko');
    await page.goBack({ waitUntil: 'networkidle' }); assert.equal(await lang(), 'en');
    assert.equal(await page.locator('.language-control select').inputValue(), base + 'workflow/overview/');
    await page.goForward({ waitUntil: 'networkidle' }); assert.equal(await lang(), 'ko');
    await page.locator('.workshop-brand').click(); await page.waitForLoadState('networkidle');
    assert.equal(new URL(page.url()).pathname, base + 'ko/');
    await pick('en');
    await go(base); assert.equal(await lang(), 'en');
    // A newly opened tab reuses the same browser preference.
    await pick('ko');
    const newTab = await context.newPage();
    await newTab.goto(origin + base, { waitUntil: 'networkidle' });
    assert.equal(await newTab.locator('html').getAttribute('lang'), 'ko');
    await newTab.close();

    const docs = ['workflow/why-this-site/','workflow/overview/','workflow/goals-and-scope/','workflow/autonomy/','workflow/phase-and-resume/','workflow/verification/','experiments/agentdeck/','design/decisions/'];
    for (const item of languages) {
      const home = languageHref(item.code, '', base);
      await go(home);
      if (item.code === 'en') { await go(base + 'workflow/overview/'); await pick('en','workflow/overview/'); await go(home); }
      await page.locator('#theme').selectOption('light');
      if (await page.locator('.document-toggle').getAttribute('aria-expanded') === 'true') await page.locator('.document-toggle').click();
      const content = JSON.parse(readFileSync(new URL('../src/data/home-' + item.code + '.json', import.meta.url), 'utf8'));
      for (const [key, scenario] of Object.entries(content.scenarios)) {
        const button = page.locator('[data-scenario=' + key + ']');
        await button.focus(); await page.keyboard.press('Enter');
        for (const field of ['status','title','reason','next']) assert.equal(await page.locator('#scenario-' + field).textContent(), scenario[field]);
      }
      await capture(page, 'i18n-home-' + item.code);
      for (const route of docs) {
        await go(languageHref(item.code, route, base));
        assert.equal(await lang(), item.code);
        const canonical = await page.locator('link[rel=canonical]').getAttribute('href');
        assert.equal(new URL(canonical).pathname, languageHref(item.code, route, base));
        for (const other of languages) {
          const alternate = await page.locator('link[rel=alternate][hreflang=' + other.code + ']').getAttribute('href');
          assert.equal(new URL(alternate).pathname, languageHref(other.code, route, base));
          assert.equal(await page.locator('.language-control option').filter({ hasText: other.label }).getAttribute('value'), languageHref(other.code, route, base));
        }
        const body = await page.locator('.sl-markdown-content').innerText();
        if (item.code === 'en') assert(!/[가-힣]/.test(body), 'Korean body incorrectly presented as English: ' + route);
        assert(!await page.locator('.sl-markdown-content .starlight-aside').filter({hasText:'not available in your language'}).count(), 'All published pages must be translated');
      }
      await go(languageHref(item.code,'workflow/overview/',base));
      await page.keyboard.press('Control+k');
      await page.locator('dialog input').fill(item.code === 'ko' ? '자율성' : 'autonomy');
      await page.locator('.pagefind-ui__result-link').first().waitFor();
      const hrefs=await page.locator('.pagefind-ui__result-link').evaluateAll(links=>links.map(link=>link.href));
      assert(hrefs.length > 0);
      for(const href of hrefs) {
        const path = new URL(href).pathname;
        assert(path.startsWith(home), 'Search result escaped the locale/base');
        if(item.code==='en')assert(!path.startsWith(base+'ko/'), 'English search returned Korean content');
      }
      await page.locator('.pagefind-ui__result-link').first().click(); await page.waitForLoadState('networkidle'); assert.equal(await lang(),item.code);
      for(const width of [320,390,768,950,1440]) {
        await page.setViewportSize({width,height:960});
        for(const route of ['', 'workflow/overview/']) {
          await go(languageHref(item.code,route,base));
          // Root landing obeys the manual choice; set it explicitly for this locale's checks.
          if(await lang()!==item.code)await pick(item.code);
          const layout=await page.evaluate(()=>{
            const header=document.querySelector('.home-header,.page > header.header');
            const boxes=[...header.querySelectorAll('a,button[data-open-modal],.document-toggle,select')].filter(e=>e.checkVisibility()).map(e=>e.getBoundingClientRect());
            return {overflow:document.documentElement.scrollWidth>innerWidth,offscreen:boxes.some(b=>b.left<0||b.right>innerWidth+1),small:boxes.some(b=>b.height<43||b.width<43),overlap:boxes.some((a,i)=>boxes.slice(i+1).some(b=>a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1))};
          });
          assert.deepEqual(layout,{overflow:false,offscreen:false,small:false,overlap:false},item.code+' '+width+' '+route);
          if(width===320)await capture(page,`i18n-${item.code}-${route?'doc':'home'}-320`);
        }
      }
      await go(languageHref(item.code, 'missing-page/',base));
      assert.equal(await lang(),item.code);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex');
      const errorPath=item.path?'404/':'404.html';
      for(const other of languages)assert(await page.locator('.language-control option[value="'+languageHref(other.code,other.path?'404/':'404.html',base)+'"]').count());
      if(item.code==='ko')assert.equal(new URL(page.url()).pathname,languageHref(item.code,errorPath,base));
    }
    assert.deepEqual(errors, []);
  } finally { await context.close(); }

  // Unsupported, damaged, and blocked storage cannot cause a loop or override English defaults.
  for(const saved of ['unsupported-language','{"broken":true}',null,'blocked']) {
    const isolated=await browser.newContext({locale:'ko-KR'});
    await isolated.addInitScript(({key,saved})=>{
      if(saved==='blocked') {
        const get=Storage.prototype.getItem,set=Storage.prototype.setItem;
        Storage.prototype.getItem=function(k){if(k===key)throw new DOMException('Blocked','SecurityError');return get.call(this,k)};
        Storage.prototype.setItem=function(k,v){if(k===key)throw new DOMException('Blocked','SecurityError');return set.call(this,k,v)};
      } else if(saved!==null)localStorage.setItem(key,saved);
    },{key:languageStorageKey,saved});
    try {
      const p=await isolated.newPage();const pageErrors=[];p.on('pageerror',e=>pageErrors.push(e.message));
      await p.goto(origin+base,{waitUntil:'networkidle'});
      assert.equal(await p.locator('html').getAttribute('lang'),'en');
      if(saved==='blocked') {
        await p.locator('.language-control select').selectOption(base+'ko/');
        await p.waitForURL(origin+base+'ko/');
        await p.reload({waitUntil:'networkidle'});assert.equal(await p.locator('html').getAttribute('lang'),'ko');
        await p.goto(origin+base,{waitUntil:'networkidle'});assert.equal(await p.locator('html').getAttribute('lang'),'en');
      }
      assert.deepEqual(pageErrors,[]);
    } finally { await isolated.close(); }
  }
  console.log('PASS i18n: English default, manual language persistence, explicit URL precedence, history/tabs/storage failures, both full translations/scenarios/search, 320–1440px controls, canonical/alternate and localized 404');
}
