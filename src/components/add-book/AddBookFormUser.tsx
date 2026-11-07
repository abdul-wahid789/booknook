import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import BookForm from './BookForm';
import Retry from '../shared/Retry';

const AddBookFormUser = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) return <Retry msg={'Session error'} />
    const user = session.user

    return (
        <BookForm user={user} />
    );
};

export default AddBookFormUser;