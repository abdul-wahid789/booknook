'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaGithub, FaGoogle } from "react-icons/fa";
import {

    CornerDownLeft,
    Eye,
    EyeOffIcon,
    MailIcon,
    UsersRoundCollaboration,
    Zap,
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
import { signIn } from '@/lib/auth-client';
import { errorToast, successToast } from '@/lib/toasts';

const signInSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
});

type TSignIn = z.infer<typeof signInSchema>;

const SignInContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const rawCallback = searchParams.get('callbackUrl');
    const callbackUrl = rawCallback ? decodeURIComponent(rawCallback) : '/all-books';


    const [isVisiPass, setIsVisiPass] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [isPending, startTransition] = useTransition();
    const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

    const header = {
        smallTitle: 'WELCOME BACK TO THE SHELF',
        heading: 'Pick up where you left off.',
        description:
            'Sign in to check your borrowed stories, manage shared copies, or discover a new read.',
    };

    const form = useForm<TSignIn>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const toggleEye = () => setIsVisiPass((prev) => !prev);

    async function handleSocialSignIn(provider: 'google' | 'github') {
        try {
            setSocialLoading(provider);
            await signIn.social({
                provider,
                callbackURL: callbackUrl,
            });
        } catch (err: unknown) {
            console.error(err);
            errorToast(err instanceof Error ? err.message : `Failed to connect with ${provider}`);
            setSocialLoading(null);
        }
    }

    async function onSubmit(data: TSignIn) {
        try {
            setIsSubmitting(true);
            const { data: res, error } = await signIn.email({
                email: data.email,
                password: data.password,
            });

            if (error) {
                throw new Error(error.message || 'Invalid credentials');
            }

            successToast('Signed in successfully');
            router.refresh();
            router.push(callbackUrl);
            // startTransition(() => {
            //     router.refresh();
            //     router.push(callbackUrl);
            // });
        } catch (err: unknown) {
            console.error(err);
            errorToast(err instanceof Error ? err.message : 'Unable to sign in.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const isAnyLoading = isSubmitting || socialLoading !== null;


    return (
        <div className="w-full">
            <HeaderSection {...header} />

            <div className="mt-8 flex flex-col items-stretch gap-8 lg:flex-row lg:items-start lg:justify-between">
                {/* Main Sign-In Card */}
                <Card className="w-full flex-1 rounded-2xl border border-border/70 bg-card p-6 shadow-2xs sm:p-8 md:p-10">
                    <CardHeader className="flex flex-row items-center justify-between p-0 pb-6">
                        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Sign in
                        </h2>
                        <FieldDescription className="text-xs">Registered members</FieldDescription>
                    </CardHeader>

                    <FieldSeparator />

                    <CardContent className="space-y-6 p-0 pt-6">
                        {/* Social Authentication Buttons */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isAnyLoading}
                                onClick={() => handleSocialSignIn('google')}
                                className="h-10 w-full gap-2 border-border bg-card text-xs font-medium text-foreground hover:bg-muted"
                            >
                                {socialLoading === 'google' ? (
                                    <Spinner className="h-4 w-4" />
                                ) : (
                                    <FaGoogle className="h-4 w-4 text-primary" />
                                )}
                                <span>Continue with Google</span>
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={isAnyLoading}
                                onClick={() => handleSocialSignIn('github')}
                                className="h-10 w-full gap-2 border-border bg-card text-xs font-medium text-foreground hover:bg-muted"
                            >
                                {socialLoading === 'github' ? (
                                    <Spinner className="h-4 w-4" />
                                ) : (
                                    <FaGithub className="h-4 w-4 text-foreground" />
                                )}
                                <span>Continue with GitHub</span>
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/70" />
                            </div>
                            <span className="relative bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                                Or continue with email
                            </span>
                        </div>

                        {/* Email Form */}
                        <form
                            id="form-signin"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FieldGroup className="space-y-4">
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

                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <div className="flex items-center justify-between">
                                                <FieldLabel htmlFor="form-password">Password</FieldLabel>
                                                <Link
                                                    href="/forgot-password"
                                                    className="text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <InputGroup className="h-10">
                                                <InputGroupInput
                                                    {...field}
                                                    id="form-password"
                                                    aria-invalid={fieldState.invalid}
                                                    autoComplete="current-password"
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
                            </FieldGroup>
                        </form>
                    </CardContent>

                    <CardFooter className="mt-6 mb-10 bg-card flex flex-col items-center p-0">
                        <Button
                            type="submit"
                            form="form-signin"
                            className="h-11 w-full text-xs font-semibold shadow-sm hover:bg-primary/90 sm:text-sm"
                            disabled={isAnyLoading}
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner className="mr-2 h-4 w-4" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign In with Email</span>
                            )}
                        </Button>

                        <p className="mt-4 text-muted-foreground">
                            New to the shared shelf?{' '}
                            <Link
                                href={
                                    callbackUrl !== '/all-books'
                                        ? `/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`
                                        : '/sign-up'
                                }
                                className="font-semibold text-primary hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                {/* Info Side Card */}
                <Card className="h-fit w-full rounded-2xl border border-secondary/60 bg-secondary/35 p-6 shadow-none sm:p-8 lg:max-w-md">
                    <CardHeader className="p-0 pb-6">
                        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            Your corner awaits.
                        </h2>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                            Once signed in, your borrowing schedule and shared stories are always kept in sync.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 p-0">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                                    Instant shelf access
                                </h3>
                                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                                    Borrow any available book with one click directly from the community catalog.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                <UsersRoundCollaboration className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                                    Manage your contributions
                                </h3>
                                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                                    Update descriptions, replace covers, or remove copies you have contributed.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                                <CornerDownLeft className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-foreground sm:text-sm">
                                    Track returns easily
                                </h3>
                                <p className="mt-1 text-xs leading-normal text-muted-foreground">
                                    Check your return dates at a glance and return books early whenever you are ready.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SignInContent;