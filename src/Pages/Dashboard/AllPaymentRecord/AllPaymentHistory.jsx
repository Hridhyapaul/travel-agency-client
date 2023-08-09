import useRevenue from "../../../Hooks/useRevenue";
import AllPaymentHistoryCard from "./AllPaymentHistoryCard";


const AllPaymentHistory = () => {
    const [allPayments] = useRevenue()
    console.log(allPayments)
    return (
        <div className="py-20 px-4 bg-white">

            <h2 className='text-4xl font-body font-semibold text-center pb-4'>All Payment Record</h2>
            <hr className='my-4' />
            <div className='mt-8'>
                <div className="overflow-x-auto">
                    <table className="table font-body">
                        {/* head */}
                        <thead>
                            <tr className='text-center text-[14px]'>
                                <th></th>
                                <th>Traveler Name</th>
                                <th className="w-[300px]">Lodge Name</th>
                                <th>Tickets</th>
                                <th>Amount</th>
                                <th>Transition Id</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allPayments.map((history, index) => <AllPaymentHistoryCard key={history._id} history={history} index={index}></AllPaymentHistoryCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default AllPaymentHistory;