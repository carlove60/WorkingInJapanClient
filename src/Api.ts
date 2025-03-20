import {Client} from "./ClientApi.ts";


/**
 * The Singleton class defines an `instance` getter, that lets clients access
 * the unique singleton instance.
 */
class Api {
    static #instance: Client;


    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
    }

    /**
     * The static getter that controls access to the singleton instance.
     *
     * This implementation allows you to extend the Singleton class while
     * keeping just one instance of each subclass around.
     */
    public static get instance(): Client {
        if (!Api.#instance) {
            Api.#instance = new Client();
        }

        return Api.#instance;
    }
}



export default Api;

