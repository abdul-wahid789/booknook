'use client';

import React, { useRef, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import {
    CornerDownLeft,
    Eye,
    EyeOffIcon,
    HandHelping,
    ImageIcon,
    MailIcon,
    UploadCloud,
    User,
    UsersRoundCollaboration,
    X,
} from 'lucide-react';

import HeaderSection from '@/components/shared/HeaderSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { signUp, signIn } from '@/lib/auth-client';
import { uploadToImgBB } from '@/lib/uploadImage';
import { errorToast, successToast } from '@/lib/toasts';
import { TUser, userSchema } from '@/schemas/user';

const SignUpContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [isVisiPass, setIsVisiPass] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

    const [isUploadingImg, setIsUploadingImg] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const header = {
        smallTitle: 'A SEAT AT THE COMMUNITY TABLE',
        heading: 'Begin your reading chapter.',
        description:
            'Join neighbors and fellow book lovers sharing stories from their personal shelves.',
    };

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            image: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const toggleEye = () => setIsVisiPass((prev) => !prev);

    async function handleSocialSignUp(provider: 'google' | 'github') {
        try {
            setSocialLoading(provider);
            await signIn.social({
                provider,
                callbackURL: callbackUrl,
            });
        } catch (err: unknown) {
            console.error(err);
            errorToast(err instanceof Error ? err.message : `Failed to sign up with ${provider}`);
            setSocialLoading(null);
        }
    }

    const handleImageFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (val: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            errorToast('Please select a valid image file.');
            return;
        }

        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);

        try {
            setIsUploadingImg(true);
            const uploadedUrl = await uploadToImgBB(file);
            onChange(uploadedUrl);
        } catch (err) {
            console.error(err);
            form.setError('image', { message: 'Failed to upload photo.' });
            setPreviewUrl(null);
            onChange('');
            errorToast('Failed to upload image. Please try again.');
        } finally {
            setIsUploadingImg(false);
        }
    };

    const handleRemoveImage = (onChange: (val: string) => void) => {
        setPreviewUrl(null);
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    async function onSubmit(data: TUser) {
        try {
            setIsSubmitting(true);
            const { confirmPassword, ...userData } = data;

            const { data: res, error } = await signUp.email({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                image: userData.image || undefined,
            });

            if (error) {
                throw new Error(error.message || 'Registration failed');
            }

            successToast('Welcome to BookNook! Account created successfully.');
            router.push('/sign-in');
            router.refresh();
        } catch (err: unknown) {
            console.error(err);
            errorToast(err instanceof Error ? err.message : 'Unable to register account.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const isAnyLoading = isSubmitting || isUploadingImg || socialLoading !== null;

    return (
        <div className="w-full">
            <HeaderSection {...header} />

            <div className="mt-8 flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
                {/* Main Sign-Up Card */}
                <Card className="w-full flex-1 rounded-2xl border border-border/70 bg-card p-6 shadow-2xs sm:p-8 md:p-10">
                    <CardHeader className="flex flex-row items-center justify-between p-0 pb-6">
                        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Create account
                        </h2>
                        <FieldDescription className="text-xs">Free community membership</FieldDescription>
                    </CardHeader>

                    <FieldSeparator />

                    <CardContent className="space-y-6 p-0 pt-6">
                        {/* Social Registration Stack */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isAnyLoading}
                                onClick={() => handleSocialSignUp('google')}
                                className="h-10 w-full gap-2 border-border bg-card text-xs font-medium text-foreground hover:bg-muted"
                            >
                                {socialLoading === 'google' ? (
                                    <Spinner className="h-4 w-4" />
                                ) : (
                                    <FaGoogle className="h-4 w-4 text-primary" />
                                )}
                                <span>Sign up with Google</span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={isAnyLoading}
                                onClick={() => handleSocialSignUp('github')}
                                className="h-10 w-full gap-2 border-border bg-card text-xs font-medium text-foreground hover:bg-muted"
                            >
                                {socialLoading === 'github' ? (
                                    <Spinner className="h-4 w-4" />
                                ) : (
                                    <FaGithub className="h-4 w-4 text-foreground" />
                                )}
                                <span>Sign up with GitHub</span>
                            </Button>
                        </div>

                        {/* Visual Divider */}
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/70" />
                            </div>
                            <span className="relative bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                                Or register with email
                            </span>
                        </div>

                        {/* Email Registration Form */}
                        <form
                            id="form-user"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FieldGroup className="space-y-4">
                                {/* Full Name */}
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="relative">
                                            <FieldLabel htmlFor="form-name">Full Name</FieldLabel>
                                            <InputGroup className="h-10">
                                                <InputGroupInput
                                                    {...field}
                                                    id="form-name"
                                                    aria-invalid={fieldState.invalid}
                                                    autoComplete="name"
                                                    type="text"
                                                    placeholder="e.g. Abdul Wahid"
                                                    className="text-sm"
                                                />
                                                <InputGroupAddon>
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                </InputGroupAddon>
                                            </InputGroup>
                                            <FieldError errors={[fieldState.error]} />
                                        </Field>
                                    )}
                                />

                                {/* Profile Photo (ImgBB Upload) */}
                                <Controller
                                    name="image"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-image-input">Profile Photo</FieldLabel>
                                            <div className="mt-1.5 flex items-center gap-4 rounded-xl border border-dashed border-border/80 bg-muted/30 p-3">
                                                <div className="group relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-inner">
                                                    {previewUrl ? (
                                                        <>
                                                            <Image
                                                                src={previewUrl}
                                                                alt="Profile Preview"
                                                                width={100}
                                                                height={100}
                                                                className="h-full w-full object-cover"
                                                            />
                                                            {isUploadingImg ? (
                                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/70 backdrop-blur-[1px]">
                                                                    <Spinner className="h-4 w-4 text-primary" />
                                                                    <span className="text-[10px] font-medium text-foreground">
                                                                        Uploading...
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveImage(field.onChange)}
                                                                    aria-label="Remove image"
                                                                    className="absolute top-1 right-1 rounded-full bg-background/80 p-1 text-muted-foreground shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <ImageIcon className="h-5 w-5 stroke-1" />
                                                            <span className="mt-1 text-[10px] tracking-tight">No image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <input
                                                        type="file"
                                                        id="form-image-input"
                                                        ref={fileInputRef}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageFileChange(e, field.onChange)}
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={isUploadingImg || isSubmitting}
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className="h-9 gap-1.5 text-xs font-medium"
                                                        >
                                                            <UploadCloud className="h-3.5 w-3.5" />
                                                            <span>{previewUrl ? 'Change photo' : 'Upload photo'}</span>
                                                        </Button>
                                                        {previewUrl && !isUploadingImg && (
                                                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                                Ready
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="mt-1.5 text-xs text-muted-foreground">
                                                        JPG, PNG, or WEBP up to 5MB.
                                                    </p>
                                                </div>
                                            </div>
                                            <FieldError errors={[fieldState.error]} />
                                        </Field>
                                    )}
                                />

                                {/* Email */}
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-email">Email</FieldLabel>
                                            <InputGroup className="h-10">
                                                <InputGroupInput
                                                    {...field}
                                                    id="form-email"
                                                    aria-invalid={fieldState.invalid}
                                                    autoComplete="email"
                                                    type="text"
                                                    placeholder="user@example.com"
                                                    className="text-sm"
                                                />
                                                <InputGroupAddon>
                                                    <MailIcon className="h-4 w-4 text-muted-foreground" />
                                                </InputGroupAddon>
                                            </InputGroup>
                                            <FieldError errors={[fieldState.error]} />
                                        </Field>
                                    )}
                                />

                                {/* Passwords */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-password">Password</FieldLabel>
                                                <InputGroup className="h-10">
                                                    <InputGroupInput
                                                        {...field}
                                                        id="form-password"
                                                        aria-invalid={fieldState.invalid}
                                                        autoComplete="new-password"
                                                        type={isVisiPass ? 'text' : 'password'}
                                                        placeholder="••••••••"
                                                        className="text-sm"
                                                    />
                                                    <InputGroupAddon
                                                        align="inline-end"
                                                        onClick={toggleEye}
                                                        className="cursor-pointer"
                                                    >
                                                        {isVisiPass ? (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="confirmPassword"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-confirmPassword">Confirm Password</FieldLabel>
                                                <InputGroup className="h-10">
                                                    <InputGroupInput
                                                        {...field}
                                                        id="form-confirmPassword"
                                                        aria-invalid={fieldState.invalid}
                                                        autoComplete="new-password"
                                                        type={isVisiPass ? 'text' : 'password'}
                                                        placeholder="••••••••"
                                                        className="text-sm"
                                                    />
                                                    <InputGroupAddon
                                                        align="inline-end"
                                                        onClick={toggleEye}
                                                        className="cursor-pointer"
                                                    >
                                                        {isVisiPass ? (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                <FieldError errors={[fieldState.error]} />
                                            </Field>
                                        )}
                                    />
                                </div>
                            </FieldGroup>
                        </form>
                    </CardContent>

                    <CardFooter className="mt-6 mb-10 flex flex-col items-center p-0 bg-card">
                        <Button
                            type="submit"
                            form="form-user"
                            className="h-11 w-full text-xs sm:text-sm font-semibold shadow-sm hover:bg-primary/90"
                            disabled={isAnyLoading}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner className="mr-2 h-4 w-4" />
                                    <span>Creating your account...</span>
                                </>
                            ) : (
                                <span>Join BookNook</span>
                            )}
                        </Button>

                        <p className="mt-4  text-muted-foreground">
                            Already part of our community?{' '}
                            <Link
                                href={
                                    callbackUrl !== '/'
                                        ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`
                                        : '/sign-in'
                                }
                                className="font-semibold text-primary hover:underline"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Info Column */}
                <Card className="h-fit w-full rounded-2xl border border-secondary/60 bg-secondary/35 p-6 shadow-none sm:p-8 lg:max-w-md">
                    <CardHeader className="p-0 pb-6">
                        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            How our community library works.
                        </h2>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            A shared bookshelf built entirely on neighbor trust and the joy of passed-on stories.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 p-0">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                <HandHelping className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                                    Borrow for free
                                </h3>
                                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                                    Pick any book marked available and take a few days to read at your own pace.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                <UsersRoundCollaboration className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                                    Share from your collection
                                </h3>
                                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                                    Pass on favorites gathering dust on your shelf so others can fall in love with them.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                <CornerDownLeft className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                                    Gentle returns
                                </h3>
                                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                                    No late fees or penalties. Just return when you finish so the story keeps travelling.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignUpContent;