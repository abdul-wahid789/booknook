"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { ArrowDownWideNarrow, Search, X, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/shared/BookCard";
import { TBook, bookCategories } from "@/schemas/book";

interface AllBooksGridProps {
  initialBooks: TBook[];
}

export default function AllBooksGrid({ initialBooks = [] }: AllBooksGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "title">("newest");

  // Memoized filter and sort pass
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...initialBooks]
      .filter((book) => {
        const matchesSearch =
          !query ||
          book.title?.toLowerCase().includes(query) ||
          book.authorName?.toLowerCase().includes(query);

        const matchesCategory =
          selectedCategory === "All" ||
          book.category?.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return (a.title || "").localeCompare(b.title || "");
        }
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }, [initialBooks, searchQuery, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All";

  return (
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 my-10 rounded-2xl border border-border/80 bg-card p-2 sm:p-2.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 border-none bg-transparent pl-10 pr-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 shadow-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Clear search query"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="hidden h-6 w-px bg-border/80 sm:block" />

        {/* Category Selector */}
        <div className="w-full sm:w-48">
          <Select
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val ?? "All")}
          >
            <SelectTrigger className="h-10 border-none bg-transparent text-xs sm:text-sm font-medium text-foreground focus:ring-0 shadow-none">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="All">All categories</SelectItem>
              {bookCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden h-6 w-px bg-border/80 sm:block" />

        {/* Status Count & Sorting Toggle */}
        <div className="flex items-center justify-between gap-3 px-3 py-1 text-xs text-muted-foreground sm:px-2 sm:py-0">
          <span className="font-mono text-[11px] sm:text-xs">
            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
          </span>

          <span className="h-3 w-px bg-border sm:hidden" />

          <button
            type="button"
            onClick={() => setSortBy(sortBy === "newest" ? "title" : "newest")}
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors cursor-pointer select-none"
          >
            <span>{sortBy === "newest" ? "Newest first" : "Alphabetical"}</span>
            <ArrowDownWideNarrow className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Books Display Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id || `${book.title}-${book.authorName}`} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/50 px-4 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-4">
            <Search className="h-5 w-5 stroke-[1.75]" />
          </div>
          <h3 className="font-heading text-lg font-medium text-foreground">
            No books found
          </h3>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
            We couldn&apos;t find any stories matching your current filters.
          </p>

          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="mt-5 h-9 gap-2 border-border bg-card px-4 text-xs font-medium text-foreground hover:bg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset filters</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}