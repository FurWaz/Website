export default class CachedRessource<T> {
    /** Default ressource cache timeout in s */
    static DEFAULT_CACHE_TIMEOUT = 60;

    private fetcher: (id:number)=>Promise<T|null>;
    private ressource: T|null;
    private timestamp: number;
    private listeners: ((ressource: T)=>any)[];
    private fetching: boolean;
    private timeout: number;
    private id: number;

    /**
     * Default CachedRessource constructor
     * @param {function} fetcher Function to call to fetch the ressource
     * @param {number} timeout Time in s before the cache is invalidated (-1 = never, default = 60)
     */
    constructor(id: number, fetcher: (id:number)=>Promise<T|null>, timeout=CachedRessource.DEFAULT_CACHE_TIMEOUT) {
        this.fetcher = fetcher;
        this.ressource = null;
        this.timeout = timeout;
        this.timestamp = 0;
        this.listeners = [];
        this.fetching = false;
        this.id = id;
    }

    async get(): Promise<T|null> {
        if (this.fetching) {
            const promise = new Promise<T>((resolve) => {
                this.listeners.push(resolve);
            });
            return await promise;
        }

        // If ressource expired or never fetched
        if ((this.isExpired() && !this.fetching) || !this.ressource) {
            this.fetching = true;
            this.ressource = await this.fetcher(this.id);
            // resolve every other pending request
            this.listeners.forEach(l => l(this.ressource as T));
            this.fetching = false;
            this.listeners = [];
            this.timestamp = Date.now();
        }

        return this.ressource;
    }

    isExpired() {
        if (this.timeout < 0) return false;
        return (Date.now() - this.timestamp) / 1000 > this.timeout;
    }

    invalidate() {
        this.ressource = null;
    }
}
