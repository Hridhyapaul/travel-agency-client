import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = ({ price, refetch, booking }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState('')
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transitionId, setTransitionId] = useState('')

    useEffect(() => {
        if (price == 0) return
        axiosSecure.post('/create-payment-intent', { price })
            .then(data => {
                console.log(data.data.clientSecret)
                setClientSecret(data.data.clientSecret)
            })
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        console.log(card)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            console.log('[error]', error);
            setPaymentError(error.message)
        } else {
            setPaymentError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'unknown'
                },
            },
        });

        if (confirmError) {
            console.log(confirmError)
        }
        console.log('payment intent', paymentIntent);

        setProcessing(false)


        if (paymentIntent.status === 'succeeded') {
            setTransitionId(paymentIntent.id)
            setPaymentSuccess(`Your payment of ${price} has been successfully processed.`)

            // Phone number
            const uniquePhoneNumbersSet = new Set(booking.map(item => item.phoneNumber));
            const uniquePhoneNumbers = Array.from(uniquePhoneNumbersSet);

            // Tickets
            const ticketsByAccommodation = booking.map(item => ({
                accommodation: item.accommodation,
                tickets: item.tickets,
                country: item.country,
                paidAmount: item.tickets * item.price,
            }));

            const payments = {
                email: user?.email,
                name: user?.displayName,
                phoneNumber: uniquePhoneNumbers[0],
                transitionId: paymentIntent.id,
                price,
                date: new Date(),
                tickets: ticketsByAccommodation,
                quantity: booking.length,
                bookingItem_id: booking.map(item => item._id),
                accommodationName: booking.map(item => item.accommodation),
                accommodation_id: booking.map(item => item.accommodation_id),
                status: 'service pending',
            }

            axiosSecure.post('/payments', payments)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertResult.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Congratulations! Your payment has been approved.',
                            showConfirmButton: false,
                            timer: 2500
                        })
                    }
                })
        }
    }
    return (
        <div className=' h-[227px] bg-white rounded-lg shadow-lg px-6 py-4'>
            <form onSubmit={handleSubmit} className="mt-2">
                <div className="mb-4">
                    <label htmlFor="card-element" className="block text-gray-700 text-xl font-semibold mb-4">
                        Card Information
                    </label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button type="submit" disabled={!stripe || !clientSecret || processing} className="bg-bodyColor text-white text-[16px] rounded-lg py-1 px-3 font-semibold">
                    Pay
                </button>
            </form>
            {paymentError ? <p className="text-red-500 mt-4 font-body capitalize">
                {paymentError}
            </p> : <p className="text-green-500 mt-4">
                {paymentSuccess}
            </p>}
        </div>
    );
};

export default PaymentForm;