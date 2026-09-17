import test from 'node:test';
import assert from 'node:assert/strict';
import { pagesLocation } from './pages-location.mjs';

test('project Pages keeps its repository subpath', () => {
  assert.deepEqual(pagesLocation({ GITHUB_REPOSITORY: 'sample-owner/ai-workflow' }), {
    site: 'https://sample-owner.github.io', base: '/ai-workflow/',
  });
});
test('account Pages uses the root, regardless of casing', () => {
  assert.deepEqual(pagesLocation({ GITHUB_REPOSITORY: 'Sample/Sample.github.io' }), {
    site: 'https://sample.github.io', base: '/',
  });
});
test('confirmed Pages URL takes precedence over repository-derived defaults', () => {
  assert.deepEqual(pagesLocation({ PAGES_URL: 'https://docs.example.org/notes', GITHUB_REPOSITORY: 'sample/other' }), {
    site: 'https://docs.example.org', base: '/notes/',
  });
});
test('unknown target is an error, never a fabricated public URL', () => {
  assert.throws(() => pagesLocation({}), /PAGES_URL|GITHUB_REPOSITORY/);
});
test('rejects malformed repository metadata', () => {
  for (const value of ['owner', '/repo', 'owner/../repo', 'owner/repo/extra']) {
    assert.throws(() => pagesLocation({ GITHUB_REPOSITORY: value }), /repository/i);
  }
});
test('rejects credentials, query strings, fragments and non-HTTPS URLs', () => {
  for (const value of ['http://example.org', 'https://user:pass@example.org', 'https://example.org/?x=1', 'https://example.org/#x']) {
    assert.throws(() => pagesLocation({ PAGES_URL: value }), /PAGES_URL/);
  }
});
test('enterprise host requires a confirmed Pages URL', () => {
  assert.throws(() => pagesLocation({ GITHUB_SERVER_URL: 'https://git.example.org', GITHUB_REPOSITORY: 'team/docs' }), /PAGES_URL/);
});
