import React from 'react';
import useMostVisitedDestinations from '../../../Hooks/useMostVisitedDestinations';
import Container from '../../../Shared/Container';
import SectionTitle from '../../../Shared/SectionTitle';
import MostVisitedDestinationsCard from './MostVisitedDestinationsCard';

const MostVisitedDestinations = () => {
    const [popularDestinations, loading, refetch] = useMostVisitedDestinations();
    console.log(popularDestinations)
    return (
        <div className="bg-base-200 lg:py-24 py-10">
            <Container>
                <div>
                    <SectionTitle headers='Popular Travel Hotspots' subHeader='Explore the Trendiest Destinations'></SectionTitle>
                </div>

                <div className="lg:grid grid-cols-3 gap-8 lg:space-y-0 space-y-4">
                    {
                        popularDestinations.slice(0, 6).map((place, index) =>
                            <MostVisitedDestinationsCard
                                key={place._id}
                                place={place}
                            >
                            </MostVisitedDestinationsCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default MostVisitedDestinations;