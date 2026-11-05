import { TMethod, IResponse } from "@/schemas/server";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getPromise(url: string, errorMessage: string = "Something went wrong"): Promise<IResponse> {

    try {
        const response = await fetch(`${server_url}${url}`);
        try {
            const resData = await response.json()
            if (resData.error) {
                return {data: [],  msg: resData.msg, error: true }
            }
            return resData;
        } catch {
            return {data: [],  msg: 'JSON error', error: true }
        }
    } catch {
        return {data: [],  msg: 'Server Error', error: true };
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
            return { data: [], msg: "Invalid JSON response from server", error: true }
        }
    }
    catch (error) {
        return { data: [], msg: errorMessage + ": " + String(error), error: true };
    }
}
