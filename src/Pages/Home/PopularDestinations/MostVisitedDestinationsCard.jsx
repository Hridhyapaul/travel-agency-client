import React from 'react';
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const MostVisitedDestinationsCard = ({ place }) => {
    console.log(place)
    const { _id, about, image, name, countryName, numberOfDay, price, reviews } = place;

    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews?.length;

    const customStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#ECEEEF',
    };

    return (
        <div className="col-span-1">
            <div className="shadow-md rounded-lg">
                <div>
                    {image && image[0] ? (
                        <img className="h-[200px] w-full object-cover rounded-t-lg" src={image[0]} alt="" />
                    ) : (
                        <div className="h-[200px] w-full bg-gray-300 rounded-t-lg"></div> // Default image or fallback UI
                    )}
                </div>
                <div className="text-bodyColor bg-white rounded-b-lg font-body px-6 py-5 space-y-4">
                    <div className="space-y-[1px]">
                        <div className="flex justify-start items-center gap-2">
                            <Rating
                                style={{ maxWidth: 90 }}
                                value={averageRating}
                                itemStyles={customStyles}
                                readOnly
                                className=""
                            />
                            <p className="text-[14px]">{averageRating.toFixed(1)}</p>
                            <p className="text-[14px]">({reviews.length < 10 ? `0${reviews.length}` : reviews.length} Reviews)</p>
                        </div>
                        <h1 className="lg:text-2xl text-xl lg:font-medium font-semibold">{name}</h1>
                        <p>{about}</p>
                    </div>
                    <div className="bg-bgColor rounded-lg px-4 py-2 flex justify-center items-center">
                        <p className="w-[60%] border-r-2">{countryName}</p>
                        <p className="w-[40%] text-center">0{numberOfDay} Days</p>
                    </div>
                    <div className="">
                        <p><span className="font-medium text-[18px] text-designColor">${price}</span>{" "} / Per person</p>
                    </div>
                    <div>
                        <Link to={`/accommodation/${_id}`}>
                            <button className="px-4 py-2 bg-designColor text-white rounded-lg">See Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostVisitedDestinationsCard;