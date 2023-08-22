import React from 'react';
import useAllContactMessages from '../../../Hooks/useAllContactMessages';
import AllContactMessagesCard from './AllContactMessagesCard';

const AllContactMessages = () => {
    const [allContactMessages, refetch, MessagesLoading] = useAllContactMessages();
    console.log(allContactMessages)
    return (
        <div className='my-20'>
            <h1 className='text-4xl font-body font-semibold text-center pb-4'>All Contact Messages</h1>

            <div>
                {
                    allContactMessages.map((message, index) => (
                        <div className='bg-white px-6 py-6 mt-5'>
                            <div key={index} className='bg-white w-[700px] px-4 py-2 rounded-lg'>
                                <AllContactMessagesCard message={message}></AllContactMessagesCard>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllContactMessages;