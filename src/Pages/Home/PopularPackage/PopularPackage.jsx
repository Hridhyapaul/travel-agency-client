import useAccommodation from "../../../Hooks/useAccommodation";
import Container from "../../../Shared/Container";
import Loading from "../../../Shared/Loading";
import SectionTitle from "../../../Shared/SectionTitle";
import PopularPackageCard from "./PopularPackageCard";

const PopularPackage = () => {
    const [accommodations, accommodationLoading, ] = useAccommodation();
    console.log(accommodations)

    if (accommodationLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="mt-24 mb-28">
            <Container>
                <div>
                    <SectionTitle headers='Packages in Popular Destinations' subHeader='Modern & Beautiful'></SectionTitle>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    {
                        accommodations.slice(0, 5).map((accommodation, index) =>
                            <PopularPackageCard
                                key={accommodation._id}
                                accommodation={accommodation}
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