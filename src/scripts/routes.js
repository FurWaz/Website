export default {
    USERS: (...args) => "/users" + (args.length ? "/" + args.join("/") : ""),
    ME: (...args) => "/users/me" + (args.length ? "/" + args.join("/") : ""),
    TOKEN: (...args) => "/auth/token" + (args.length ? "/" + args.join("/") : ""),
    PORTAL: (...args) => "/portal" + (args.length ? "/" + args.join("/") : ""),
    APPS: (...args) => "/apps" + (args.length ? "/" + args.join("/") : ""),
    MY: {
        APPS: (...args) => "/apps/my" + (args.length ? "/" + args.join("/") : ""),
    }
};