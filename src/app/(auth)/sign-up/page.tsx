'use client'

import HeaderSection from '@/components/shared/HeaderSection';
import { successToast } from '@/lib/toasts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { signUp } from '@/lib/auth-client';
import { uploadToImgBB } from '@/lib/uploadImage';
import { TUser, userSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { CornerDownLeft, Eye, EyeOffIcon, HandHelping, ImageIcon, MailIcon, UploadCloud, User, UsersRoundCollaboration, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SignUpPage = () => {
  const [isVisiPass, setIsVisiPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const header = {
    smallTitle: 'A SEAT AT THE COMMUNITY TABLE',
    heading: 'Begin your reading chapter.',
    description: 'Join neighbors and fellow book lovers sharing stories from their personal shelves',
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

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      const { data: res, error } = await signUp.email(userData);
      if (error) throw new Error(error.message);
      successToast('Registration successful');
      console.log('User registered:', res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="w-full">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <HeaderSection {...header} />
        <div className="flex flex-col lg:flex-row gap-8 justify-between mt-8">
          <Card className="max-w-2xl p-6 md:p-10 flex-1">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <h2 className="font-heading text-3xl font-bold">Create account</h2>
              <FieldDescription>Free community membership</FieldDescription>
            </CardHeader>
            <FieldSeparator />
            <CardContent className="pt-6">
              <form id="form-user" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            placeholder="eg. Abdul Wahid"
                          />
                          <InputGroupAddon>
                            <User className="h-4 w-4 text-muted-foreground" />
                          </InputGroupAddon>
                        </InputGroup>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  {/* Profile Image with Visual Preview Box */}
                  <Controller
                    name="image"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-image-input">Profile Photo</FieldLabel>
                        <div className="flex items-center gap-4 mt-1.5 p-3 rounded-xl border border-dashed border-border/80 bg-muted/30">
                          {/* Image Preview Box */}
                          <div className="relative group w-18 h-18 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border border-border shadow-inner bg-card flex items-center justify-center">
                            {previewUrl ? (
                              <>
                                <Image
                                  src={previewUrl}
                                  alt="Profile Preview"
                                  width={150}
                                  height={150}
                                  className="w-full h-full object-cover"
                                />
                                {isUploadingImg ? (
                                  <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1">
                                    <Spinner className="h-4 w-4" />
                                    <span className="text-[10px] font-medium text-foreground">Uploading...</span>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(field.onChange)}
                                    aria-label="Remove image"
                                    className="absolute top-1 right-1 p-1 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-sm opacity-90 group-hover:opacity-100"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-muted-foreground">
                                <ImageIcon className="h-6 w-6 stroke-1" />
                                <span className="text-[10px] mt-1 tracking-tight">No image</span>
                              </div>
                            )}
                          </div>

                          {/* Image Upload Input & Instructions */}
                          <div className="flex-1 min-w-0">
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
                                disabled={isUploadingImg}
                                onClick={() => fileInputRef.current?.click()}
                                className="h-9 gap-1.5 text-xs font-medium cursor-pointer"
                              >
                                <UploadCloud className="h-3.5 w-3.5" />
                                {previewUrl ? 'Change image' : 'Choose file'}
                              </Button>
                              {previewUrl && !isUploadingImg && (
                                <span className="text-xs text-emerald-600 font-medium">Ready</span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1.5">
                              JPG, PNG, or WEBP up to 5MB. Hosted securely on ImgBB.
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

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              placeholder="Name@wahid123"
                            />
                            <InputGroupAddon
                              align="inline-end"
                              onClick={toggleEye}
                              className="cursor-pointer"
                            >
                              {isVisiPass ? <Eye className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
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
                              placeholder="Name@wahid123"
                            />
                            <InputGroupAddon
                              align="inline-end"
                              onClick={toggleEye}
                              className="cursor-pointer"
                            >
                              {isVisiPass ? <Eye className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
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

            <CardFooter className="mt-4 flex flex-col items-center">
              <Button
                type="submit"
                form="form-user"
                className="w-full h-11 text-sm font-semibold"
                disabled={isSubmitting || isUploadingImg}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <span>Join BookNook</span>
                )}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                Already part of our community?{' '}
                <Link href="/sign-in" className="text-primary font-semibold hover:underline">
                  Sign in here
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Info Side Card */}
          <Card className="bg-muted/60 border-none h-fit p-6 md:p-8 w-full lg:max-w-md shadow-none">
            <CardHeader className="p-0 pb-6">
              <h2 className="text-2xl font-heading font-semibold">How our community library works.</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                A shared bookshelf built entirely on neighbor trust and the joy of passed-on stories.
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="flex gap-4 items-start">
                <HandHelping className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Borrow for free</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    Pick any book marked available and take a few days to read at your own pace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <UsersRoundCollaboration className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Share from your collection</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    Pass on favorites gathering dust on your shelf so others can fall in love with them.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CornerDownLeft className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold">Gentle returns</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-normal">
                    No late fees or penalties. Just return when you finish so the story keeps travelling.
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

export default SignUpPage;