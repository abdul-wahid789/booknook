import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function BookFormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-6">
                {/* Row 1: Title & Author */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-11 w-full rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-11 w-full rounded-md" />
                    </div>
                </div>

                {/* Row 2: Category & Total Copies */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-11 w-full rounded-md" />
                        <Skeleton className="h-3 w-3/4 max-w-sm" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-11 w-full rounded-md" />
                    </div>
                </div>

                {/* Row 3: Book Image Dropzone Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-background/50 py-8 text-center">
                        {/* Upload Icon Skeleton */}
                        <Skeleton className="mb-2 h-7 w-7 rounded-md" />
                        {/* Drag & drop instructions */}
                        <Skeleton className="h-4 w-52" />
                        <Skeleton className="mt-2 h-3 w-40" />
                    </div>
                    <Skeleton className="h-3 w-64" />
                </div>

                {/* Row 4: Short Description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-28 w-full rounded-md" />
                </div>

                {/* Read-Only Signed-In User Metadata */}
                <div className="pt-2 space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-3.5 w-72" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-11 w-full rounded-md" />
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-6 bg-border/60" />

            {/* Form Bottom Actions */}
            <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <Skeleton className="h-4 w-72" />

                <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                    <Skeleton className="h-10 w-20 rounded-md" />
                    <Skeleton className="h-10 w-28 rounded-md" />
                </div>
            </div>
        </div>
    );
}