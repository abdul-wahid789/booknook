import { TBook } from "@/schemas/book";
import { IResponse } from "@/schemas/server";
import { getPromise, postPromise } from "./response";
import { TBorrowInput } from "@/schemas/borrow";
export interface IBorrowedItem {
  _id: string;
  bookId: string;
  userEmail: string;
  borrowedAt: string | Date;
  returnDueDate: string | Date;
  status: "borrowed" | "returned";
  bookDetails?: TBook;
}

export async function addBook(book: TBook, token: string): Promise<IResponse> {
  return await postPromise<TBook>("/add-book", token, "POST", book, "Failed to contribute book");
}
export async function getNewBooks(): Promise<IResponse> {
  return await getPromise("/newBooks/6", null);
}
export async function getAllBooks(): Promise<IResponse> {
  return await getPromise("/all-books", null);
}
export async function getBookDetails(id: string, token: string): Promise<IResponse> {
  return await getPromise('/book/' + id, token);
}

export async function addBorrowBook(data: TBorrowInput, token: string): Promise<IResponse> {
  console.log(token)
  return await postPromise<TBorrowInput>("/add-borrow", token, "POST", data, "Failed to process borrow request");
}

export async function getMyBorrows(userEmail: string, token: string): Promise<IResponse> {
  return await getPromise(`/my-borrows/${encodeURIComponent(userEmail)}`, token);
}

export async function returnBook(borrowId: string, token: string): Promise<IResponse> {
  return await postPromise<{ borrowId: string }>("/return-book", token, "POST", { borrowId }, "Failed to return book");
}

export async function getMyBooks(userEmail: string, token: string): Promise<IResponse> {
  return await getPromise(`/my-books/${encodeURIComponent(userEmail)}`, token);
}

export async function deleteBook(id: string, token: string): Promise<IResponse> {
  return await postPromise<undefined>(
    `/book/${id}`,
    token,
    "DELETE",
    undefined,
    "Failed to delete book"
  );
}

export async function updateBook(
  token: string,
  id: string,
  data: TBook
): Promise<IResponse> {
  return await postPromise<TBook>(
    `/edit-book/${id}`,
    token,
    "PUT",
    data,
    "Failed to update book"
  );
}