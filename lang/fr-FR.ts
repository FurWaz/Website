export default defineI18nLocale(async (locale) => {
    return {
        language: {
            fr: 'Français',
            en: 'Anglais'
        },
        theme: {
            auto: 'Auto',
            light: 'Clair',
            dark: 'Sombre'
        },
        verb: (await import('./fr-FR/verbs')).default,
        login: (await import('./fr-FR/login')).default,
        home: (await import('./fr-FR/home')).default,
        projects: (await import('./fr-FR/projects')).default,
        about: (await import('./fr-FR/about')).default,
        account: (await import('./fr-FR/account')).default
    };
});