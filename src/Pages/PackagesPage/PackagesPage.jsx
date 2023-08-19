import React from 'react';
import PackagesPageCard from './PackagesPageCard';
import useAccommodation from '../../Hooks/useAccommodation';
import Container from '../../Shared/Container';
import Loading from '../../Shared/Loading';

const PackagesPage = () => {
    const [accommodations, accommodationLoading,] = useAccommodation();
    console.log(accommodations)

    if(accommodationLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="relative">
                <img className="w-full h-[500px] object-cover object-left" src="https://i.ibb.co/ZH8hRNz/datingscout-KFh-z-LMw-IU-unsplash.jpg" alt="" />
                <div className="w-full h-[500px] inset-0 bg-black bg-opacity-50 absolute"></div>
                <p className="text-6xl font-semibold text-white font-body absolute left-1/2 top-1/2 translate-x-[-50%]">World Packages</p>
            </div>
            <div className='mt-10'>
                <Container>
                    <div className="grid grid-cols-3 gap-8">
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