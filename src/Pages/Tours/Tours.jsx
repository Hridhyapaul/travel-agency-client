import ReactSlider from "react-slider";
import usePopularDestination from "../../Hooks/usePopularDestination";
import Container from "../../Shared/Container";
import worldTour from "../../assets/Images/Worldtour.jpg"
import ToursCard from "./ToursCard";
import { useState } from "react";
import { BiSearch } from 'react-icons/bi'
import { BsGridFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import './Tours.css'
import Loading from "../../Shared/Loading";
import { Helmet } from "react-helmet-async";

const Tours = () => {
    const [destinations, loading, refetch] = usePopularDestination();
    console.log(destinations)


    // ====== Search Filter ======
    const [query, setQuery] = useState("")

    // ====== Price Filter ======
    const min = 100;
    const max = 5000;

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

    // ====== Country Search filter ======
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onSearch = (searchTerm) => {
        console.log(searchTerm)
    };

    // State to manage the grid layout
    const [isBoxCard, setIsBoxCard] = useState(true);

    // Handler for toggling grid layout
    const handleBoxCard = () => {
        setIsBoxCard(true);
    };

    const handleVerticalCard = () => {
        setIsBoxCard(false)
    }
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>Travel.O | Destinations</title>
            </Helmet>
            <div className="relative">
                <img className="w-full h-[500px] object-cover object-left" src={worldTour} alt="" />
                <div className="w-full h-[500px] inset-0 bg-black bg-opacity-30 absolute"></div>
                <p className="text-6xl font-semibold text-white font-body absolute left-1/2 top-1/2 translate-x-[-50%]">World Destinations</p>
            </div>

            <div className="bg-bgColor py-20">
                <Container>
                    <div className="lg:grid lg:grid-cols-6 flex flex-col-reverse gap-12">

                        <div className="lg:col-span-4">
                            <div className="w-full px-5 py-2 rounded-lg bg-white">
                                <p className="font-body font-semibold">{destinations.length} Captivating Tours Awaits Your Exploration</p>
                            </div>
                            <div className="w-full mt-5">
                                <div className="flex justify-between items-center gap-8">
                                    <div className="w-[70%]">
                                        <div className="w-[80%] relative max-w-md">
                                            <div className="flex items-center">
                                                <input
                                                    type="text"
                                                    placeholder="Search Country"
                                                    value={value}
                                                    onChange={onChange}
                                                    className="w-full py-3 px-4 rounded-full focus:outline-none"
                                                />
                                                <div
                                                    onClick={() => onSearch(value)}
                                                    className='absolute right-[6px] top-1/2 translate-y-[-50%] p-2 bg-rose-500 rounded-full text-white'>
                                                    <BiSearch size={22} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="w-[30%] flex justify-end">
                                        <div className="flex justify-start items-center gap-2">
                                            <div
                                                onClick={handleBoxCard}
                                                className={`border-[2px] rounded-lg px-2 py-2 cursor-pointer ${isBoxCard ? 'bg-activeColor border-designColor' : 'border-base-400'}`}>
                                                <BsGridFill className={`text-[28px] ${isBoxCard ? 'text-bgColor' : 'text-[#8C8E8C]'}`}></BsGridFill>
                                            </div>
                                            <div
                                                onClick={handleVerticalCard}
                                                className={`border-[2px] rounded-lg px-2 py-2 cursor-pointer ${!isBoxCard ? 'bg-activeColor border-designColor' : 'border-base-400'}`}>
                                                <FaBarsStaggered className={`text-[28px] ${!isBoxCard ? 'text-bgColor' : 'text-[#8C8E8C]'}`}></FaBarsStaggered>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`grid ${isBoxCard ? "lg:grid-cols-2 grid-cols-1" : "grid-cols-1"} gap-6 mt-5`}>
                                {
                                    destinations
                                        .filter(destination => destination.countryName.toLowerCase().includes(value.toLowerCase()))
                                        .filter(destination => destination.name.toLowerCase().includes(query.toLowerCase()))
                                        .filter(destination => destination.price >= values[0] && destination.price <= values[1])
                                        .filter((item) =>
                                            durationFilter.length > 0
                                                ? durationFilter.includes(item.numberOfDay.toString())
                                                : true
                                        )
                                        .map((destination, index) => <ToursCard key={index} destination={destination} isBoxCard={isBoxCard}></ToursCard>)
                                }
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="space-y-8">
                                <div className="space-y-8 flex lg:block">
                                    {/* Search Input */}
                                    <div className="w-[50%] lg:w-full font-body bg-white shadow-md px-6 py-6 rounded-lg">
                                        <label className="text-2xl font-semibold">Search Packages</label>
                                        <input
                                            onChange={(event) => setQuery(event.target.value)}
                                            className="h-14 w-full rounded-lg border-2 outline-none border-bgColor pl-4 mt-4 focus:border-designColor"
                                            type="text"
                                            placeholder="Search Package"

                                        />
                                    </div>

                                    {/* Price Range */}
                                    <div className="w-[50%] lg:w-full font-body bg-white shadow-md px-6 py-6 rounded-lg space-y-4">
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
                            </div>

                            <div className="lg:block hidden mt-8">
                                <img src="https://i.ibb.co/JmzFQtt/7459907d-251d-4c0f-b545-a2ac744e0382-1024.jpg" alt="" />
                            </div>
                        </div>
                    </div >
                </Container >
            </div >
        </div >
    );
};

export default Tours;