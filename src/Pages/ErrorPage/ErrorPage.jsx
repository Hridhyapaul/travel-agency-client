import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import img from '../../assets/Images/Error.jpg';

const ErrorPage = () => {
    const { error, status } = useRouteError()
    return (
        <div>
            <div className='my-10'>
                <img className='w-[35%] mx-auto' src={img} alt="" />
                <section className='flex justify-center items-center '>
                    <div >
                        <h2 className='text-5xl text-center font-semibold'>
                            {error?.message}
                        </h2>
                        <div className='flex justify-center'>
                            <Link to='/'><button className='bg-designColor text-[white] py-3 px-4 font-semibold rounded-md mt-5'>Back to Homepage</button></Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ErrorPage;