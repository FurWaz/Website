import API from "./API";

class User {
    static forget() {
        localStorage.removeItem("user");
        this.#currentUser = null;
    }

    static ROLES = {
        ADMIN: 1,
        USER: 2,
        GUEST: 3
    };

    /**@type {User} */
    static #currentUser = null;

    static getCurrentUser() {
        return User.#currentUser ?? User.fromLocalStorage();
    }

    static fromLocalStorage() {
        const user = localStorage.getItem("user");
        if (user) {
            return new User(JSON.parse(user));
        }
        return null;
    }

    id = 0;
    username = "";
    password = "";
    email = "";
    password = "";
    role = User.ROLES.GUEST;

    constructor(infos) {
        this.saveInformations(infos);
    }

    saveInformations(infos) {
        if (!infos) return;
        this.id = infos.id ?? this.id;
        this.username = infos.username ?? this.username;
        this.password = infos.password ?? this.password;
        this.email = infos.email ?? this.email;
        this.token = infos.token ?? this.token;
        this.role = infos.role ?? this.role;
        this.save();
    }

    getCredentials() {
        if (this.token != "" && this.token != null) {
            return {token: this.token}
        } else {
            return {username: this.username, password: this.password}
        }
    }

    fetchInformations() {
        return new Promise((resolve, reject) => {
            API.execute_logged(API.ROUTE.ME, API.METHOD_GET, this.getCredentials()).then(infos => {
                this.saveInformations(infos);
                resolve(this);
            }).catch(reject);
        });
    }

    save() {
        localStorage.setItem("user", JSON.stringify(this));
    }
}

export default User;