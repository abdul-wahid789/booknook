import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const BookDetailsSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left Column: Book Skeleton */}
                <div className="flex flex-col items-center justify-center bg-[#f4ece3] p-10 sm:p-14 md:col-span-5 dark:bg-[#182126]">
                    {/* Book Cover Container with 2/3 Aspect Ratio */}
                    <div className="relative aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-xs shadow-[0_20px_35px_-10px_rgba(0,0,0,0.35),0_8px_16px_-4px_rgba(0,0,0,0.18)]">
                        <Skeleton className="h-full w-full rounded-none" />
                    </div>

                    {/* Under-cover Quote Skeleton */}
                    <Skeleton className="mt-8 h-3 w-40" />
                </div>

                {/* Right Column: Book Details & Actions Skeleton */}
                <div className="flex flex-col justify-between p-8 sm:p-12 md:col-span-7">
                    <div className="space-y-6">
                        {/* Category & Availability Badges */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-5 w-28 rounded-sm" />
                        </div>

                        {/* Title & Author */}
                        <div className="space-y-2">
                            <Skeleton className="h-9 w-3/4 sm:h-11 lg:h-12" />
                            <div className="flex items-center gap-1.5 pt-1">
                                <Skeleton className="h-4 w-6" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-3 pt-2">
                            <Skeleton className="h-3 w-24" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-[92%]" />
                                <Skeleton className="h-4 w-[85%]" />
                                <Skeleton className="h-4 w-[40%]" />
                            </div>
                        </div>

                        <Separator className="my-6 bg-border/60" />

                        {/* Contributor Row */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3.5 w-36" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="pt-2">
                            <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsSkeleton;