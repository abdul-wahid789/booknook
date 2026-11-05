"use client";

import * as React from "react";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BookCard from "../shared/BookCard";
import { useState } from "react";

// Sample book list matching your shelf layout
const INITIAL_BOOKS: BookItem[] = [
    {
        id: "1",
        title: "The Creative Act",
        authorName: "Rick Rubin",
        category: "Others",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
        totalCopies: 2,
        availableCopies: 1,
    },
    {
        id: "2",
        title: "Tomorrow, and Tomorrow, and Tomorrow",
        authorName: "Gabrielle Zevin",
        category: "Fiction",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
        totalCopies: 3,
        availableCopies: 2,
    },
    {
        id: "3",
        title: "The Midnight Library",
        authorName: "Matt Haig",
        category: "Fiction",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
        totalCopies: 1,
        availableCopies: 0,
    },
    {
        id: "4",
        title: "Braiding Sweetgrass",
        authorName: "Robin Wall Kimmerer",
        category: "Science",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
        totalCopies: 2,
        availableCopies: 2,
    },
    {
        id: "5",
        title: "A Psalm for the Wild-Built",
        authorName: "Becky Chambers",
        category: "Fiction",
        image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=600",
        totalCopies: 1,
        availableCopies: 0,
    },
    {
        id: "6",
        title: "The Little Prince",
        authorName: "Antoine de Saint-Exupéry",
        category: "Kids",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600",
        totalCopies: 4,
        availableCopies: 3,
    },
];


const AllBooksGrid = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    // Filtering & Search
    const filteredBooks = useMemo(() => {
        return INITIAL_BOOKS.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.authorName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                book.category.toLowerCase() === selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);


    return (
        <>
            {/* Filter & Search Bar */}
            <div className="my-10 flex flex-col gap-3 rounded-lg border border-border/80 bg-card p-2 shadow-2xs sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-2.5">
                {/* Search Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by title or author"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 border-none bg-transparent pl-9 text-xs focus-visible:ring-0 placeholder:text-muted-foreground/70"
                    />
                </div>

                <div className="h-6 w-px bg-border hidden sm:block" />

                {/* Category Filter */}
                <div className="w-full sm:w-[180px]">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="h-10 border-none bg-transparent text-xs text-foreground focus:ring-0">
                            <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                            <SelectItem value="all">All categories</SelectItem>
                            <SelectItem value="fiction">Fiction</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="kids">Kids</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-6 w-px bg-border hidden sm:block" />

                {/* Quick Stats & Sort Trigger */}
                <div className="flex items-center justify-between gap-3 px-2 text-xs text-muted-foreground sm:px-0">
                    <span>{filteredBooks.length} books</span>
                    <span className="text-border">·</span>
                    <button
                        type="button"
                        onClick={() => setSortBy(sortBy === "newest" ? "title" : "newest")}
                        className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                        <span>{sortBy === "newest" ? "Newest first" : "Alphabetical"}</span>
                        <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* 3-Column Catalog Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {/* {Array(5).map((_, index) => (
                        <BookCard key={index} />
                    ))} */}

                     <BookCard  />
                     <BookCard  />
                     <BookCard  />
                     <BookCard  />
                     <BookCard  />
                     <BookCard  />
                     <BookCard  />
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No books found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Try adjusting your search query or selected category.
                    </p>
                </div>
            )}
        </>
    );
};

export default AllBooksGrid;