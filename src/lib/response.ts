import { TMethod, IResponse } from "@/schemas/server";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getPromise(url: string, token: string | null, errorMessage: string = "Something went wrong"): Promise<IResponse> {
    // await delay(5000);
    try {
        let response = null
        if (token) {
            response = await fetch(`${server_url}${url}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
        } else {
            response = await fetch(`${server_url}${url}`);
        }
        try {
            const resData = await response.json()
            if (resData.error) {
                return { data: [], msg: resData.msg, error: true }
            }
            return resData;
        } catch {
            return { data: [], msg: 'JSON error', error: true }
        }
    } catch {
        return { data: [], msg: 'Server Error', error: true };
    }
}

export async function postPromise<T>(url: string,
    token: string,
    action: TMethod,
    data: T,
    errorMessage: string = "Something went wrong"): Promise<IResponse> {
    try {
        const response = await fetch(`${server_url}${url}`, {
            method: action,
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
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


export async function checkBorrowStatus(bookId: string, userEmail: string, token: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/borrow-status/${bookId}/${encodeURIComponent(userEmail)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();
        return data.hasBorrowed ?? false;
    } catch (error) {
        console.error('Failed to check borrow status:', error);
        return false;
    }
}