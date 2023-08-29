import React from 'react';
import PackagesPageCard from './PackagesPageCard';
import useAccommodation from '../../Hooks/useAccommodation';
import Container from '../../Shared/Container';
import Loading from '../../Shared/Loading';
import { Helmet } from 'react-helmet-async';

const PackagesPage = () => {
    const [accommodations, accommodationLoading,] = useAccommodation();
    console.log(accommodations)

    if(accommodationLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>Travel.O | Packages</title>
            </Helmet>
            <div className="relative">
                <img className="w-full lg:h-[500px] h-[300px] object-cover object-left" src="https://i.ibb.co/ZH8hRNz/datingscout-KFh-z-LMw-IU-unsplash.jpg" alt="" />
                <div className="w-full lg:h-[500px] h-[300px] inset-0 bg-black bg-opacity-50 absolute"></div>
                <p className="lg:text-6xl text-2xl text-center font-semibold text-white font-body absolute left-1/2 top-1/2 translate-x-[-50%]">World Packages</p>
            </div>
            <div className='my-10'>
                <Container>
                    <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-4">
                        {
                            accommodations.map((accommodation, index) =>
                                <PackagesPageCard
                                    key={accommodation._id}
                                    accommodation={accommodation}
                                    isLarge={index === 0}
                                >

                                </PackagesPageCard>)
                        }
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default PackagesPage;