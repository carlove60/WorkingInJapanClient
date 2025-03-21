import {Middleware} from "@microsoft/kiota-http-fetchlibrary";

export class AuthMiddleware implements Middleware {
    next: Middleware | undefined;
    public async execute(
        url: string,
        requestInit: RequestInit,
    ): Promise<Response> {
        // Attach Authorization token from localStorage
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

        return response;
    }
}
