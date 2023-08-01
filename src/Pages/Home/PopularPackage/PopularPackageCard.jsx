import { FaReceipt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularPackageCard = ({ destination, isLarge }) => {
    console.log(destination)
    const { _id, country, countryImage, accommodation } = destination;

    const minPrice = accommodation.reduce(
        (min, item) => (item.price < min ? item.price : min),
        Infinity
      );


    return (
        <div className={`col-span-${isLarge ? "2" : "1"}`}>
            <Link to={`/packages/${_id}`}>
                <div className="font-body relative duration-300">
                    <img className={`h-[${isLarge ? "300px" : "200px"}] w-full object-cover rounded-lg cursor-pointer`} src={countryImage} alt="" />

                    <div className="flex justify-start items-end absolute rounded-lg inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-500 ease-in-out">

                        <div className={`ml-4 mb-3 text-white`}>
                            <h1 className="text-2xl font-semibold">{country}</h1>
                            <p className="flex justify-start items-center gap-2"><FaReceipt></FaReceipt> <span>{accommodation.length} Packages</span></p>
                            <p>Start from ${minPrice}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PopularPackageCard;