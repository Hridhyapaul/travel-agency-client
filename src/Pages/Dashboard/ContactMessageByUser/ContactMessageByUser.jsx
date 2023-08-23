import React from 'react';
import useUsersContactMessage from '../../../Hooks/useUsersContactMessage';
import ContactMessageByUserCard from './ContactMessageByUserCard';
import Loading from '../../../Shared/Loading';

const ContactMessageByUser = () => {
    const [userMessageCollection, refetch, loading] = useUsersContactMessage();
    console.log(userMessageCollection)

    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className='my-20'>
            <h1 className='text-4xl font-body font-semibold text-center pb-4'>Your Contact Messages</h1>

            <div>
                {
                    userMessageCollection.map((message, index) => (
                        <div className='bg-white px-6 py-6 mt-5'>
                            <div key={index} className='bg-white w-[700px] px-4 py-2 rounded-lg'>
                                <ContactMessageByUserCard message={message}></ContactMessageByUserCard>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ContactMessageByUser;