import i18n from 'sveltekit-i18n';
import lang from './lang.json';

import dayjs from "dayjs";
import "dayjs/locale/de";

dayjs.locale("de");

export const config = {
  fallbackLocale: 'de',
  translations: {
    de: { lang }
  },
  loaders: [
    {
      locale: 'de',
      key: 'core',
      loader: async () => (await import('./de/core.json')).default,
    },
    {
      locale: 'de',
      key: 'quiz',
      loader: async () => (await import('./de/quiz.json')).default,
    },
    {
      locale: 'de',
      key: 'editor',
      loader: async () => (await import('./de/editor.json')).default,
    },
    {
      locale: 'de',
      key: 'mail',
      loader: async () => (await import('./de/apps_mail.json')).default,
    },
    {
      locale: 'de',
      key: 'browser',
      loader: async () => (await import('./de/apps_browser.json')).default,
    },
    {
      locale: 'de',
      key: 'phishing',
      loader: async () => (await import('./de/simulation_phishing.json')).default,
    },
    {
      locale: 'de',
      key: 'lenv',
      loader: async () => (await import('./de/learningenvironment.json')).default,
    },
    {
      locale: 'de',
      key: 'lunit',
      loader: async () => (await import('./de/apps_learningunit.json')).default,
    },

  ],
};
export const defaultLocale = 'de';

export const { t, locale, locales, loading, addTranslations, loadTranslations, translations, setRoute, setLocale } = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...');

    await loading.toPromise();
    console.log('Updated translations');
  }
});