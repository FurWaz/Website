export default {
    USERS: (...args) => "/users" + (args.length ? "/" + args.join("/") : ""),
    ME: (...args) => "/users/me" + (args.length ? "/" + args.join("/") : ""),
    TOKEN: (...args) => "/auth/token" + (args.length ? "/" + args.join("/") : ""),
    LOGIN: (...args) => "/auth/login" + (args.length ? "/" + args.join("/") : ""),
    PORTAL: (...args) => "/portal" + (args.length ? "/" + args.join("/") : ""),
    APPS: (...args) => "/apps" + (args.length ? "/" + args.join("/") : ""),
    PRODUCTS: (...args) => "/store/products" + (args.length ? "/" + args.join("/") : ""),
    BUY: (...args) => "/store/buy" + (args.length ? "/" + args.join("/") : ""),
    CHECKOUT: (...args) => "/store/checkout" + (args.length ? "/" + args.join("/") : ""),
    CARTS: (...args) => "/store/carts" + (args.length ? "/" + args.join("/") : ""),
    CARTPRODUCTS: (...args) => "/store/carts/products" + (args.length ? "/" + args.join("/") : ""),
    PROFILE: (...args) => "/users/me/profile" + (args.length ? "/" + args.join("/") : ""),
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
