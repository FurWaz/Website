import API from "./API";

class User {
    static ROLE = {
        UNKNOWN: 0,
        ADMIN: 1,
        USER: 2,
        GUEST: 3
    }

    static RoleString(role) {
        switch (role) {
            case User.ROLE.ADMIN: return "ADMIN";
            case User.ROLE.USER: return "USER";
            case User.ROLE.GUEST: return "GUEST";
            default: return "UNKNOWN";
        }
    }

    /** @type {User} */
    static #currentUser = null;
    static get CurrentUser() {
        return User.#currentUser || User.fromLocalStorage();
    }

    static fromLocalStorage() {
        const data = localStorage.getItem("user");
        if (!data) return null;
        return new User(JSON.parse(data));
    }

    static forget() {
        localStorage.removeItem("user");
        User.#currentUser = null;
    }

    username = "";
    email = "";
    icon = "";
    token = "";
    refresh = "";
    id = 0;
    role = User.ROLE.UNKNOWN;

    constructor(infos) {
        this.setInformations(infos, false);
        User.#currentUser = this;
    }

    setInformations(infos, updateOnDB=true) {
        return new Promise((resolve, reject) => {
            const props = ["username", "email", "token", "refresh", "icon", "id", "role"];
            let changes = {};
            let hasChanges = false;
            for (const prop of props) {
                if (infos[prop] && (this[prop] != infos[prop])) {
                    changes[prop] = infos[prop];
                    hasChanges = true;
                    console.log("adding change: " + prop + " = " + infos[prop])
                }
            }

            const applyChanges = () => {
                for (const prop in changes) {
                    if (changes[prop]) {
                        this[prop] = changes[prop];
                    }
                }
            }

            if (!hasChanges) return;
            if (updateOnDB) {
                this.makeRequest(API.ROUTE.ME, API.METHOD.PUT, changes).then(() => {
                    applyChanges();
                    resolve();
                }).catch(err => reject(err));
            }
            else {
                applyChanges();
                resolve();
            }
        });
    }

    getCredentials() {
        if (this.token.trim() != "")
            return API.Credentials.fromToken(this.token);
        return API.Credentials.fromCredentials(this.username, this.password);
    }

    makeRequest(path, method=undefined, body=undefined, type=undefined, headers=undefined) {
        return new Promise((resolve, reject) => {
            const credentials = this.getCredentials();
            if (!credentials.isValid()) {
                reject("Invalid user credentials");
                return;
            }

            const req = (creds) => API.execute_logged(path, method, creds, body, type, headers);
            req(credentials).then(data => {
                resolve(data);
            }).catch(err => {
                if (err.status == 498) { // invalid or expired token (refresh it)
                    this.fetchToken().then((token) => {
                        req(API.Credentials.fromToken(token)).then(data => {
                            resolve(data);
                        }).catch(err => {
                            reject(err);
                        });
                    }).catch(err => {
                        reject(err);
                        User.forget();
                        window.location.href = window.location.href;
                    });
                }
            });
        });
    }

    fetchToken(password="") {
        return new Promise((resolve, reject) => {
            const useRefresh = this.refresh.trim() != "";
            if ( (this.username.trim() === "" || password.trim() === "") && !useRefresh) {
                reject("Invalid user credentials");
                return;
            }

            const data = useRefresh? {refresh: this.refresh}: {username: this.username, password: password};
            API.execute(API.ROUTE.LOGIN, API.METHOD.POST, data).then(tokens => {
                if (tokens.refresh) this.refresh = tokens.refresh;
                this.token = tokens.token;
                this.save();
                resolve(tokens.token);
            }).finally(() => {
                
            }).catch(err => {
                switch (err.status) {
                    case 404:
                        reject("Invalid username");
                        break;
                    case 403:
                        reject("Invalid password");
                        break;
                    default:
                        reject("A problem occured");
                        break;
                }
            });
        });
    }

    fetchInformations() {
        return new Promise((resolve, reject) => {
            const credentials = this.getCredentials();
            if (!credentials.isValid()) {
                reject("Invalid user credentials");
                return;
            }

            this.makeRequest(API.ROUTE.ME).then(data => {
                this.setInformations(data, false);
                this.save();
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    delete() {
        return new Promise((resolve, reject) => {
            this.makeRequest(API.ROUTE.ME, API.METHOD.DELETE).then(() => {
                User.forget();
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }

    save() {
        localStorage.setItem("user", JSON.stringify(this));
        User.#currentUser = this;
    }
}

window.User = User; // for debug
export default User;