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
export async function addBook(book: TBook): Promise<IResponse> {
  return await postPromise<TBook>("/add-book", "POST", book, "Failed to contribute book");
}
export async function getNewBooks(): Promise<IResponse> {
  return await getPromise("/newBooks/6");
}
export async function getAllBooks(): Promise<IResponse> {
  return await getPromise("/all-books");
}
export async function getBookDetails(id: string): Promise<IResponse> {
  return await getPromise('/book/' + id);
}

export async function addBorrowBook(data: TBorrowInput): Promise<IResponse> {
  return await postPromise<TBorrowInput>(
    "/add-borrow",
    "POST",
    data,
    "Failed to process borrow request"
  );
}

export async function getMyBorrows(userEmail: string): Promise<IResponse> {
  return await getPromise(`/my-borrows/${encodeURIComponent(userEmail)}`);
}

export async function returnBook(borrowId: string): Promise<IResponse> {
  return await postPromise<{ borrowId: string }>(
    "/return-book",
    "POST",
    { borrowId },
    "Failed to return book"
  );
}

export async function getMyBooks(userEmail: string): Promise<IResponse> {
  return await getPromise(`/my-books/${encodeURIComponent(userEmail)}`);
}

export async function deleteBook(id: string): Promise<IResponse> {
  return await postPromise<undefined>(
    `/book/${id}`,
    "DELETE",
    undefined,
    "Failed to delete book"
  );
}

