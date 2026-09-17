export function pagesLocation(env = process.env) {
  if (env.PAGES_URL) {
    let url;
    try { url = new URL(env.PAGES_URL); } catch { throw new Error('PAGES_URL must be an absolute HTTPS URL.'); }
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
      throw new Error('PAGES_URL must use HTTPS without credentials, query strings or fragments.');
    }
    return { site: url.origin, base: url.pathname.replace(/\/+$/, '') + '/' };
  }
  if (env.GITHUB_SERVER_URL && env.GITHUB_SERVER_URL !== 'https://github.com') {
    throw new Error('Set PAGES_URL to the confirmed Pages URL for this GitHub host.');
  }
  const repository = env.GITHUB_REPOSITORY;
  if (!repository || !/^[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+$/.test(repository)) {
    throw new Error('Set PAGES_URL or a valid GITHUB_REPOSITORY (owner/repository).');
  }
  const [owner, name] = repository.split('/');
  const host = owner.toLowerCase() + '.github.io';
  return { site: 'https://' + host, base: name.toLowerCase() === host ? '/' : '/' + name + '/' };
}
