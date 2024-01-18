import CachedRessource from "./CachedRessource";
import API from "./API";

export default class Ressources {
    static #USER_FETCHER = id => async () => {
        return (await API.execute_logged(API.ROUTE.USERS(id))).data;
    };
    static #PRODUCT_FETCHER = id => async () => {
        return (await API.execute_logged(API.ROUTE.PRODUCTS(id))).data;
    };
    static #APP_FETCHER = id => async () => {
        return (await API.execute_logged(API.ROUTE.APPS(id))).data;
    };

    static #users = {};
    static #products = {};
    static #apps = {};

    /**
     * Returns the ressource corresponding to the given id in the given cache.
     * If the ressource is not in the cache, it will be fetched from the server,
     * and added to the cache.
     * @param {string} id Ressource id
     * @param {object} cache Cache object to search in
     * @param {function} fetcher Function to call to fetch the ressource
     * @param {boolean} forceFetch Force a new fetching of the ressource
     * @returns {CachedRessource} The ressource
     */
    static async #getRessource(id, cache, fetcher, forceFetch) {
        if (!cache[id]) {
            cache[id] = new CachedRessource(fetcher);
        } else if (forceFetch) {
            cache[id].invalidate();
        }
        return await cache[id].get();
    }

    static async getUser(id, forceFetch=false) {
        return await Ressources.#getRessource(id, Ressources.#users, Ressources.#USER_FETCHER(id), forceFetch);
    }
    
    static async getProduct(id, forceFetch=false) {
        return await Ressources.#getRessource(id, Ressources.#products, Ressources.#PRODUCT_FETCHER(id), forceFetch);
    }

    static async getApp(id, forceFetch=false) {
        return await Ressources.#getRessource(id, Ressources.#apps, Ressources.#APP_FETCHER(id), forceFetch);
    }
}
