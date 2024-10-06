import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import {
  useConfirmPaymentMutation,
  useCreatePaymentIntentMutation,
} from "../../redux/features/Products/orderApi";
import { useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/reducer/cartReducer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation();

  const [user, setUser] = useState({
    name: "Fahim Ahammed",
    email: "fahim@ph.com",
    phone: "0123456789",
    address: "Dhaka, Bangladesh",
  });

  const cartItems = useAppSelector((store) => store.cart.items);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setAmount(total * 100); // Stripe expects amount in cents
  }, [cartItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const paymentIntent = await createPaymentIntent({
        amount, // Only send the amount to Stripe
      }).unwrap();

      console.log("Payment Intent created:", paymentIntent);

      if (paymentIntent.clientSecret) {
        const cardElement = elements?.getElement(CardElement);
        if (!stripe || !cardElement) return;

        const { error, paymentIntent: confirmedPaymentIntent } =
          await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: {
                  line1: user.address,
                },
              },
            },
          });

        if (error) {
          console.error("Payment failed:", error.message);
        } else if (confirmedPaymentIntent?.status === "succeeded") {
          console.log("Payment succeeded:", confirmedPaymentIntent);

          await confirmPayment({
            paymentIntentId: confirmedPaymentIntent.id,
          }).unwrap();

          console.log("Server confirmed payment");

          // Dispatch the clearCart action to reset the cart in Redux state
          dispatch(clearCart());

          // Show SweetAlert2 success message
          Swal.fire({
            title: "Payment Successful!",
            text: "Thank you for your purchase. Your payment was processed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error("Error in payment process:", error);

      // Show SweetAlert2 error message
      Swal.fire({
        title: "Payment Failed",
        text: "There was an error processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* User Information */}
        <div className="mb-8 border p-5 rounded">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.quantity}</td>
                  <td className="py-3 px-4">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Element */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Proceed to Payment Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!stripe}
            className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </>
  );
};

export default function CheckOutPage() {
  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <Footer />
    </>
  );
}
