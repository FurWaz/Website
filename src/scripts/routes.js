export default {
    USERS: (...args) => "/users" + (args.length ? "/" + args.join("/") : ""),
    ME: (...args) => "/users/me" + (args.length ? "/" + args.join("/") : ""),
    TOKEN: (...args) => "/auth/token" + (args.length ? "/" + args.join("/") : ""),
    LOGIN: (...args) => "/auth/login" + (args.length ? "/" + args.join("/") : ""),
    PORTAL: (...args) => "/portal" + (args.length > 1 ? `/${args[0]}?token=${args[1]}` : `/${args[0]}`),
    APPS: (...args) => "/apps" + (args.length ? "/" + args.join("/") : ""),
    RESET: {
        PASSWORD: (...args) => "/reset/password" + (args.length ? "/" + args.join("/") : ""),
    },
    VERIFY: {
        EMAIL: (...args) => "/verify/email" + (args.length ? "/" + args.join("/") : ""),
    },
    MY: {
        APPS: (...args) => "/apps/me" + (args.length ? "/" + args.join("/") : ""),
    }
};