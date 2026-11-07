import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/auth';
import { useSession } from '@/lib/auth-client';
import { User } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const ProfileNoteSkeleton =  () => {

        return (
            <div className="flex items-start gap-3 px-2">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded-full" />

                {/* Two-line text block placeholder */}
                <div className="flex-1 space-y-1.5 pt-0.5">
                    <Skeleton className="h-3.5 w-full max-w-[260px]" />
                    <Skeleton className="h-3.5 w-3/4 max-w-[190px]" />
                </div>
            </div>
        );
};

export default ProfileNoteSkeleton;