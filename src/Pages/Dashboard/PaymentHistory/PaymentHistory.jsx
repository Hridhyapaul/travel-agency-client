import usePaymentHistory from "../../../Hooks/usePaymentHistory";
import PaymentHistoryCard from "./PaymentHistoryCard";
import noPayment from "../../../assets/Images/noPaymentHistory.jpg"
import Loading from "../../../Shared/Loading";

const PaymentHistory = () => {
    const [paymentHistory, , loading] = usePaymentHistory();
    console.log(paymentHistory)

    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className=" my-20 mx-4">

            {
                paymentHistory.length > 0 ?
                    (
                        <div>
                            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Your Payment History</h2>
                            
                            <div className='mt-8'>
                                <div className="overflow-x-auto">
                                    <table className="table font-body">
                                        {/* head */}
                                        <thead className="bg-designColor text-white">
                                            <tr className='text-center text-[14px]'>
                                                <th></th>
                                                <th className="py-6">Accommodation Name</th>
                                                <th className="py-6">Country Name</th>
                                                <th className="py-6">Tickets</th>
                                                <th className="py-6">Amount</th>
                                                <th className="py-6">Transition Id</th>
                                                <th className="py-6">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {
                                                paymentHistory.map((history, index) => <PaymentHistoryCard key={history._id} history={history} index={index}></PaymentHistoryCard>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <h2 className='text-4xl font-body font-semibold text-center pb-4'>No Payment History Available</h2>
                            <div className="mt-10 flex justify-center">
                                <img className="w-[700px] h-[500px] object-cover object-top rounded-lg" src={noPayment} alt="" />
                            </div>
                        </div>
                    )
            }

        </div>
    );
};

export default PaymentHistory;