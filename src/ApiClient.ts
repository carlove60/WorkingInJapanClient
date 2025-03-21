import {ApiClient, createApiClient} from "../generated-client/apiClient.ts";
import { AuthMiddleware } from "./Middleware/AuthMiddleware.ts";
import {AuthenticationProvider, RequestInformation} from "@microsoft/kiota-abstractions";
import {FetchRequestAdapter, HttpClient} from "@microsoft/kiota-http-fetchlibrary";

class SimpleAuthenticationProvider
    implements AuthenticationProvider {
    public async getAuthorizationToken(): Promise<string | undefined> {
        return localStorage.getItem("token") ?? undefined;
    }

    authenticateRequest(request: RequestInformation, additionalAuthenticationContext: Record<string, unknown> | undefined): Promise<void> {
        if (request && additionalAuthenticationContext) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(undefined);
    }
}

class Client {

    private static _instance: ApiClient;

    static get instance(): ApiClient {
        if (this._instance === undefined) {
            const httpClient = new HttpClient(undefined, new AuthMiddleware());


            const adapter = new FetchRequestAdapter(new SimpleAuthenticationProvider(), undefined, undefined, httpClient);
            this._instance = createApiClient(adapter);
        }
        return this._instance;
    }
}

export default Client;