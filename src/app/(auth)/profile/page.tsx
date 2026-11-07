import React from 'react';
import { Metadata } from "next";
import ProfileForm from './_components/ProfileForm';

export const metadata: Metadata = {
    title: "Profile Settings | BookNook",
    description: "Update your profile details and community identity on BookNook.",
};

const ProfileEditPage = () => {
    return (
        <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <ProfileForm />
            </div>
        </div>
    );
};

export default ProfileEditPage;