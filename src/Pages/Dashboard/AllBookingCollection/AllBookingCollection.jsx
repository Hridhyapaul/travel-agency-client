import useAllBooking from "../../../Hooks/useAllBooking";
import AllBookingCollectionCard from "./AllBookingCollectionCard";

const AllBookingCollection = () => {
    const [bookings, refetch, bookingsLoading] = useAllBooking();
    console.log(bookings)
    return (
        <div className="mt-20 pb-20">
            <h1 className="text-4xl font-body font-semibold text-center pb-4">All Booking Collection</h1>
            <div className="grid grid-cols-2 gap-6">
                {
                    bookings.map(booking => <AllBookingCollectionCard key={booking._id} booking={booking} refetch={refetch}></AllBookingCollectionCard>)
                }
            </div>
        </div>
    );
};

export default AllBookingCollection;