import CachedRessource from "./CachedRessource";

export default class RessourcesManager<T> {
    private cache: Map<number, CachedRessource<T>> = new Map();
    private fetcher: (id:number)=>Promise<T|null>;

    constructor(fetcher: (id:number)=>Promise<T|null>) {
        this.fetcher = fetcher;
    }

    public async getRessource(id: number, forceFetch: boolean = false): Promise<T|null> {
        if (!this.cache.has(id)) {
            this.cache.set(id, new CachedRessource(id, this.fetcher));
        } else if (forceFetch) {
            this.cache.get(id)?.invalidate();
        }
        return await this.cache.get(id)?.get() ?? null;
    }
}
