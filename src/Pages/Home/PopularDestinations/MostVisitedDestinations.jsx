import React from 'react';
import useMostVisitedDestinations from '../../../Hooks/useMostVisitedDestinations';
import Container from '../../../Shared/Container';
import SectionTitle from '../../../Shared/SectionTitle';

const MostVisitedDestinations = () => {
    const [popularDestinations, loading, refetch] = useMostVisitedDestinations();
    console.log(popularDestinations)
    return (
        <div className="my-24">
            <Container>
                <div>
                    <SectionTitle headers='Popular Travel Hotspots' subHeader='Explore the Trendiest Destinations'></SectionTitle>
                </div>
            </Container>
        </div>
    );
};

export default MostVisitedDestinations;