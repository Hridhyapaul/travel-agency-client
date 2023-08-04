import { Link } from "react-router-dom";

const MyBookingCard = ({ collection }) => {
    console.log(collection)
    const { countryName, image, location, name, numberOfDay, price, tickets, _id } = collection
    return (
        <div className="">
            <div className="flex justify-between items-center gap-5 bg-white shadow-lg w-[700px] rounded-lg">
                <img className="w-[40%] h-[220px] object-cover rounded-l-md" src={image[3]} alt="" />
                <div className="w-[60%] font-body font-medium pr-5">
                    <h1 className="text-lg font-semibold">{name} <span>({countryName})</span></h1>
                    <hr className="my-2" />
                    <div>
                        <p>Location - {location}</p>
                        <p>Tour Duration - {numberOfDay} Day</p>
                        <p>Price - ${price}</p>
                        <p>Tickets Sold - {tickets} tickets</p>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center">
                        <p>Payment Received - <span className="text-designColor">${price * tickets}</span></p>
                        <Link to={`/accommodation/${_id}`}><button className="bg-designColor font-medium px-3 py-1 text-white rounded-lg">See Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookingCard;