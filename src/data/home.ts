import en from './home-en.json';
import ko from './home-ko.json';
import type { Language } from './languages';
export const homeContent: Record<Language, typeof en> = { en, ko };
