import { HiOutlineX } from "react-icons/hi";
import useBook from "../../Hooks/useBook";
import Container from "../../Shared/Container";
import { Link } from "react-router-dom";

const BookList = () => {
    const [booking, refetch, loading] = useBook();
    console.log(booking)

    if (loading) {
        <div>Loading...</div>
    }

    const calculateTotalPrice = (price, tickets) => {
        return price * tickets;
    };

    // Calculate the sum of all total prices.
    const calculateTotalAmount = () => {
        let total = 0;
        booking.forEach((item) => {
            total += calculateTotalPrice(item.price, item.tickets);
        });
        return total;
    };

    return (
        <div className="mt-20 pb-20">
            <Container>
                <div className="font-body">
                    <h1 className="text-4xl text-center text-bodyColor font-semibold font-body">Your Booking Requests are Presented Here</h1>
                    <div className="flex justify-between items-center bg-white rounded-lg shadow-lg px-6 py-6 mt-10">
                        <h1 className="text-3xl font-semibold text-bodyColor">The Total is <span className="text-designColor">${calculateTotalAmount()}</span></h1>

                        <Link to="/dashboard/payment">
                            <h1 className="bg-bodyColor text-white font-medium px-4 py-2 rounded-lg cursor-pointer">Payment</h1>
                        </Link>
                    </div>
                </div>
                <div className="mt-10">

                    {/* Left Area */}
                    <div className="">
                        <div className="grid grid-cols-1 gap-8">
                            {
                                booking.map((item, index) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg px-6 py-4 font-body relative">
                                        <h1 className="text-xl font-semibold">{item.accommodation}</h1>
                                        <h1 className="text-lg font-semibold">{item.country}</h1>
                                        <p>Booking Date: {item.date}</p>
                                        <p>You will be charged <span className="text-lg font-semibold">${item.price}</span>/accommodation</p>
                                        <p>You are interested in reserving <span className="text-lg font-semibold">0{item.tickets}</span> tickets</p>
                                        <hr className="my-4" />

                                        <div className="flex justify-between items-center">
                                            <p className="text-lg font-medium">Payable price <span className="text-designColor">${item.price * item.tickets}</span></p>

                                            <h1 className="bg-designColor px-4 py-2 rounded-lg w-fit text-white font-medium font-body cursor-pointer">Pay for Booking</h1>
                                        </div>
                                        <div className="absolute top-4 right-4 cursor-pointer">
                                            <div className="w-[30px] h-[30px] rounded-full bg-bodyColor flex justify-center items-center">
                                                <HiOutlineX className="text-white text-xl"></HiOutlineX>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BookList;