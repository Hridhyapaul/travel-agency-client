import usePaymentHistory from "../../../Hooks/usePaymentHistory";
import PaymentHistoryCard from "./PaymentHistoryCard";
import noPayment from "../../../../public/Icon/noPaymentHistory.jpg"
import Loading from "../../../Shared/Loading";

const PaymentHistory = () => {
    const [paymentHistory, , loading] = usePaymentHistory();
    console.log(paymentHistory)

    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className=" my-20">

            {
                paymentHistory.length > 0 ?
                    (
                        <div>
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