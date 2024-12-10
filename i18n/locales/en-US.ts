export default defineI18nLocale(async (locale) => {
    return {
        error: {
            title: 'Error {code} !',
            404: 'Page not found',
            500: 'Internal server error',
            unknown: 'Unknown error'
        },
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
        account: (await import('./en-US/account')).default,
        portal: (await import('./en-US/portal')).default,
    };
});