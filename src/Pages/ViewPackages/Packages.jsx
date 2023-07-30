import Container from "../../Shared/Container";
import PackagesCard from "./PackagesCard";
import usePackages from "../../Hooks/usePackages";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Packages = () => {

    const { id } = useParams()
    const [packages, refetch, loading] = usePackages({ id });
    console.log(packages)
    const { accommodation, countryImage, country, slogan } = packages;
    console.log(accommodation)

    const [accommodations, setAccommodations] = useState(accommodation)

    const handleFilter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredAccommodations = accommodation.filter((item) => {
            const packageName = item.name.toLowerCase();
            return packageName.includes(searchTerm);
        });
        setAccommodations(filteredAccommodations);
    };

    const handleDurationFilter = (event) => {
        console.log(event.target.value)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="bg-bgColor">
                <div>
                    <img className="w-full h-[400px] object-cover" src={countryImage} alt="" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 h-[400px] flex justify-center items-center">
                        <div>
                            <h1 className="text-5xl text-center font-semibold text-white">{country}</h1>
                            <p className="mt-4 text-2xl text-center font-medium bg-designColor text-white px-4 py-1 rounded-full">{slogan}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pb-20">
                    <Container>
                        <div className="grid grid-cols-6 gap-8">
                            <div className="col-span-2 space-y-8">

                                {/* Search Input */}
                                <div className="font-body bg-white shadow-md px-6 py-6 rounded-lg">
                                    <label className="text-2xl font-semibold">Search Packages</label>
                                    <input
                                        onChange={(event) => handleFilter(event)}
                                        className="h-14 w-full rounded-lg border-2 outline-none border-bgColor pl-4 mt-4 focus:border-designColor"
                                        type="text"
                                        placeholder="Search Package"

                                    />
                                </div>

                                {/* Price Range */}
                                <div className="font-body bg-white shadow-md px-6 py-6 rounded-lg">
                                    <p className="text-2xl font-semibold">Price Range</p>
                                </div>

                                {/* Duration */}
                                <div className="font-body bg-white shadow-md px-6 py-6 rounded-lg">
                                    <p className="text-2xl font-semibold">Duration</p>
                                    <div className="mt-4 space-y-1">
                                        <label className="block w-fit">
                                            <input
                                                type="checkbox"
                                                className="text-designColor"
                                                name="duration"
                                                value="1"
                                                onChange={(event) => handleDurationFilter(event)}
                                            // Add the appropriate onChange handler if needed
                                            />
                                            <span className="ml-2">01 Day</span>
                                        </label>
                                        <label className="block w-fit">
                                            <input
                                                type="checkbox"
                                                className="text-designColor"
                                                name="duration"
                                                value="2"
                                                onChange={(event) => handleDurationFilter(event)}
                                            // Add the appropriate onChange handler if needed
                                            />
                                            <span className="ml-2">02 Days</span>
                                        </label>
                                        <label className="block w-fit">
                                            <input
                                                type="checkbox"
                                                className="text-designColor"
                                                name="duration"
                                                value="3"
                                                onChange={(event) => handleDurationFilter(event)}
                                            // Add the appropriate onChange handler if needed
                                            />
                                            <span className="ml-2">03 Days</span>
                                        </label>
                                        <label className="block w-fit">
                                            <input
                                                type="checkbox"
                                                className="text-designColor"
                                                name="duration"
                                                value="4"
                                                onChange={(event) => handleDurationFilter(event)}
                                            // Add the appropriate onChange handler if needed
                                            />
                                            <span className="ml-2">04 Days</span>
                                        </label>
                                        <label className="block w-fit">
                                            <input
                                                type="checkbox"
                                                className="focus:bg-designColor"
                                                name="duration"
                                                value="5"
                                                onChange={(event) => handleDurationFilter(event)}
                                            // Add the appropriate onChange handler if needed
                                            />
                                            <span className="ml-2">05 Days</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="col-span-4">
                                <div className="bg-white px-4 py-4 rounded-md mb-8 shadow-md">
                                    <h1 className="text-3xl font-body font-semibold">There are <span>{accommodations?.length < 10 ? `0${accommodations?.length}` : accommodations?.length}</span> Packages Available in {country}.</h1>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    {
                                        accommodations?.map(item => <PackagesCard key={item._id} item={item} loading={loading}></PackagesCard>)
                                    }
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

            </div>
        </>
    );
};

export default Packages;