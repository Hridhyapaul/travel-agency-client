import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReviewInput = ({ destinationId, refetch }) => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const [number, setNumber] = useState(0);
    const { user } = useAuth();
    console.log(destinationId)

    const handleText = () => {
        switch (number) {
            case 0:
                return "Evaluate";
            case 1:
                return "Not Satisfactory";
            case 2:
                return "Below Expectations";
            case 3:
                return "Average";
            case 4:
                return "Satisfactory";
            case 5:
                return "Excellent";
            default:
                return "Evaluate"
        }
    }

    const onSubmit = async data => {
        // console.log(data)
        console.log("Rating:", number);
        console.log("Feedback:", handleText());
        console.log("Comment:", data.comment);
        console.log("User:", user.displayName);

        const newReviews = { reviewerName: user.displayName, rating: number, reviewText: data.comment, feedback: handleText(), date: new Date() }
        console.log(newReviews)
        console.log("destinationId:", destinationId);
        console.log("URL:", `/destinations/${destinationId}/addReview`);

        try {
            const res = await axios.post(`https://trevel-agency-server.vercel.app/destinations/${destinationId}/addReview`, newReviews, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res.data)

            if (res.data.modifiedCount > 0) {
                reset();
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Review Submitted',
                    text: 'You have successfully submitted your review!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-center mb-6'>Provide Your Feedback</h1>
            <div className='bg-white rounded-lg shadow-lg px-10 py-6'>
                <p className='text-center text-xl font-semibold'>{handleText()}</p>
                <div className='flex justify-center items-center mt-4'>
                    {Array(5).fill().map((_, index) =>
                        number >= index + 1 ? (
                            <AiFillStar
                                key={index}
                                className='text-[#f59e0b] text-xl'
                                onClick={() => setNumber(index + 1)}
                            ></AiFillStar>
                        ) : (
                            <AiOutlineStar
                                key={index}
                                className='text-[#f59e0b] text-xl'
                                onClick={() => setNumber(index + 1)}
                            ></AiOutlineStar>
                        ))}
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <textarea
                            {...register("comment", { required: true })}
                            placeholder="What's your feedback"
                            className="w-full mt-4 py-2 px-4 border-2 rounded-lg border-base-400 focus:outline-none  focus:border-designColor"
                            rows={6}
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-designColor text-white rounded-lg py-2 px-4 font-semibold duration-300 mt-5 mb-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewInput;