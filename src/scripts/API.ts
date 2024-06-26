import Lang from './Lang';
import User from './User';
import ROUTES from './routes';

class Credentials {
    static get TYPE() {
        return {
            UNKNOWN: 0,
            TOKEN: 1,
            CREDENTIALS: 2
        };
    }

    static fromToken(token: any) {
        return new Credentials({token: token, type: Credentials.TYPE.TOKEN});
    }

    static fromCredentials(username: string, password: string) {
        return new Credentials({username: username, password: password, type: Credentials.TYPE.CREDENTIALS});
    }

    token = "";
    username = "";
    password = "";
    type = Credentials.TYPE.UNKNOWN;

    constructor(infos: any) {
        this.token = infos.token ?? this.token;
        this.username = infos.username ?? this.username;
        this.password = infos.password ?? this.password;
        this.type = infos.type ?? this.type;
    }

    isValid() {
        return this.type != Credentials.TYPE.UNKNOWN;
    }

    getToken() {
        return this.token;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }
}

class Pagination {
    _offset = 0;
    _limit = 10;
    _total = 0;
    _onChanged: Function|null = null;

    constructor (offset = 0, limit = 10) {
        this._offset = 0;
        this._limit = 10;
        this._total = 0;

        this.offset = offset;
        this.limit = limit;

        this._onChanged = null;
    }

    set offset(offset) {
        this._offset = offset ?? 0;
        this._onChanged?.();
    }

    set limit(limit) {
        this._limit = limit ?? 10;
        this._onChanged?.();
    }

    set total(total) {
        this._total = total;
    }

    set index(index) {
        this.offset = index * this._limit;
    }

    next() {
        this._offset += this._limit;
        if (this._offset > this.maxIndex * this.limit) this._offset = this.maxIndex * this.limit;
        this._onChanged?.();
    }

    previous() {
        this._offset -= this._limit;
        if (this._offset < 0) this._offset = 0;
        this._onChanged?.();
    }

    get hasPrevious() {
        return this.index > 0;
    }

    get hasNext() {
        return this.index < this.maxIndex;
    }

    get index() {
        return this._offset / this._limit;
    }

    get total() {
        return this._total;
    }

    get maxIndex() {
        return Math.ceil(this._total / this._limit) - 1;
    }

    get offset() {
        return this._offset;
    }

    get limit() {
        return this._limit;
    }

    onChanged(callback: Function) {
        this._onChanged = callback;
    }

    toString() {
        return API.createParameters({offset: this.offset, limit: this.limit});
    }
}

class API {
    static Credentials = Credentials;

    // API constants
    static API_URL = import.meta.env.VITE_MAIN_API_URL;
    static get METHOD() {
        return {
            GET: "GET",
            PUT: "PUT",
            POST: "POST",
            PATCH: "PATCH",
            DELETE: "DELETE"
        };
    }
    static get TYPE() {
        return {
            FORM: "application/x-www-form-urlencoded",
            JSON: "application/json",
            FILE: "multipart/form-data",
            NONE: undefined
        }
    }

    static get ERROR() {
        return {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAYEMENT_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            NOT_ACCEPTABLE: 406,
            CONFLICT: 409,
            EXPECTATION_FAILED: 417,
            TEAPOT: 418,
            ENHANCE_YOUR_CALM: 420,
            TOO_MANY_REQUESTS: 429,
            TOKEN_EXPIRED: 498,
            INTERNAL_SERVER_ERROR: 500,
            NOT_IMPLEMENTED: 501
        }
    }

    static get AuthorizationHeader() { return "Authorization"; };

    static setURL(url: string) {
        if (!url) return;
        if (url.endsWith("/")) url = url.substring(0, url.length - 1);
        API.API_URL = url;
    }

    // API routes
    static ROUTE = ROUTES;

