import {createApiClient} from "../generated-client/apiClient.ts";
import { AuthMiddleware } from "./Middleware/KiotaMiddleware.ts";
import {AuthenticationProvider, RequestInformation} from "@microsoft/kiota-abstractions";
import {FetchRequestAdapter, HttpClient} from "@microsoft/kiota-http-fetchlibrary";

// Create an instance of the HttpClient
const httpClient = new HttpClient(undefined, new AuthMiddleware());
// A simple authentication provider that retrieves a token from localStorage
class SimpleAuthenticationProvider implements AuthenticationProvider {
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
const adapter = new FetchRequestAdapter(new SimpleAuthenticationProvider(), undefined, undefined, httpClient);

// Initialize the Kiota API Client
export const apiClient = createApiClient(adapter);
