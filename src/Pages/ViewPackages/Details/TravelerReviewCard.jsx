import React from 'react';
import { Rating, ThinRoundedStar } from '@smastrom/react-rating';

const TravelerReviewCard = ({ review }) => {

    const { date, feedback, rating, reviewText, reviewerName } = review

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const localDate = new Date(date).toLocaleString('en-US', options);

    const customStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#ECEEEF',
    };

    return (
        <div>
            <div className="bg-bgColor px-6 py-6 rounded-lg space-y-3">
                <div className="bg-white px-4 py-2 rounded-lg flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                        <Rating
                            style={{ maxWidth: 90 }}
                            value={rating}
                            itemStyles={customStyles}
                            readOnly
                            className=""
                        />
                        <p className="text-[14px]">({rating.toFixed(1)})</p>
                    </div>
                    <div>
                        <p className='text-sm'>{localDate}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <h1 className="text-xl font-semibold">{reviewerName}</h1>
                    <p className='bg-bodyColor text-white text-sm px-3 py-1 rounded-lg'>{feedback}</p>
                </div>
                <p>{reviewText}</p>
            </div>
        </div>
    );
};

export default TravelerReviewCard;