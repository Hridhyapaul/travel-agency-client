import Container from "../../Shared/Container";
import { BiSearch } from 'react-icons/bi'
import { FaLocationDot } from "react-icons/fa6";

const Search = () => {
    return (
        <>
            <div className="bg-base-200 py-10">
                <Container>
                    <div className="relative bg-white shadow-lg px-10 py-10 rounded-lg">
                        <div>
                            <form>
                                <div className="lg:flex justify-between items-center font-body">
                                    <div className="w-[25%]">
                                        <label htmlFor="" className="mb-1 block text-lg font-semibold">Search your destination</label>
                                        <div className="flex items-center bg-base-200 pr-4 rounded-full">
                                            <input className="bg-base-200 px-4 py-2 rounded-full border-none outline-none w-full " type="text" placeholder="Where are you going?" />
                                            <FaLocationDot size={20}></FaLocationDot>
                                        </div>
                                    </div>
                                    <div className="lg:w-[25%] lg:border-l-[1px] lg:pl-14">
                                        <label htmlFor="" className="mb-1 block text-lg font-semibold">Select your date</label>
                                        <input className="bg-base-200 px-4 py-2 rounded-full border-none outline-none w-full " type="date" placeholder="Add Date" />
                                    </div>
                                    <div className="lg:w-[25%] lg:border-l-[1px] lg:pl-14">
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="" className="mb-1 block text-lg font-semibold">Max price:</label>
                                            <h3 className="text-lg font-semibold">$5000</h3>
                                        </div>
                                        <input className="bg-base-200 px-4 py-2 rounded-full border-none outline-none w-full " type="range" max="5000" min="1000" placeholder="Add Date" />
                                    </div>

                                </div>
                            </form>
                            <div className="w-[150px] cursor-pointer absolute z-10 -bottom-5 left-1/2 translate-x-[-50%]">
                                <div className='flex justify-start shadow-lg gap-3 p-3 bg-designColor rounded-full text-white'>
                                    <BiSearch size={24} />
                                    <span className="font-body font-semibold">Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Search;