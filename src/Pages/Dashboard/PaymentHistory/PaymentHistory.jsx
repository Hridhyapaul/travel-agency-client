import usePaymentHistory from "../../../Hooks/usePaymentHistory";
import PaymentHistoryCard from "./PaymentHistoryCard";

const PaymentHistory = () => {
    const [paymentHistory, refetch, loading] = usePaymentHistory();
    console.log(paymentHistory)
    return (
        <div className=" mt-20">
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Your Payment History</h2>
            <hr className='my-4' />
            <div className='mt-8'>
                <div className="overflow-x-auto">
                    <table className="table font-body">
                        {/* head */}
                        <thead>
                            <tr className='text-center text-[14px]'>
                                <th></th>
                                <th>Accommodation Name</th>
                                <th>Country Name</th>
                                <th>Tickets</th>
                                <th>Amount</th>
                                <th>Transition Id</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paymentHistory.map((history, index) => <PaymentHistoryCard key={history._id} history={history} index={index}></PaymentHistoryCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;