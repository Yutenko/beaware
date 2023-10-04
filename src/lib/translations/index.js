import i18n from 'sveltekit-i18n';
import lang from './lang.json';

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