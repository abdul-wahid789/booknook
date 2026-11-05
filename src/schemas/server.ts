import { TBook } from "./book";

export interface IResponse {
    data?: TBook[]
    msg: string;
    error: boolean;
}
export type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
