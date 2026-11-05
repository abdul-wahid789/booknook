export interface TBorrowInput {
  bookId: string;
  userEmail: string;
  userName?: string;
  returnDueDate: string;
}

export interface TBorrow {
  _id?: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  authorName: string;
  category: string;
  userEmail: string;
  userName: string;
  borrowedAt: Date | string;
  returnDueDate: Date | string;
  returnedAt?: Date | string;
  status: "borrowed" | "returned";
}