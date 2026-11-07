import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditBookSkeleton() {
  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Heading Skeleton */}
      <div className="space-y-3">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <span className="text-border">/</span>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Small uppercase tag */}
        <Skeleton className="h-3 w-48" />

        {/* Main Heading */}
        <Skeleton className="h-10 w-full max-w-md sm:h-12" />

        {/* Subtitle Description */}
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Form Card Skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-2xs sm:p-9 lg:col-span-8">
          <div className="space-y-7">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-5">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>

            <div className="space-y-6">
              {/* Row 1: Title & Author */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>

              {/* Row 2: Category */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-3 w-3/4 max-w-sm" />
              </div>

              {/* Row 3: Book Image Uploader Area */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3.5">
                    {/* Thumbnail Skeleton */}
                    <Skeleton className="aspect-[2/3] h-16 w-11 shrink-0 rounded-xs" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                  {/* Upload Button */}
                  <Skeleton className="h-9 w-32 rounded-md" />
                </div>
                <Skeleton className="h-3 w-64" />
              </div>

              {/* Row 4: Short Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-28 w-full rounded-md" />
              </div>

              {/* Read-Only Account Metadata */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3.5 w-72" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-14" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
              <Skeleton className="h-4 w-40" />

              <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tips & User Metadata Sidebar */}
        <div className="space-y-6 lg:col-span-4">
          {/* Helpful Tips Card */}
          <div className="rounded-2xl border border-secondary/60 bg-secondary/35 p-6 shadow-2xs sm:p-7 space-y-4">
            <Skeleton className="h-7 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3.5 w-48" />
              </div>

              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3.5 w-52" />
              </div>

              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3.5 w-44" />
              </div>
            </div>
          </div>

          {/* User Sign-in Footnote */}
          <div className="flex items-start gap-3 px-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}