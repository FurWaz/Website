import { API } from "~/composables/API";
import ROUTES from "~/composables/ROUTES";

type TokensPair = {access: string, refresh: string};
export default class User {
    public static FromLocalStorage() {
        if (!import.meta.client) return null;
        
        const user = localStorage.getItem('user');
        if (user) {
            const json = JSON.parse(user);
            if (!json || !json._id || !json._pseudo || !json._email || !json._tokens)
                return null;
            return new User(json._id, json._pseudo, json._email, json._tokens);
        }
        return null;
    }

    public static async FromTokens(tokens: TokensPair) {
        const user = new User(-1, '', '', tokens);
        await user.fetchInformations();
        return user;
    }

    public static ToLocalStorage(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public static Forget() {
        localStorage.removeItem('user');
        this.CurrentUser = null;
        window.location.reload();
    }

    private static CurrentUser: User|null = null;

    public static get Current() {
        if (!this.CurrentUser) {
            this.CurrentUser = this.FromLocalStorage();
        }
        return this.CurrentUser;
    }

    public static set Current(user: User|null) {
        this.CurrentUser = user;
        this.ToLocalStorage(user);
    }

    public static get IsAuthenticated() {
        return this.Current !== null;
    }

    private _id: number;
    private _pseudo: string;
    private _email: string;
    private _tokens: TokensPair;

    constructor(id: number, pseudo: string, email: string, tokens: TokensPair) {
        this._id = id;
        this._pseudo = pseudo;
        this._email = email;
        this._tokens = tokens;
    }

    public async fetchInformations() {
        const res = await API.RequestLogged(ROUTES.USERS.ME.GET(), undefined, this);
        if (res.error) {
            console.log("Error while fetching user informations", res);
            return;
        }
        this.updateInformations(res.data);
    }

    public updateInformations(infos: any) {
        this._id = infos.id ? (parseInt(infos.id) ?? this.id) : this.id;
        this._pseudo = infos.pseudo ?? this.pseudo;
        this._email = infos.email ?? this.email;
        this._tokens = infos.tokens ? {
            access: infos.tokens.access ?? this._tokens.access,
            refresh: infos.tokens.refresh ?? this._tokens.refresh
        } : this._tokens;
    }

    public save() {
        User.Current = this;
        User.ToLocalStorage(this);
    }

    public get id() {
        return this._id;
    }

    public get pseudo() {
        return this._pseudo;
    }

    public get email() {
        return this._email;
    }

    public get tokens() {
        return this._tokens;
    }
};