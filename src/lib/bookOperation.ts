import { TBook } from "@/schemas/book";
import { IResponse } from "@/schemas/server";
import { getPromise, postPromise } from "./response";

export async function addBook(book: TBook): Promise<IResponse> {
  return await postPromise<TBook>("/add-book", "POST", book, "Failed to contribute book");
}
export  async function getNewBooks(): Promise<TBook[]> {
  return await getPromise<TBook[]>("/newBooks");
}