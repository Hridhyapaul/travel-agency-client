import ReactSlider from "react-slider";
import usePopularDestination from "../../Hooks/usePopularDestination";
import Container from "../../Shared/Container";
import worldTour from "../../assets/Images/Worldtour.jpg";
import ToursCard from "./ToursCard";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import "./Tours.css";
import Loading from "../../Shared/Loading";
import { Helmet } from "react-helmet-async";

const Tours = () => {
  const [destinations, loading, refetch] = usePopularDestination();
  console.log(destinations);

  const AllNumberOfday = destinations.map((d) => d.numberOfDay);
  let allDay = [...new Set(AllNumberOfday)];
  console.log(allDay);

  // ====== Search Filter ======
  const [query, setQuery] = useState("");

  // ====== Price Filter ======
  const min = 100;
  const max = 5000;

  const [values, setValues] = useState([min, max]);

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
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
  };

  // State to manage the grid layout
  const [isBoxCard, setIsBoxCard] = useState(true);

  // Handler for toggling grid layout
  const handleBoxCard = () => {
    setIsBoxCard(true);
  };

  const handleVerticalCard = () => {
    setIsBoxCard(false);
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Helmet>
        <title>Travel.O | Destinations</title>
      </Helmet>
      <div className="relative">
        <img
          className="w-full lg:h-[500px] h-[300px] object-cover object-left"
          src={worldTour}
          alt=""
        />
        <div className="w-full lg:h-[500px] h-[300px] inset-0 bg-black bg-opacity-30 absolute"></div>
        <p className="lg:text-6xl text-2xl text-center font-semibold text-white font-body absolute left-1/2 top-1/2 translate-x-[-50%]">
          World Destinations
        </p>
      </div>

      <div className="bg-bgColor lg:py-20 py-10">
        <Container>
          <div className="lg:grid lg:grid-cols-6 flex flex-col-reverse gap-12">
            <div className="lg:col-span-4">
              <div className="w-full px-3 py-3 rounded-lg bg-white">
                <p className="font-body font-semibold lg:text-[16px] text-sm">
                  {destinations.length} Captivating Tours Awaits Your
                  Exploration
                </p>
              </div>
              <div className="w-full mt-5">
                <div className="lg:flex justify-between items-center lg:gap-8">
                  <div className="lg:w-[70%] w-full">
                    <div className="lg:w-[80%] relative max-w-md">
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
                          className="absolute right-[6px] top-1/2 translate-y-[-50%] p-2 bg-rose-500 rounded-full text-white"
                        >
                          <BiSearch size={22} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%] hidden lg:flex justify-end">
                    <div className="flex justify-start items-center gap-2">
                      <div
                        onClick={handleBoxCard}
                        className={`border-[2px] rounded-lg px-2 py-2 cursor-pointer ${
                          isBoxCard
                            ? "bg-activeColor border-designColor"
                            : "border-base-400"
                        }`}
                      >
                        <BsGridFill
                          className={`text-[28px] ${
                            isBoxCard ? "text-bgColor" : "text-[#8C8E8C]"
                          }`}
                        ></BsGridFill>
                      </div>
                      <div
                        onClick={handleVerticalCard}
                        className={`border-[2px] rounded-lg px-2 py-2 cursor-pointer ${
                          !isBoxCard
                            ? "bg-activeColor border-designColor"
                            : "border-base-400"
                        }`}
                      >
                        <FaBarsStaggered
                          className={`text-[28px] ${
                            !isBoxCard ? "text-bgColor" : "text-[#8C8E8C]"
                          }`}
                        ></FaBarsStaggered>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`grid ${
                  isBoxCard ? "lg:grid-cols-2 grid-cols-1" : "grid-cols-1"
                } gap-6 mt-5`}
              >
                {destinations
                  .filter((destination) =>
                    destination.countryName
                      .toLowerCase()
                      .includes(value.toLowerCase())
                  )
                  .filter((destination) =>
                    destination.name.toLowerCase().includes(query.toLowerCase())
                  )
                  .filter(
                    (destination) =>
                      destination.price >= values[0] &&
                      destination.price <= values[1]
                  )
                  .filter((item) =>
                    durationFilter.length > 0
                      ? durationFilter.includes(item.numberOfDay.toString())
                      : true
                  )
                  .map((destination, index) => (
                    <ToursCard
                      key={index}
                      destination={destination}
                      isBoxCard={isBoxCard}
                    ></ToursCard>
                  ))}
              </div>
            </div>

            <div className="col-span-2">
              <div className="lg:space-y-8 space-y-4">
                {/* Search Input */}
                <div className="lg:w-full font-body bg-white shadow-md lg:px-6 px-3 lg:py-6 py-3 rounded-lg">
                  <label className="lg:text-2xl text-[16px] font-semibold">
                    Search Packages
                  </label>
                  <input
                    onChange={(event) => setQuery(event.target.value)}
                    className="lg:h-14 h-10 w-full rounded-lg border-2 outline-none border-bgColor lg:pl-4 pl-2 lg:mt-4 mt-2 focus:border-designColor lg:text-[16px] text-sm"
                    type="text"
                    placeholder="Search Package"
                  />
                </div>

                {/* Price Range */}
                <div className="lg:w-full font-body bg-white shadow-md lg:px-6 px-3 lg:py-6 py-3 rounded-lg space-y-4">
                  <p className="lg:text-2xl text-[16px] font-semibold">
                    Price Range
                  </p>
                  <div>
                    <div>
                      <p className="lg:text-[16px] text-sm">
                        ${values[0]} - ${values[1]}
                      </p>
                      <p className="lg:text-[16px] text-sm">
                        Current Range: ${values[1] - values[0]}
                      </p>
                    </div>
                    <div className="mt-4 bg-bgColor px-4 py-6 flex justify-center items-center">
                      <ReactSlider
                        onChange={setValues}
                        className="slider"
                        value={values}
                        step={50}
                        min={min}
                        max={max}
                      ></ReactSlider>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="font-body bg-white shadow-md lg:px-6 px-3 lg:py-6 py-3 rounded-lg">
                  <p className="lg:text-2xl text-[16px] font-semibold">
                    Duration
                  </p>
                  <div className="lg:mt-4 lg:flex-col flex justify-start lg:gap-1 gap-3">
                    {allDay.map((day, index) => (
                      <div key={index} className={index !== 0 ? "border-l-2 lg:border-l-0" : ""}>
                        <label className="block w-fit">
                          <input
                            type="checkbox"
                            className={`text-designColor h-3 ${index !== 0 ? "ml-2" : ""}`}
                            name="duration"
                            value={day}
                            onChange={(event) => handleDurationFilter(event)}
                          />
                          <span className="ml-2 lg:text-[16px] text-sm">
                            {day} Day
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:block hidden mt-8">
                <img
                  src="https://i.ibb.co/JmzFQtt/7459907d-251d-4c0f-b545-a2ac744e0382-1024.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Tours;
