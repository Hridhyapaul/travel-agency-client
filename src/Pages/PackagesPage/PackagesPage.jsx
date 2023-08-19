import React from 'react';
import worldTour from "../../assets/Images/Worldtour.jpg"

const PackagesPage = () => {
    return (
        <div>
            <div className="relative">
                <img className="w-full h-[500px] object-cover object-left" src={worldTour} alt="" />
                <div className="w-full h-[500px] inset-0 bg-black bg-opacity-30 absolute"></div>
                <p className="text-6xl font-semibold text-white font-body absolute left-1/2 top-1/2 translate-x-[-50%]">World Packages</p>
            </div>
        </div>
    );
};

export default PackagesPage;