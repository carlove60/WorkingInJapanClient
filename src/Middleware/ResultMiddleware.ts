import { Middleware } from "@microsoft/kiota-http-fetchlibrary";
import {add} from "../Components/Error/ErrorSlice.ts";
import {store} from "../store.ts";
import {MessageTypeObject} from "../../generated-client/models";

export class ResultMiddleware implements Middleware {
    next: Middleware | undefined;

    public async execute(
        url: string,
        requestInit: RequestInit
    ): Promise<Response> {
        try {
            const response = await fetch(url, requestInit);

            if (!response.ok) {
                // Handle unexpected status codes
                const errorMessage = await this.extractErrorMessage(response);

                // Dispatch the error message to Redux
                store.dispatch(add({message: errorMessage, type: MessageTypeObject.ErrorEscaped}));

                // Throw an error to prevent further processing
                throw new Error(`API Error: ${response.status} - ${errorMessage}`);
            }

            return response;
        } catch (error) {
            // Handle network errors or unexpected failures
            const errorMessage =
                error instanceof Error ? error.message : "An unknown error occurred";

            // Dispatch error to Redux
            store.dispatch(add({message: errorMessage, type: MessageTypeObject.ErrorEscaped }));

            console.error("Network/API Error:", errorMessage);
            throw error; // Re-throw so the calling function can still catch it
        }
    }

    private async extractErrorMessage(response: Response): Promise<string> {
        try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const errorBody = await response.json();
                return errorBody.message || `Error ${response.status}`;
            } else {
                return await response.text();
            }
        } catch {
            return `Unexpected error ${response.status}`;
        }
    }
}
