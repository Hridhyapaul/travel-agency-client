import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useBook from "../../../Hooks/useBook";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const PaymentInject = ({totalAmount}) => {
    const [booking, refetch, loading] = useBook();
    console.log(totalAmount)
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm price={totalAmount} refetch={refetch} booking={booking}></PaymentForm>
            </Elements>
        </div>
    );
};

export default PaymentInject;