import useMyBooking from "../../../Hooks/useMyBooking";
import MyBookingCard from "./MyBookingCard";
import noCollection from "../../../assets/Images/NoCollection.jpg"
import Loading from "../../../Shared/Loading";

const MyBooking = () => {
    const [bookingCollection, , loading] = useMyBooking();
    console.log(bookingCollection)


    if(loading){
        return (  // Add the missing return statement here
            <div>
                <Loading></Loading>
            </div>
        );
    }
    return (
        <div className="my-20">
            {
                bookingCollection?.length > 0 ?
                    (
                        <div>
                            <h1 className="text-4xl font-body font-semibold text-center pb-4">Explore Your Booking Collection</h1>
                            <hr className="my-4" />
                            <div className="w-full space-y-6 mt-10">
                                {
                                    bookingCollection?.map(collection => <MyBookingCard key={collection._id} collection={collection}></MyBookingCard>)
                                }
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="">
                            <h1 className="text-4xl font-body font-semibold text-center pb-4">You currently have no bookings collection</h1>
                            <div className="flex justify-center mt-10">
                                <img className="w-[80%] rounded-full" src={noCollection} alt="" />
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default MyBooking;