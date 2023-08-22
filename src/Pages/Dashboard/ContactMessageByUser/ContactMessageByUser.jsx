import React from 'react';
import useUsersContactMessage from '../../../Hooks/useUsersContactMessage';

const ContactMessageByUser = () => {
    const [userMessageCollection, refetch, loading] = useUsersContactMessage();
    console.log(userMessageCollection)
    return (
        <div className='my-20'>
            <h1 className='text-4xl font-body font-semibold text-center pb-4'>Your Contact Messages</h1>
        </div>
    );
};

export default ContactMessageByUser;