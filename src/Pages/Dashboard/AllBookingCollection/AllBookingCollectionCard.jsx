
const AllBookingCollectionCard = ({ booking, refetch }) => {
    console.log(booking)
    const { traveler_name, traveler_email, travelerPhone, tickets, status, price, name, countryName, location } = booking
    return (
        <div className="col-span-1 bg-white text-bodyColor border-b-4 border-bodyColor rounded-lg shadow-lg font-body px-4 py-4">
            <div className="flex justify-between items-start gap-8">
                <div>
                    <h1 className="text-xl font-semibold">{traveler_name}</h1>
                    <p className="text-sm">{traveler_email}</p>
                    <p className="text-sm">{travelerPhone}</p>
                </div>
                <div className="space-y-2">
                    <p className="bg-bodyColor rounded-lg px-2 py-1 text-white text-sm">{status}</p>
                    <p className="text-sm">{tickets} Tickets</p>
                </div>
            </div>
            <hr className="my-4 border-gray-300" />
            <div>
                <h1 className="font-semibold">{name} <span>({countryName})</span></h1>
                <p><span className="font-medium">Location:</span> {location}</p>
                <hr className="my-4"/>
                <div className="flex justify-between items-center">
                    <p><span className="font-semibold text-lg">${price}</span> <span>/Tickets</span></p>
                    <p>Payment- ${price * tickets}</p>
                </div>
            </div>
        </div>
    );
};

export default AllBookingCollectionCard;