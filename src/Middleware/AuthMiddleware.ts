import { Middleware } from "@microsoft/kiota-http-fetchlibrary";
import { store } from "../store.ts";
import { add } from "../Components/Bubble/BubbleSlice.ts";
import { MessageTypeObject } from "../../generated-api/models";

export class AuthMiddleware implements Middleware {
  next: Middleware | undefined;

  public async execute(url: string, requestInit: RequestInit): Promise<Response> {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        requestInit.headers = {
          ...requestInit.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      // Send request
      const response = await fetch(url, requestInit);

      // Capture and store new token if present in response headers
      const newToken = response.headers.get("New-Token");
      if (newToken) {
        localStorage.setItem("token", newToken);
      }

      if (!response.ok) {
        // Handle unexpected status codes
        const errorMessage = await this.extractErrorMessage(response);

        // Dispatch the error message to Redux
        store.dispatch(add({ message: errorMessage, type: MessageTypeObject.ErrorEscaped }));

        // Throw an error to prevent further processing
        throw new Error(`API Error: ${response.status} - ${errorMessage}`);
      }

      return response;
    } catch (error) {
      // Handle network errors or unexpected failures
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

      // Dispatch error to Redux
      store.dispatch(add({ message: errorMessage, type: MessageTypeObject.ErrorEscaped }));

      console.error("Network/API Bubble:", errorMessage);
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
