import { TMethod, IResponse } from "@/schemas/server";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getPromise<T>(url: string, errorMessage: string = "Something went wrong"): Promise<T | string> {
    try {
        const response = await fetch(`${server_url}${url}`);
        return await response.json() as T;
    } catch (error) {
        return (errorMessage + ": " + String(error));
    }
}
export async function postPromise<T>(url: string,
    action: TMethod,
    data: T,
    errorMessage: string = "Something went wrong"): Promise<IResponse> {
    try {
        const response = await fetch(`${server_url}${url}`, {
            method: action,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(response)
        try {
            const serverData = await response.json();
            return serverData as IResponse;

        }
        catch {
            return { msg: "Invalid JSON response from server", error: true }
        }
    }
    catch (error) {
        return { msg: errorMessage + ": " + String(error), error: true };
    }
}
