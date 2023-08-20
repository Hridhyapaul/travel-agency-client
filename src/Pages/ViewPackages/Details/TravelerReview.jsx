import React from 'react';
import TravelerReviewCard from './TravelerReviewCard';

const TravelerReview = ({ reviews, name }) => {
    return (
        <div>
            <div className="space-y-4 mt-10">
                <h1 className="text-3xl font-semibold">
                    {reviews.length > 0 ? `Traveler Review for ${name}` : `There are no Reviews for ${name}`}
                </h1>

                {reviews.length > 0 ? (
                    <div className="bg-white px-8 py-8 rounded-lg space-y-8">
                        {reviews?.map((review, index) => (
                            <TravelerReviewCard key={index} review={review} />
                        ))}
                    </div>
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
};

export default TravelerReview;
