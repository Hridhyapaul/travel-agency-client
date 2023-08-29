import { FaReceipt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularPackageCard = ({ accommodation, isLarge }) => {
    console.log(accommodation)
    const { country, countryImage, accommodations } = accommodation;

    const minPrice = accommodations.reduce(
        (min, item) => (item.price < min ? item.price : min),
        Infinity
      );

    return (
        <div className={`col-span-${isLarge ? "2" : "1"}`}>
            <Link to={`/packages/${country}`}>
                <div className="font-body relative duration-300">
                    <img className={`lg:h-[${isLarge ? "300px" : "200px"}] h-[200px] w-full object-cover rounded-lg cursor-pointer`} src={countryImage} alt=""/>

                    <div className="flex justify-start items-end absolute rounded-lg inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-500 ease-in-out">

                        <div className={`ml-4 mb-3 text-white`}>
                            <h1 className="lg:text-2xl text-xl font-semibold">{country}</h1>
                            <p className="flex justify-start lg:text-normal text-sm items-center gap-2"><FaReceipt></FaReceipt> <span>{accommodations.length} Packages</span></p>
                            <p className="text-sm">Start from ${minPrice}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PopularPackageCard;