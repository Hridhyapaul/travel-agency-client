import usePopularDestination from "../../../Hooks/usePopularDestination";
import Container from "../../../Shared/Container";
import SectionTitle from "../../../Shared/SectionTitle";
import PopularPackageCard from "./PopularPackageCard";

const PopularPackage = () => {
    const [destinations] = usePopularDestination();
    console.log(destinations)

    return (
        <div className="my-24">
            <Container>
                <div>
                    <SectionTitle headers='Packages in Popular Destinations' subHeader='Modern & Beautiful'></SectionTitle>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    {
                        destinations.map((destination,index) =>
                            <PopularPackageCard
                                key={destination._id}
                                destination={destination}
                                isLarge={index === 0}
                            >

                            </PopularPackageCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default PopularPackage;