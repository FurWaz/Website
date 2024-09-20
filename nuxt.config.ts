// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
    ],
    i18n: {
        locales: [
            {
                code: 'fr',
                file: 'fr-FR.ts'
            },
            {
                code: 'en',
                file: 'en-US.ts'
            }
        ],
        lazy: false,
        langDir: 'lang/',
        defaultLocale: 'en',
        strategy: 'no_prefix',
    }
})