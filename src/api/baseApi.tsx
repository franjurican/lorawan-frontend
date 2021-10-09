import { ApiError } from "../models/ApiError";

export const baseApi = {
    get: async <T extends {}>(url: string) => await request<T>(url),
    post: async <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
        await request<TResponse>(url, { method: 'POST', body }),
}

async function request<T>(url: string, config?: RequestInit): Promise<T> {
    const response = await fetch(url, config);
    if (response.status > 199 && response.status < 300) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse as T;
    } else {
        console.log(response.status, response.statusText);
        throw new ApiError("Greška kod dohvata podataka", "Ukoliko vidite ovu poruku zanemarite xD");
    }
}


