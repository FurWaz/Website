export default defineI18nLocale(async (locale) => {
    return {
        language: {
            fr: 'French',
            en: 'English'
        },
        theme: {
            auto: 'Auto',
            light: 'Light',
            dark: 'Dark'
        },
        verb: (await import('./en-US/verbs')).default,
        login: (await import('./en-US/login')).default,
        home: (await import('./en-US/home')).default,
        projects: (await import('./en-US/projects')).default,
        about: (await import('./en-US/about')).default,
        account: (await import('./en-US/account')).default
    };
});