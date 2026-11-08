import { TBook, TBorrowBook } from "./book";

export interface IResponse <T> {
    data?: T
    msg: string;
    error: boolean;
}
export type TMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
