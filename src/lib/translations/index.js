import i18n from 'sveltekit-i18n';

const DE = "de";
const FR = "fr";

const config = ({
    fallbackLocale: DE,
    translations: {
      de: DE,
    },
    loaders: [
        {
            locale: DE,
            key: 'core',
            loader: async () => (
                await import('./de/core.json')
            ).default,
        },
    ],
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
loading.subscribe(($loading) => $loading && console.log('Loading translations for the main instance...'));