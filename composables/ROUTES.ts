import { METHOD, Route } from "~/composables/API";

export default {
    AUTH: {
        LOGIN: (email: string, password: string) => new Route(`auth/login`, METHOD.POST, undefined, {email, password}),
        // TOKEN route not here because handled by API class
    },
    USERS: {
        GET: (id: number|undefined = undefined) => new Route(`users${id?`/${id}`:''}`, METHOD.GET),
        CREATE: (pseudo: string, email: string, password: string) => new Route(`users`, METHOD.POST, undefined, {pseudo, email, password}),
        UPDATE: (id: number, pseudo: string, email: string) => new Route(`users/${id}`, METHOD.PATCH, undefined, {pseudo, email}),
        DELETE: (id: number) => new Route(`users/${id}`, METHOD.DELETE),
        ME: {
            GET: () => new Route(`users/me`, METHOD.GET),
            UPDATE: (pseudo: string, email: string) => new Route(`users/me`, METHOD.PATCH, undefined, {pseudo, email}),
            DELETE: (password: string) => new Route(`users/me`, METHOD.DELETE, undefined, {password}),
        }
    },
    APPS: {
        GET: (id: number|undefined = undefined) => new Route(`apps${id?`/${id}`:''}`, METHOD.GET),
        CREATE: (name: string, description: string) => new Route(`apps`, METHOD.POST, undefined, {name, description}),
        UPDATE: (id: number, name: string, description: string) => new Route(`apps/${id}`, METHOD.PATCH, undefined, {name, description}),
        DELETE: (id: number) => new Route(`apps/${id}`, METHOD.DELETE),
        ME: {
            GET: () => new Route(`apps/me`, METHOD.GET)
        }
    },
    PORTAL: {
        // GENERATE not here because shouldn't be used by client
        // USER.GET not here because shouldn't be used by client
        APP: {
            GET: (token: string) => new Route(`portal/${token}/app`, METHOD.GET)
        },
        CONNECT: (token: string) => new Route(`portal/${token}`, METHOD.POST)
    },
    PASSWORD: {
        SENDRESETMAIL: (email: string) => new Route(`reset/password`, METHOD.GET, {email}),
        RESET: (token: string, password: string) => new Route(`reset/password`, METHOD.POST, undefined, {token, password}),
    },
    VERIFY: {
        EMAIL: (token: string) => new Route(`verify/email`, METHOD.POST, undefined, {token})
    }
};