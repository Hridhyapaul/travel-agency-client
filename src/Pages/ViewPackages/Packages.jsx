import Container from "../../Shared/Container";
import PackagesCard from "./PackagesCard";
import usePackages from "../../Hooks/usePackages";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ReactSlider from "react-slider";
import './CSS/Package.css'
import adImage from '../../../public/Icon/ad.avif'
import Loading from "../../Shared/Loading";

const Packages = () => {

    const { text } = useParams();
    const [packages, , loading] = usePackages({ text });
    console.log(packages)
    const { accommodation, countryImage, country, slogan } = packages;
    console.log(packages)

    // ====== Search Filter ======
    const [query, setQuery] = useState("")

    // ====== Price Filter ======
    const min = 100;
    const max = 10000;

    const [values, setValues] = useState([min, max])

    // ====== Duration Filter ======
    const [durationFilter, setDurationFilter] = useState("");

    const handleDurationFilter = (event) => {
        const checkedTerm = event.target.value;
        if (durationFilter.includes(checkedTerm)) {
            // If the filter is already selected, remove it
            setDurationFilter((prevFilters) =>
                prevFilters.filter((filter) => filter !== checkedTerm)
            );
        } else {
            // If the filter is not selected, add it
            setDurationFilter((prevFilters) => [...prevFilters, checkedTerm]);
        }
    };

    if (loading) {
        return <Loading></Loading>
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
                                        onChange={(event) => setQuery(event.target.value)}
                                        className="h-14 w-full rounded-lg border-2 outline-none border-bgColor pl-4 mt-4 focus:border-designColor"
                                        type="text"
                                        placeholder="Search Package"

                                    />
                                </div>

                                {/* Price Range */}
                                <div className="font-body bg-white shadow-md px-6 py-6 rounded-lg space-y-4">
                                    <p className="text-2xl font-semibold">Price Range</p>
                                    <div>
                                        <div>
                                            <p>${values[0]} - ${values[1]}</p>
                                            <p>Current Range: ${values[1] - values[0]}</p>
                                        </div>
                                        <div className="mt-4 bg-bgColor px-4 py-6 flex justify-center items-center">
                                            <ReactSlider
                                                onChange={setValues}
                                                className="slider"
                                                value={values}
                                                step={50}
                                                min={min}
                                                max={max}
                                            >

                                            </ReactSlider>
                                        </div>
                                    </div>
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
                                        <label className="block w-fit">
                                            <input
                                                type="checkbox"
                                                className="focus:bg-designColor"
                                                name="duration"
                                                value="6"
                                                onChange={(event) => handleDurationFilter(event)}
                                            // Add the appropriate onChange handler if needed
                                            />
                                            <span className="ml-2">06 Days</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Advertise banner */}
                                <div>
                                    <img className="rounded-lg" src={adImage} alt="" />
                                </div>

                            </div>
                            <div className="col-span-4">
                                <div className="bg-white px-4 py-4 rounded-md mb-8 shadow-md">
                                    <h1 className="text-3xl font-body font-semibold">There are <span>{accommodation?.length < 10 ? `0${accommodation?.length}` : accommodation?.length}</span> Packages Available in {country}.</h1>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    {
                                        accommodation.
                                            filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
                                            .filter((item) =>
                                                durationFilter.length > 0
                                                    ? durationFilter.includes(item.numberOfDay.toString())
                                                    : true
                                            )
                                            .filter(item => item.price >= values[0] && item.price <= values[1])
                                            .map(item => <PackagesCard key={item._id} item={item} country={country}></PackagesCard>)
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