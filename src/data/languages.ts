/** The only registry of supported languages. Root English keeps shared URLs working. */
export const languages = [
  { code: 'en', path: '', label: 'English' },
  { code: 'ko', path: 'ko', label: '한국어' },
] as const;
export type Language = typeof languages[number]['code'];
export const defaultLanguage: Language = 'en';
export const languageStorageKey = 'wf-language';
export const starlightLocales = Object.fromEntries(languages.map(({ code, path, label }) => [path || 'root', { lang: code, label }]));
export function language(code?: string | null) {
  return languages.find(item => item.code === code) ?? languages[0];
}
export function languageFromPath(pathname: string, base: string) {
  const segment = pathname.slice(base.length).split('/')[0];
  return languages.find(item => item.path && item.path === segment) ?? languages[0];
}
export function languageHref(code: string, path: string, base: string) {
  const prefix = language(code).path;
  return base + (prefix ? prefix + '/' : '') + path.replace(/^\//, '');
}
export function equivalentPath(pathname: string, code: string, base: string) {
  const current = languageFromPath(pathname, base);
  const path = pathname.slice(base.length + (current.path ? current.path.length + 1 : 0));
  return languageHref(code, path, base);
}
