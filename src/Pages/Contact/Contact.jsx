import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const Contact = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async data => {
        console.log(data)
        if (user && user.email) {
            const contactDetails = {
                userName: data.name,
                userEmail: data.email,
                userPhone: data.phone,
                userMessage: data.message,
                date: new Date()
            }
            console.log(contactDetails)
            try {
                const res = await axios.post('http://localhost:5000/contactMessage', contactDetails, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Message Submitted Successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error('Error sending contact message:', error.message);
            }
        }
        else {
            Swal.fire({
                title: 'Please login to submit your message',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div>
            <div className="relative">
                <img className="w-full h-[500px] object-cover object-left" src="https://i.ibb.co/V9cqGfn/sergey-zolkin-Ue-Y8a-TI6d0-unsplash.jpg" alt="" />
                <div className="w-full h-[500px] inset-0 bg-black bg-opacity-30 absolute"></div>
                <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-white font-body '>
                    <p className="text-6xl font-semibold">Contact Us</p>
                    <p className="text-xl mt-4 text-center">Feel free to drop us a line below</p>
                </div>
            </div>

            <div className="bg-gray-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[700px] mx-auto bg-white p-8 border shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Get in Touch</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Have questions, suggestions, or just want to say hello? Fill out the form below and we'll get back to you.
                    </p>

                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1 font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    {...register("name", { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-1 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    className="w-full p-2 border rounded-md"
                                    {...register("email", { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-1 font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type='tel'
                                    className="w-full p-2 border rounded-md"
                                    {...register("phone", { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-1 font-medium">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full p-2 border rounded-md"
                                    {...register("message", { required: true })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-designColor text-white rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;