"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Mail,
    Camera,
    Check,
    Lock,
    Loader2,
    ArrowLeft,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession, updateUser } from "@/lib/auth-client";
import { uploadToImgBB } from "@/lib/uploadImage";
import { errorToast, successToast } from "@/lib/toasts";

const profileSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    image: z.string().optional(),
});

type TProfile = z.infer<typeof profileSchema>;

export default function ProfileForm() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { data: session, isPending } = useSession();
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<TProfile>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    });

    // Prefill once the session is available
    useEffect(() => {
        if (session?.user) {
            form.reset({
                name: session.user.name || "",
                image: session.user.image || "",
            });
        }
    }, [session, form]);

    const watchImage = form.watch("image");

    const getInitials = (name?: string) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    async function handleFileProcess(file: File) {
        if (!file.type.startsWith("image/")) {
            errorToast("Please upload an image file (PNG, JPG, WEBP).");
            return;
        }

        try {
            setIsUploading(true);
            const uploadedUrl = await uploadToImgBB(file);
            form.setValue("image", uploadedUrl, {
                shouldValidate: true,
                shouldDirty: true,
            });
            successToast("Profile photo uploaded!");
        } catch (error) {
            console.error("Avatar upload error:", error);
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

    const onSubmit = async (data: TProfile) => {
        setIsSaving(true);
        try {
            // Better Auth client method to update profile credentials
            const res = await updateUser({
                name: data.name,
                image: data.image || undefined,
            });

            if (res?.error) {
                throw new Error(res.error.message || "Failed to update profile.");
            }

            successToast("Profile updated successfully!");
            router.refresh();
        } catch (err) {
            console.error("Profile update failed:", err);
            errorToast(
                err instanceof Error ? err.message : "Unable to save profile changes."
            );
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Top Breadcrumb & Heading */}
            <div className="space-y-2">
                <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link
                        href="/my-books"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Dashboard</span>
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-foreground">Profile Settings</span>
                </nav>

                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    ACCOUNT SETTINGS
                </p>
                <h1 className="font-heading text-4xl font-normal tracking-tight text-primary sm:text-5xl">
                    Your Reader Profile
                </h1>
                <p className="text-sm text-muted-foreground">
                    Manage your identity across BookNook and update how fellow readers see you on the shelf.
                </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                {/* Left Column: Form Card */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs sm:p-9 lg:col-span-8">
                    <form
                        id="form-profile"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-7"
                    >
                        {/* Header with Avatar Preview & ImgBB Upload */}
                        <div className="flex flex-col gap-5 border-b border-border/60 pb-7 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-20 w-20 border-2 border-border shadow-sm">
                                        <AvatarImage
                                            src={watchImage || undefined}
                                            alt={form.watch("name") || "Avatar"}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-secondary text-base font-semibold text-secondary-foreground">
                                            {getInitials(form.watch("name"))}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Hidden File Input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        disabled={isUploading}
                                        onChange={handleFileInputChange}
                                        className="hidden"
                                    />

                                    {/* Floating Change Photo Icon Button */}
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        disabled={isUploading || isSaving}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-border bg-card shadow-xs hover:bg-muted"
                                        aria-label="Upload profile image"
                                    >
                                        {isUploading ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                        ) : (
                                            <Camera className="h-3.5 w-3.5 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>

                                <div className="space-y-0.5">
                                    <h3 className="font-heading text-lg font-medium text-foreground">
                                        Profile Picture
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG or WEBP. Uploads directly to ImgBB.
                                    </p>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={isUploading || isSaving}
                                onClick={() => fileInputRef.current?.click()}
                                className="h-9 self-start text-xs sm:self-auto"
                            >
                                {isUploading ? "Uploading..." : "Change photo"}
                            </Button>
                        </div>

                        <FieldGroup className="space-y-6">
                            {/* Display Name Field */}
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-user-name">Display Name</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-user-name"
                                            placeholder="e.g. Eleanor Vance"
                                            aria-invalid={fieldState.invalid}
                                            className="h-11 border-border bg-background text-sm"
                                        />
                                        <FieldDescription className="text-[11px] text-muted-foreground">
                                            This is how your name will appear on the books you share and community borrow slips.
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Read-Only Email Field */}
                            <div className="space-y-1.5 pt-1">
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="form-user-email">Account Email</FieldLabel>
                                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                        <Lock className="h-3 w-3" /> Read-only
                                    </span>
                                </div>
                                <div className="relative flex items-center">
                                    <Input
                                        id="form-user-email"
                                        value={session?.user?.email || ""}
                                        readOnly
                                        disabled
                                        className="h-11 cursor-not-allowed border-border bg-muted/40 pr-10 text-sm text-muted-foreground"
                                    />
                                    <Mail className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-[11px] text-muted-foreground">
                                    Your primary login identifier. Contact support to change your account email.
                                </p>
                            </div>

                            {/* Identity Protection Notice */}
                            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 p-3.5 text-xs text-muted-foreground">
                                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                                <span>
                                    Your session credentials and identity are securely managed with Better Auth JWT tokens.
                                </span>
                            </div>
                        </FieldGroup>

                        {/* Bottom Actions Bar */}
                        <div className="flex items-center justify-end gap-3 border-t border-border/60 pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isSaving || isUploading}
                                onClick={() =>
                                    form.reset({
                                        name: session?.user?.name || "",
                                        image: session?.user?.image || "",
                                    })
                                }
                                className="h-10 border-border bg-card px-5 text-xs font-medium text-foreground hover:bg-muted"
                            >
                                Reset
                            </Button>

                            <Button
                                type="submit"
                                form="form-profile"
                                disabled={isSaving || isUploading || !form.formState.isDirty}
                                className="h-10 gap-2 bg-primary px-6 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                            >
                                {isSaving ? (
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
                    </form>
                </div>

                {/* Right Column: Information & Overview Card */}
                <div className="space-y-6 lg:col-span-4">
                    <Card className="rounded-2xl border border-secondary/60 bg-secondary/35 p-6 shadow-none sm:p-7">
                        <CardHeader className="p-0 pb-4">
                            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-primary uppercase">
                                <Sparkles className="h-3 w-3" />
                                <span>Community Identity</span>
                            </div>
                            <h3 className="mt-3 font-heading text-xl font-normal tracking-tight text-foreground sm:text-2xl">
                                A face to the stories.
                            </h3>
                        </CardHeader>

                        <CardContent className="space-y-4 p-0 text-xs text-muted-foreground">
                            <p className="leading-relaxed">
                                When you contribute books or borrow a story from another member, readers can see who is keeping the shelf alive.
                            </p>

                            <div className="space-y-3 pt-2">
                                <div>
                                    <h4 className="font-semibold text-foreground">Real names build trust</h4>
                                    <p className="mt-0.5">
                                        Using your actual name helps other community members recognize you during pickups and returns.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-foreground">Instant synchronization</h4>
                                    <p className="mt-0.5">
                                        Updating your name here automatically updates your navbar and contributor tags across all your shared books.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}