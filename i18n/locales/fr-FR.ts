export default defineI18nLocale(async (locale) => {
    return {
        error: {
            title: 'Erreur {code} !',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            unknown: 'Erreur inconnue'
        },
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
        account: (await import('./fr-FR/account')).default,
        portal: (await import('./fr-FR/portal')).default,
    };
});