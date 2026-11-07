import { auth } from '@/lib/auth';
import { useSession } from '@/lib/auth-client';
import { User } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const ProfileNote = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session.user

    return (
        <div className="flex items-start gap-3 px-2 text-xs text-muted-foreground">
            <User className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
            <p className="leading-relaxed">
                Sharing as <span className="font-medium text-foreground">{user.name}</span>. You can edit or remove your books from{" "}
                <Link href="/my-books" className="underline hover:text-foreground">
                    My Books
                </Link>

            </p>
        </div>
    );
};

export default ProfileNote;