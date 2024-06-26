export default {
    USERS: (...args: any[]) => "/users" + (args.length ? "/" + args.join("/") : ""),
    ME: (...args: any[]) => "/users/me" + (args.length ? "/" + args.join("/") : ""),
    TOKEN: (...args: any[]) => "/auth/token" + (args.length ? "/" + args.join("/") : ""),
    LOGIN: (...args: any[]) => "/auth/login" + (args.length ? "/" + args.join("/") : ""),
    PORTAL: (...args: any[]) => "/portal" + (args.length ? "/" + args.join("/") : ""),
    APPS: (...args: any[]) => "/apps" + (args.length ? "/" + args.join("/") : ""),
    PRODUCTS: (...args: any[]) => "/store/products" + (args.length ? "/" + args.join("/") : ""),
    BUY: (...args: any[]) => "/store/buy" + (args.length ? "/" + args.join("/") : ""),
    CHECKOUT: (...args: any[]) => "/store/checkout" + (args.length ? "/" + args.join("/") : ""),
    CARTS: (...args: any[]) => "/store/carts" + (args.length ? "/" + args.join("/") : ""),
    CARTPRODUCTS: (...args: any[]) => "/store/carts/products" + (args.length ? "/" + args.join("/") : ""),
    PROFILE: (...args: any[]) => "/users/me/profile" + (args.length ? "/" + args.join("/") : ""),
    RESET: {
        PASSWORD: (...args: any[]) => "/reset/password" + (args.length ? "/" + args.join("/") : ""),
    },
    VERIFY: {
        EMAIL: (...args: any[]) => "/verify/email" + (args.length ? "/" + args.join("/") : ""),
    },
    MY: {
        APPS: (...args: any[]) => "/apps/me" + (args.length ? "/" + args.join("/") : ""),
    }
};
