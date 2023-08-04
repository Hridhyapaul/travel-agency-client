import useMyBooking from "../../../Hooks/useMyBooking";
import MyBookingCard from "./MyBookingCard";

const MyBooking = () => {
    const [bookingCollection, refetch, loading] = useMyBooking();
    console.log(bookingCollection)
    return (
        <div className="mt-20">
            <h1 className="text-4xl font-body font-semibold text-center pb-4">Explore Your Booking Collection</h1>
            <hr className="my-4" />
            <div className="w-full space-y-6 mt-10">
                {
                    bookingCollection.map(collection => <MyBookingCard key={collection._id} collection={collection}></MyBookingCard>)
                }
            </div>
        </div>
    );
};

export default MyBooking;