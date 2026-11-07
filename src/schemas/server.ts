import { TBook, TBorrowBook } from "./book";

export interface IResponse {
    data?: TBook[] | TBorrowBook[]
    msg: string;
    error: boolean;
}
export type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
