import { auth } from "./auth";
import { headers } from "next/headers";

export default async function getServerToken() {
  const result = await auth.api.getToken({
    headers: await headers(),
  });

  return result?.token;
}