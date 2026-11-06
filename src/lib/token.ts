// // src/lib/token.ts
// import { authClient } from "@/lib/auth-client";

// export async function getAuthToken(): Promise<string | null> {
//   // In the browser (Client Components like BorrowAction)
//   if (typeof window !== "undefined") {
//     try {
//       const res = await authClient.jwt.getToken();
//       return res?.data?.token ?? null;
//     } catch {
//       return null;
//     }
//   }

//   // Fallback for SSR phase: authClient will return null safely without importing Node modules
//   return null;
// }