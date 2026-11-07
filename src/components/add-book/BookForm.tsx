"use client";

import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
  Loader2,
  Lock,
  Plus,
  ShieldCheck,
  X,
} from "lucide-react";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { bookCategories, bookSchema, TBook, TBookInput } from "@/schemas/book";
import { uploadToImgBB } from "@/lib/uploadImage";
import { errorToast, successToast } from "@/lib/toasts";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";
import { addBook } from "@/lib/bookOperation";
import getClientToken from "@/lib/clientToken";

interface BookFormProps {
  user: {
    name: string,
    email: string
  }
}

export default function BookForm({ user }: BookFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const userName = user.name
  const userEmail = user.email


  const form = useForm<TBookInput, unknown, TBook>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      authorName: "",
      category: "Fiction",
      totalCopies: 1,
      image: "",
      shortDescription: "",
      userName: userName,
      userEmail: userEmail,
    },
  });

  const watchImage = form.watch("image");

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
      successToast("Cover image uploaded successfully!");
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

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  }

  const resetFormState = () => {
    form.reset({
      title: "",
      authorName: "",
      category: "Fiction",
      totalCopies: 1,
      image: "",
      shortDescription: "",
      userEmail,
      userName
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<TBook> = async (data) => {
    setIsSubmitting(true);

    const token = await getClientToken()
    const res = await addBook(data, token);
    if (!res.error) {
      successToast("Book contributed successfully");
      resetFormState();
    } else {
      errorToast(res.msg);
    };
    setIsSubmitting(false);
  }
  return (
    <form
      id="form-add-book"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
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
                  className="h-11 bg-background"
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
                  className="h-11 bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 2: Category & Total Copies */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-book-category">Category</FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger
                    id="form-book-category"
                    aria-invalid={fieldState.invalid}
                    className="h-11 bg-background"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {bookCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription className="text-xs font-light text-muted-foreground">
                  Fiction · Science · History · Kids · Poetry · Philosophy · Others
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="totalCopies"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-book-copies">Total Copies</FieldLabel>
                <Input
                  {...field}
                  value={field.value as string ?? "" as string}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? "" : Number(val));
                  }}
                  id="form-book-copies"
                  type="number"
                  min={1}
                  max={50}
                  aria-invalid={fieldState.invalid}
                  className="h-11 bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Row 3: Book Image with Direct ImgBB Upload & Preview */}
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

              {watchImage ? (
                <div className="relative flex items-center justify-between rounded-xl border border-border bg-background p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                      <Image
                        src={watchImage}
                        alt="Book cover preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        Cover image uploaded
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Hosted and ready to display
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isUploading}
                    onClick={() => {
                      form.setValue("image", "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(e.dataTransfer.types.includes("Files"));
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() =>
                    !isUploading && fileInputRef.current?.click()
                  }
                  className={`flex flex-col items-center justify-center rounded-xl border border-dashed py-8 text-center transition-colors cursor-pointer ${isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-border/80 bg-background/50 hover:bg-muted/30"
                    } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground">
                        Uploading to ImgBB...
                      </span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="h-6 w-6 text-muted-foreground/80 mb-2 stroke-[1.5]" />
                      <p className="text-xs font-semibold text-foreground">
                        Choose an image or drag it here
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        JPG, PNG or WEBP · up to 5 MB
                      </p>
                    </>
                  )}
                </div>
              )}

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
                placeholder="What makes this book worth sharing? Give readers a short, spoiler-free introduction."
                aria-invalid={fieldState.invalid}
                className="bg-background resize-none placeholder:text-muted-foreground/60"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Read-Only Signed-In User Metadata */}
        <div className="pt-2">
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>
              From your signed-in account. These details can&apos;t be changed here.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Controller
              name="userName"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="form-book-user-name">User Name</FieldLabel>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Lock className="h-3 w-3" /> Read-only
                    </span>
                  </div>
                  <Input
                    {...field}
                    id="form-book-user-name"
                    readOnly
                    className="h-11 bg-muted/40 text-muted-foreground cursor-not-allowed"
                  />
                </Field>
              )}
            />

            <Controller
              name="userEmail"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="form-book-user-email">Email</FieldLabel>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Lock className="h-3 w-3" /> Read-only
                    </span>
                  </div>
                  <Input
                    {...field}
                    id="form-book-user-email"
                    readOnly
                    className="h-11 bg-muted/40 text-muted-foreground cursor-not-allowed"
                  />
                </Field>
              )}
            />
          </div>
        </div>
      </FieldGroup>

      <Separator className="my-6 bg-border/60" />

      {/* Form Bottom Actions */}
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          Once added, your book will be available for others to read.
        </p>

        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting || isUploading}
            onClick={resetFormState}
            className="h-10 px-5"
          >
            Clear
          </Button>
          <Button
            type="submit"
            form="form-add-book"
            disabled={isSubmitting || isUploading}
            className="h-10 px-5"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>Add Book</span>
                <Plus className="ml-1.5 h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}