import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import BookForm from './BookForm';

const AddBookFormUser = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    const user = session.user

    return (
        <BookForm user={user} />
    );
};

export default AddBookFormUser;