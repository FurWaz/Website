import Ressources from '../Ressources';
import { API } from '../API';
import ROUTES from '../routes';
import User from "./User";

export default class App {
    private static ressources = new Ressources<App>(
        async (id: number) => {
            const res = await API.RequestTryLogged(ROUTES.APPS.GET(id));
            if (res.error) return null;
            return App.FromJSON(res.data);
        }
    );

    public static async FromId(id: number): Promise<App|null> {
        return await this.ressources.getRessource(id);
    }

    public static FromJSON(json: any): App {
        return new App(
            json.id,
            json.name,
            json.description,
            json.authorId,
            json.verified,
            json.key
        );
    }
    
    private onUpdateListeners: (()=>void)[];

    private callUpdate() {
        this.onUpdateListeners.forEach(listener => listener());
    }

    public id: number;
    public name: string;
    public description: string;
    public authorId: number;
    public author: User|undefined|null;
    public verified: boolean;
    public key: string;

    constructor(id: number, name: string, description: string, authorId: number, verified: boolean, key: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.verified = verified;
        this.key = key;
        this.authorId = authorId;
        this.author = undefined;
        this.onUpdateListeners = [];

        User.FromId(authorId)
            .then(user => { this.author = user; this.callUpdate(); })
            .catch(err => console.error(err));
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            authorId: this.authorId,
            author: this.author?.toJSON(),
            verified: this.verified,
            key: this.key
        };
    }

    public onUpdate(listener: ()=>void) {
        this.onUpdateListeners.push(listener);
    }
}
