import React from 'react';
import { Helmet } from 'react-helmet-async';

const Blog = () => {
    return (
        <div>
            <Helmet>
                <title>Travel.O | Blogs</title>
            </Helmet>
            <div className="relative">
                <img className="w-full h-[500px] object-cover object-left" src="https://i.ibb.co/7rdkqmv/thought-catalog-505eect-W54k-unsplash.jpg" alt="" />
                <div className="w-full h-[500px] inset-0 bg-black bg-opacity-70 absolute"></div>
                <div className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-white font-body '>
                    <p className="text-6xl font-semibold text-center">Travel Blog</p>
                    <p className="subTitle text-xl mt-4 text-center">Discover stories from around the world</p>
                </div>
            </div>

            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-6xl font-body font-semibold text-center'>Comming Soon</h1>
            </div>
        </div>

    );
};

export default Blog;