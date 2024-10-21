import Ressources from '../Ressources';
import { API } from '../API';
import ROUTES from '../routes';

export default class User {
    private static ressources = new Ressources<User>(
        async (id: number) => {
            const res = await API.RequestTryLogged(ROUTES.USERS.GET(id));
            if (res.error) return null;
            return User.FromJSON(res.data);
        }
    );

    public static async FromId(id: number): Promise<User|null> {
        return await this.ressources.getRessource(id);
    }

    public static FromJSON(json: any): User {
        return new User(
            json.id,
            json.pseudo,
            json.email
        );
    }

    private onUpdateListeners: (()=>void)[];

    private callUpdate() {
        this.onUpdateListeners.forEach(listener => listener());
    }

    public id: string;
    public pseudo: string;
    public email: string;
    public rolesId: number[] = [];
    public appsId: number[] = [];

    constructor(id: string, pseudo: string, email: string) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
        this.onUpdateListeners = [];
    }

    public toJSON() {
        return {
            id: this.id,
            pseudo: this.pseudo,
            email: this.email
        };
    }

    public onUpdate(listener: ()=>void) {
        this.onUpdateListeners.push(listener);
    }
}