    /**
     * Makes an API call with the specified parameters
     * @param {string} path API call url path (see API.ROUTES for possible routes)
     * @param {string} method API call method (see API.METHOD for possible values)
     * @param {object|string} body API call body (data to send, ignored if METHOD.GET is used)
     * @param {string} type API call data type (see API.TYPE for possible values))  
     * @param {any[]} headers API call additional headers
     * @returns a promise resolving when the API call is done
     */
    static execute(path: string, method = this.METHOD.GET, body = {}, type = this.TYPE.JSON, headers: any = {}) {
        return new Promise((resolve, reject) => {
            if (API.API_URL == null) reject("Error : API host not set");
            path = path.replace("/?", "?").replace(/\/\//g, "/");
            const urlparts = path.split("?");
            const base = urlparts.splice(0, 1);
            const params = (urlparts.length > 0)? ("?" + urlparts.join("&")) : "";
            path = base + params;

            const reqHeaders: any = {
                "Accept": "application/json",
                "Accept-Language": Lang.getLanguage()
            };
            if (type != this.TYPE.NONE && type != this.TYPE.FILE) reqHeaders["Content-Type"] = type;

            if (headers)
                for (const key in headers)
                    reqHeaders[key] = headers[key];

            let reqBody: any = type == this.TYPE.FORM ? "" : {};
            if (body && type != this.TYPE.FILE) {
                switch (typeof (body)) {
                case "string":
                    if (body.startsWith("{") && body.endsWith("}"))
                        body = JSON.parse(body);
                // eslint-disable-next-line no-fallthrough
                case "object":
                    if (type == this.TYPE.FORM)
                        reqBody = new URLSearchParams(body).toString();
                    else reqBody = JSON.stringify(body);
                    break;
                default: break;
                }
            }

            if (type == this.TYPE.FILE) { // create a form data from the body
                reqBody = new FormData();
                reqBody.append("model", body);
            }

            const sendError = (err: any) => {
                if (err.json) {
                    err.json().then((data: any) => {
                        reject({
                            status: err.status,
                            error: data.error ?? 'Unknown error',
                            field: data.field,
                        });
                    }).catch((err: any) => reject(err));
                } else {
                    reject(err);
                }
            };

            fetch(API.API_URL + path, {
                credentials: "omit",
                method: method,
                body: method == this.METHOD.GET ? undefined : reqBody,
                headers: reqHeaders,
                referrer: window.location.origin,
                mode: "cors"
            }).then(response => {
                if (!response.status.toString().startsWith("2")) {
                    sendError(response);
                } else {
                    response.json().then(data => {
                        resolve(data);
                    }).catch(err => sendError(err));
                }
            }).catch(err => sendError(err));
        });
    }

    /**
     * Makes a logged API call with the specified parameters, using the specified credentials (token + token type / username + password)
     * @param {string} path API call url path (see API.ROUTES for possible routes)
     * @param {string} method API call method (see API.METHOD for possible values)
     * @param {Credentials} credentials API call credentials to use (use User.currentUser.getCredentials() to get the current user's credentials)
     * @param {object|string} body API call body (data to send, ignored if METHOD.GET is used)
     * @param {string} type API call data type (see API.TYPE for possible values))
     * @param {any[]} headers API call additionnal headers
     * @returns A promise resolving when the API call is done
     */
    static execute_logged(path: string, method = API.METHOD.GET, body = {}, type = this.TYPE.JSON, headers: any = {}, user = User.CurrentUser, retryLogin = true) {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject({status: -1, message: "Please log in to access this resource"});
                return;
            }

            const credentials = user.getCredentials();
            if (!credentials) {
                reject({status: -1, message: "Please provide credentials (token/type or username/password)"});
                return;
            }
            const token_mode = (credentials.token != undefined)
            const login_mode = (credentials.password != undefined && credentials.username != undefined)

            if (!login_mode && !token_mode) {
                reject({status: -1, message: "Error: Invalid credentials"});
                return;
            }

            const reqHeaders: any = {};
            if (headers)
                for (const key in headers)
                    reqHeaders[key] = headers[key];

            if (token_mode) {
                reqHeaders[API.AuthorizationHeader] = credentials.token;
                this.execute(path, method, body, type, reqHeaders).then(resolve).catch(err => {
                    if (err.status === 498 || err.status === 406) { // token expired
                        if (!retryLogin) reject({status: 400, message: "Invalid credentials"});
                        API.execute(API.ROUTE.TOKEN(), API.METHOD.GET, undefined, undefined, { [API.AuthorizationHeader]: "Bearer " + user.refresh}).then((response: any) => {
                            user.setTokens(response.data.tokens);
                            user.save();
                            this.execute_logged(path, method, body, type, reqHeaders, user, false).then(resolve).catch(reject);
                        }).catch(err => {
                            User.forget();
                            const url = window.location.href;
                            window.location.href = '/login?link=' + url;
                        });
                    } else {
                        reject(err);
                    }
                });
            } else {
                if (!retryLogin) reject({status: 400, message: "Invalid credentials"});
                this.execute(API.ROUTE.TOKEN(), this.METHOD.GET, undefined, undefined, {[API.AuthorizationHeader]: "Bearer " + user.refresh}).then((data: any) => {
                    user.setTokens(data.tokens);
                    this.execute_logged(path, method, body, type, reqHeaders, user, false).then(resolve).catch(reject);
                }).catch(err => reject(err));
            }
        });
    }

    /**
     * Creates API parameters from an object
     * @param {object} params key-value pairs of parameters to add to the url
     * @returns string corresponding to the query parameters part of the url
     */
    static createParameters(params: any) {
        switch (typeof (params)) {
        case "string":
            if (params.startsWith("?")) return params;
            if (params.startsWith("{") && params.endsWith("}"))
                params = JSON.parse(params);
        // eslint-disable-next-line no-fallthrough
        case "object":
            return "?" + new URLSearchParams(params).toString();
        default:
            console.error("API Error: Error while creating parameters with argument: ", params);
            return "";
        }
    }

    /**
     * Creates pagination parameters from a page index and page number of elements
     * @param {number} offset number of elements to skip
     * @param {number} limit number of elements in one page
     * @returns a string corresponding to the pagination's parameters part of the url
     */
    static createPagination(offset = 0, limit = 10) {
        return new Pagination(offset, limit);
    }
}

export default API;