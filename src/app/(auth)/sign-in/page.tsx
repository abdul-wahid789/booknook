'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read callbackUrl from search parameters, default to /all-books
  const callbackUrl = searchParams.get('callbackUrl') || '/all-books';

  const [isVisiPass, setIsVisiPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Redirect to the intended page (e.g. book-details or my-books)
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      console.error(err);
      errorToast(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  }

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

          <CardContent className="p-0 pt-6">
            <form
              id="form-signin"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FieldGroup className="space-y-4">
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
                          type="email"
                          placeholder="wahid@domain.com"
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

                {/* Password */}
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

          <CardFooter className="mt-6 flex flex-col items-center p-0">
            <Button
              type="submit"
              form="form-signin"
              className="h-11 w-full text-xs sm:text-sm font-semibold shadow-sm hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  <span>Please wait...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              New to the shared shelf?{' '}
              <Link
                href={
                  callbackUrl !== '/all-books'
                    ? `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`
                    : '/signup'
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
                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
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
                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
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
                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
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
}

export default function SignInPage() {
  return (
    <main className="w-full bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Spinner className="h-6 w-6 text-primary" />
            </div>
          }
        >
          <SignInContent />
        </Suspense>
      </div>
    </main>
  );
}