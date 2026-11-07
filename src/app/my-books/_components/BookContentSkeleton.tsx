import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Check, Loader2 } from 'lucide-react';
import React from 'react';

const BookContentSkeleton = () => {
    return (
        <div className='space-y-5'>
            {/* my books */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">

                    <span className="inline-flex items-center gap-1 rounded-sm border border-secondary/40 bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        <Skeleton className="h-5 w-15 rounded-md" />
                    </span>
                </div>
                <div className="text-xs text-muted-foreground">
                    <Skeleton className="h-5 w-10 rounded-md" />

                </div>
            </div>
            {/* Shared Books Table Container */}
            <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                <th className="py-3.5 px-4 sm:px-6">Book / Author</th>
                                <th className="hidden py-3.5 px-4 md:table-cell">Category</th>
                                <th className="hidden py-3.5 px-4 md:table-cell">Date Added</th>
                                <th className="hidden py-3.5 px-4 md:table-cell">Copies / Status</th>
                                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border/60 text-xs">

                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-12 text-center text-muted-foreground"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner className="h-4 w-4" />
                                        <span>Gathering your books...</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
        </div>
    );
};

export default BookContentSkeleton;