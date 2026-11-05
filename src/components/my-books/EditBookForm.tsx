"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
    BookOpen,
    Check,
    Lock,
    ShieldCheck,
    Upload,
    User,
    Loader2,
    ArrowLeft,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { bookCategories, bookSchema, TBook, TBookInput } from "@/schemas/book";
import { updateBook } from "@/lib/bookOperation";
import { uploadToImgBB } from "@/lib/uploadImage";
import { errorToast, successToast } from "@/lib/toasts";

export default function EditBookForm({ book }: { book: TBook }) {
    const router = useRouter();
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isUploading, setIsUploading] = React.useState(false);

    const form = useForm<TBookInput, unknown, TBook>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: book.title || "",
            authorName: book.authorName || "",
            category: book.category || "Fiction",
            totalCopies: book.totalCopies ?? 1,
            image: book.image || "",
            shortDescription: book.shortDescription || "",
            userName: book.userName || "",
            userEmail: book.userEmail || "",
        },
    });

    const watchImage = form.watch("image");

    // Handle uploading replacement covers directly to ImgBB
    async function handleFileProcess(file: File) {
        if (!file.type.startsWith("image/")) {
            errorToast("Invalid file type. Please upload an image.");
            return;
        }

        try {
            setIsUploading(true);
            const uploadedUrl = await uploadToImgBB(file);
            form.setValue("image", uploadedUrl, {
                shouldValidate: true,
                shouldDirty: true,
            });
            successToast("Cover image updated successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            errorToast(
                error instanceof Error
                    ? error.message
                    : "Failed to upload image. Please try again."
            );
        } finally {
            setIsUploading(false);
        }
    }

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFileProcess(file);
    }

    const onSubmit: SubmitHandler<TBook> = async (data) => {
        if (!book._id) return;

        setIsSubmitting(true);
        try {
            const res = await updateBook(book._id, data);

            if (res.error) {
                errorToast(res.msg || "Unable to save book changes.");
                return;
            }

            successToast("Book details updated successfully!");
            router.push("/my-books");
            router.refresh();
        } catch (err) {
            console.error("Update error:", err);
            errorToast("An unexpected error occurred while saving.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formattedDate = book.createdAt
        ? format(new Date(book.createdAt), "dd MMM yyyy")
        : "Recently";

    const imageName =
        watchImage?.split("/").pop()?.split("?")[0] || "cover-image.jpg";

    return (
        <div className="space-y-8">
            {/* Kicker & Hero Heading */}
            <div className="space-y-2">
                <nav className="flex items-center gap-1.5 mb-8 text-xs text-muted-foreground">
                    <Link
                        href="/my-books"
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>My Books</span>
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-foreground">Edit Book</span>
                </nav>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    YOUR SHARED SHELF / EDIT BOOK
                </p>
                <h1 className="font-heading text-4xl font-normal tracking-tight text-primary sm:text-5xl">
                    A little edit. A better read.
                </h1>
                <p className="text-sm text-muted-foreground">
                    Update your book&apos;s details so the next reader knows what to expect.
                </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                {/* Left Column: Primary Edit Form Card */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs sm:p-9 lg:col-span-8">
                    <form
                        id="form-edit-book"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-7"
                    >
                        {/* Form Card Header */}
                        <div className="flex items-center justify-between border-b border-border/60 pb-5">
                            <h2 className="font-heading text-xl font-medium text-foreground">
                                Book details
                            </h2>
                            <span className="text-xs text-muted-foreground">
                                All book fields are required
                            </span>
                        </div>

                        <FieldGroup className="space-y-6">
                            {/* Row 1: Title & Author */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Controller
                                    name="title"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-book-title">Book Title</FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-book-title"
                                                placeholder="e.g. The Creative Act"
                                                aria-invalid={fieldState.invalid}
                                                className="h-10 border-border bg-background text-sm"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="authorName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-book-author">Author Name</FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-book-author"
                                                placeholder="e.g. Rick Rubin"
                                                aria-invalid={fieldState.invalid}
                                                className="h-10 border-border bg-background text-sm"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* Row 2: Category */}
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-book-category">Category</FieldLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger
                                                id="form-book-category"
                                                aria-invalid={fieldState.invalid}
                                                className="h-10 w-full border-border bg-background text-sm"
                                            >
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent className="border-border bg-card">
                                                {bookCategories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription className="text-[11px] text-muted-foreground">
                                            Fiction · Science · History · Kids · Poetry · Philosophy · Others
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Row 3: Book Image with Preview & Direct Upload */}
                            <Controller
                                name="image"
                                control={form.control}
                                render={({ fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-book-image-upload">
                                            Book Image
                                        </FieldLabel>

                                        <input
                                            ref={fileInputRef}
                                            id="form-book-image-upload"
                                            type="file"
                                            accept="image/*"
                                            disabled={isUploading}
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                        />

                                        <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-3.5">
                                                <div className="relative aspect-[2/3] h-16 w-11 shrink-0 overflow-hidden rounded-xs border border-border bg-muted/50 p-1 shadow-2xs">
                                                    {watchImage ? (
                                                        <Image
                                                            src={watchImage}
                                                            alt="Book cover preview"
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                                            <BookOpen className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="max-w-[200px] truncate text-xs font-semibold text-foreground sm:max-w-[280px]">
                                                        {imageName}
                                                    </p>
                                                    <p className="text-[11px] text-muted-foreground">
                                                        {isUploading
                                                            ? "Uploading new cover to ImgBB..."
                                                            : "Image uploaded and hosted"}
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                disabled={isUploading || isSubmitting}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="h-9 gap-2 border-border bg-card px-4 text-xs font-medium text-foreground hover:bg-muted"
                                            >
                                                {isUploading ? (
                                                    <>
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                                        <span>Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Replace image</span>
                                                        <Upload className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        <FieldDescription className="text-[11px] text-muted-foreground">
                                            Upload your cover to ImgBB. Use a clear, front-facing image.
                                        </FieldDescription>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Row 4: Short Description */}
                            <Controller
                                name="shortDescription"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-book-description">
                                            Short Description
                                        </FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="form-book-description"
                                            rows={4}
                                            placeholder="What makes this book worth sharing? Give readers a short introduction..."
                                            aria-invalid={fieldState.invalid}
                                            className="border-border bg-background text-sm leading-relaxed resize-none"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Read-Only Account Metadata */}
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <span>
                                        From your signed-in account. These details can&apos;t be changed here.
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-foreground">
                                                User Name
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <Lock className="h-3 w-3" /> Read-only
                                            </span>
                                        </div>
                                        <Input
                                            value={book.userName || "Community Contributor"}
                                            readOnly
                                            disabled
                                            className="h-10 border-border bg-muted/40 text-sm text-muted-foreground cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-foreground">
                                                Email
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                                <Lock className="h-3 w-3" /> Read-only
                                            </span>
                                        </div>
                                        <Input
                                            value={book.userEmail || "user@example.com"}
                                            readOnly
                                            disabled
                                            className="h-10 border-border bg-muted/40 text-sm text-muted-foreground cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </FieldGroup>

                        {/* Bottom Actions Bar */}
                        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
                            <span className="text-xs text-muted-foreground">
                                Originally added {formattedDate}
                            </span>

                            <div className="flex items-center gap-3">
                                <Link href="/my-books">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isSubmitting || isUploading}
                                        className="h-10 border-border bg-card px-5 text-xs font-medium text-foreground hover:bg-muted"
                                    >
                                        Cancel
                                    </Button>
                                </Link>

                                <Button
                                    type="submit"
                                    form="form-edit-book"
                                    disabled={isSubmitting || isUploading}
                                    className="h-10 gap-2 bg-primary px-6 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Save Changes</span>
                                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Column: Helpful Tips Card */}
                <div className="space-y-6 lg:col-span-4">
                    <div className="rounded-2xl border border-secondary/60 bg-secondary/35 p-6 shadow-2xs sm:p-7">

                        <h3 className="mt-4 font-heading text-2xl font-normal tracking-tight text-foreground">
                            Your favorite could be someone’s next.
                        </h3>

                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            A few thoughtful details make it easier for a story to find its next reader.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold text-foreground">
                                    A title worth finding
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Use the full title and author’s name.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-foreground">
                                    A cover worth noticing
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Choose a crisp image of the book cover.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-foreground">
                                    A little introduction
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    Share the feeling, not the ending.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User Sign-in Identity Footnote */}
                    <div className="flex items-start gap-3 px-2 text-xs text-muted-foreground">
                        <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <p>
                            Sharing as{" "}
                            <span className="font-medium text-foreground">{book.userName}</span>. You can
                            edit or remove your books from My Books.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}