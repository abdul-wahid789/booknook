import { authClient } from "./auth-client";

export default async function getClientToken() {
    const { data } = await authClient.token()
    if (data !== null) {
        return data.token
    } else {
        return ''
    }
}