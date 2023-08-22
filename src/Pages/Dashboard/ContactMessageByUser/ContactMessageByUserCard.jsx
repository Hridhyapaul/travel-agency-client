import React from 'react';

const ContactMessageByUserCard = ({ message }) => {
    const { userName, userEmail, userMessage, date, userPhone } = message;
    console.log(userMessage)

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const localDate = new Date(date).toLocaleString('en-US', options);
    return (
        <div className='font-body'>
            <p>Date: {localDate}</p>
            <br />
            <p>Hi there,</p>
            <p>{userMessage}</p>
            <br />
            <p>Looking forward to your response!</p>
            <br />
            <p>Best regards,</p>
            <p>{[userName]}</p>
            <p>{[userEmail]}</p>
            <p>{[userPhone]}</p>
        </div>
    );
};

export default ContactMessageByUserCard;