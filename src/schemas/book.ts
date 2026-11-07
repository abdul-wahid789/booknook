import { z } from "zod";

export const bookCategories = [
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Poetry",
  "Philosophy",
  "Others",
] as const;

export const bookSchema = z.object({
  _id: z.string().optional(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(120, "Title cannot exceed 120 characters."),
  authorName: z
    .string()
    .min(2, "Author name must be at least 2 characters.")
    .max(80, "Author name cannot exceed 80 characters."),
  category: z.enum(bookCategories, {
    message: "Please select a category.",
  }),
  totalCopies: z.coerce
    .number({ message: "Must be a number." })
    .int("Copies must be a whole number.")
    .min(1, "Must list at least 1 copy.")
    .max(50, "Maximum limit is 50 copies."),
  image: z.string().url("Please upload or provide a valid cover image URL."),
  shortDescription: z
    .string()
    .min(15, "Please write at least 15 characters.")
    .max(600, "Description cannot exceed 600 characters."),
  userName: z.string().min(1, "User name is required."),
  userEmail: z.string().email("Invalid email address."),
  createdAt: z.coerce.date().optional(),
});

export type TBorrowBook = {
  _id: string;
  userEmail: string;
  bookId: string;
  status: "borrowed" | "returned" | "overdue" | string;
  borrowedAt: string;
  returnDueDate: string;
  bookDetails: {
    _id: string;
    title: string;
    authorName: string;
    image: string;
  };
};

export type TBookInput = z.input<typeof bookSchema>;
export type TBook = z.output<typeof bookSchema>;