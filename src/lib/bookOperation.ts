import { TBook, TBookInput, TBorrowBook } from "@/schemas/book";
import { TBorrowInput } from "@/schemas/borrow";
import { IResponse } from "@/schemas/server";
import { deletePromise, getPromise, postPromise } from "./response";

// Book

export async function getAllBooks(): Promise<IResponse<TBook[]>> {
  return await getPromise<TBook[]>("/books", null);
}

export async function getNewBooks(limit: number = 6): Promise<IResponse<TBook[]>> {
  return await getPromise<TBook[]>(`/books?limit=${limit}`, null);
}

export async function getBookDetails(id: string, token: string): Promise<IResponse<TBook>> {
  return await getPromise<TBook>(`/books/${id}`, token);
}

export async function getMyBooks(userEmail: string, token: string): Promise<IResponse<TBook[]>> {
  return await getPromise<TBook[]>(`/books/user/${encodeURIComponent(userEmail)}`, token);
}

export async function addBook(book: TBook, token: string): Promise<IResponse<TBook>> {
  return await postPromise<TBook>(
    "/books",
    token,
    "POST",
    book,
    "Failed to contribute book"
  );
}

export async function updateBook(
  token: string,
  id: string,
  data: TBook
): Promise<IResponse<TBook>> {
  return await postPromise(
    `/books/${id}`,
    token,
    "PUT",
    data,
    "Failed to update book"
  );
}

export async function deleteBook(id: string, token: string): Promise<IResponse<TBook>> {
  return await deletePromise<TBook>(
    `/books/${id}`,
    token,
    "DELETE",
    "Failed to delete book"
  );
}




// Borrow

export async function checkBorrowStatus(
  bookId: string,
  userEmail: string,
  token: string
): Promise<IResponse<boolean>> {
  return await getPromise(
    `/borrows/check/${bookId}/${encodeURIComponent(userEmail)}`,
    token
  );
}

export async function getMyBorrows(
  userEmail: string,
  token: string
): Promise<IResponse<TBorrowBook[]>> {
  return await getPromise(
    `/borrows/user/${encodeURIComponent(userEmail)}`,
    token
  );
}

export async function addBorrowBook(
  data: TBorrowInput,
  token: string
): Promise<IResponse<TBorrowInput>> {
  return await postPromise<TBorrowInput>(
    "/borrows",
    token,
    "POST",
    data,
    "Failed to process borrow request"
  );
}

export async function returnBook(
  borrowId: string,
  token: string
): Promise<IResponse<TBook>> {
  return await deletePromise<TBook>(
    `/borrows/return/${borrowId}`,
    token,
    "POST",
    // { borrowId },
    "Failed to return book"
  );
}