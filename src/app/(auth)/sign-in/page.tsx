'use client';

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
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BookOpen,
  CornerDownLeft,
  Eye,
  EyeOffIcon,
  HandHelping,
  MailIcon,
  UsersRoundCollaboration,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type TSignIn = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const router = useRouter();
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
      router.push('/books');
    } catch (err: unknown) {
      console.error(err);
      errorToast(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <HeaderSection {...header} />

        <div className="flex flex-col lg:flex-row justify-between mt-8">
          {/* Main Sign-In Card */}
            <Card className="max-w-xl p-6 md:p-10 flex-1">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <h2 className="font-heading text-3xl font-bold">Sign in</h2>
              <FieldDescription>Registered members</FieldDescription>
            </CardHeader>
            <FieldSeparator />

            <CardContent className="pt-6">
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
                            className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors"
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
                          />
                          <InputGroupAddon
                            align="inline-end"
                            onClick={toggleEye}
                            className="cursor-pointer"
                          >
                            {isVisiPass ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOffIcon className="h-4 w-4" />
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

            <CardFooter className="mt-4 flex flex-col items-center">
              <Button
                type="submit"
                form="form-signin"
                className="w-full h-11 text-sm font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                New to the shared shelf?{' '}
                <Link
                  href="/sign-up"
                  className="text-primary font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Info Side Card */}
          <Card className="bg-muted/60 border-none h-fit p-6 md:p-8 w-full lg:max-w-md shadow-none">
            <CardHeader className="p-0 pb-6">
              <h2 className="text-2xl font-heading font-semibold">
                Your corner awaits.
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Once signed in, your borrowing schedule and shared stories are always kept in sync.
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="flex gap-4 items-start">
                <Zap className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Instant shelf access</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    Borrow any available book with one click directly from the community catalog.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <UsersRoundCollaboration className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Manage your contributions</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    Update descriptions, replace covers, or remove copies you have contributed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CornerDownLeft className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Track returns easily</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    Check your return dates at a glance and return books early whenever you are ready.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;