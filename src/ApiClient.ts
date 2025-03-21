import {ApiClient, createApiClient} from "../generated-client/apiClient.ts";
import { AuthMiddleware } from "./Middleware/AuthMiddleware.ts";
import {AuthenticationProvider, RequestInformation} from "@microsoft/kiota-abstractions";
import {FetchRequestAdapter, HttpClient} from "@microsoft/kiota-http-fetchlibrary";
import {isNullOrUndefined} from "./Helpers/Guard.ts";

class SimpleAuthenticationProvider implements AuthenticationProvider {
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
        if (isNullOrUndefined(this._instance)) {
            const httpClient = new HttpClient(undefined, new AuthMiddleware());
            const adapter = new FetchRequestAdapter(new SimpleAuthenticationProvider(), undefined, undefined, httpClient);
            this._instance = createApiClient(adapter);
        }
        return this._instance;
    }
}

export default Client;