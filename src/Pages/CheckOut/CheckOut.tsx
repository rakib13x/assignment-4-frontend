// src/Pages/CheckOut/CheckOut.tsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPaymentFailure,
  createPaymentRequest,
  createPaymentSuccess,
} from "../../redux/actions/checkOutActions"; // Ensure this import is correct
import { RootState } from "../../redux/store"; // Adjust the import according to your file structure

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const checkoutState = useSelector((state: RootState) => state.checkout);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    subscribe: false,
  });

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    region: "",
    zip: "",
    country: "",
    phone: "",
    saveInfo: false,
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    if (section === "contactInfo") {
      setContactInfo((prevState) => ({
        ...prevState,
        [name]: inputValue,
      }));
    } else if (section === "shippingDetails") {
      setShippingDetails((prevState) => ({
        ...prevState,
        [name]: inputValue,
      }));
    } else if (section === "paymentMethod") {
      setPaymentMethod((prevState) => ({
        ...prevState,
        [name]: inputValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createPaymentRequest());

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: "someProductId", // Ensure this is dynamically set
            amount: calculateGrandTotal(),
            currency: "usd", // Ensure this matches your backend expectations
            paymentMethodId: paymentMethod.cardNumber, // This should be the actual payment method ID
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const data = await response.json();
      dispatch(createPaymentSuccess(data));

      // Navigate to success page or display success message
      navigate("/success");
    } catch (error) {
      dispatch(createPaymentFailure(error.message));
    }
  };

  const calculateTotal = (price: number, quantity: number) => {
    return (price * quantity).toFixed(2);
  };

  const calculateGrandTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="w-full px-4 sm:px-0 md:px-6">
          {/* Add Contact Information Fields */}
        </div>

        {/* Shipping Details */}
        <div className="w-full px-4 sm:px-0 md:px-6 mt-8">
          <p className="text-xl font-semibold leading-tight text-gray-800">
            Shipping Details
          </p>
          <div className="flex sm:flex-row md:flex-col flex-col lg:flex-row">
            <input
              type="text"
              name="firstName"
              value={shippingDetails.firstName}
              onChange={(e) => handleInputChange(e, "shippingDetails")}
              className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 focus:outline-0"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={shippingDetails.lastName}
              onChange={(e) => handleInputChange(e, "shippingDetails")}
              className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 sm:ml-8 md:ml-0 lg:ml-8 focus:outline-0"
              placeholder="Last Name"
            />
          </div>
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={(e) => handleInputChange(e, "shippingDetails")}
            className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 focus:outline-0"
            placeholder="Address"
          />
          <input
            type="text"
            name="address2"
            value={shippingDetails.address2}
            onChange={(e) => handleInputChange(e, "shippingDetails")}
            className="pb-4 rounded-b border-b border-gray-200 block w-full placeholder-gray-600 mt-6 focus:outline-0"
            placeholder="Address (Line 02)"
          />
          <div className="flex md:flex-row flex-col relative">
            <div className="mx-auto mt-6 w-full">
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={(e) => handleInputChange(e, "shippingDetails")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 focus:outline-0"
                placeholder="City"
              />
            </div>
            <div className="mx-auto mt-6 w-full md:ml-8">
              <input
                type="text"
                name="region"
                value={shippingDetails.region}
                onChange={(e) => handleInputChange(e, "shippingDetails")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 focus:outline-0"
                placeholder="Region (optional)"
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col">
            <div className="mx-auto mt-6 w-full">
              <input
                type="text"
                name="zip"
                value={shippingDetails.zip}
                onChange={(e) => handleInputChange(e, "shippingDetails")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 focus:outline-0"
                placeholder="Zip Code"
              />
            </div>
            <div className="mx-auto mt-6 w-full md:ml-8">
              <input
                type="text"
                name="country"
                value={shippingDetails.country}
                onChange={(e) => handleInputChange(e, "shippingDetails")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 focus:outline-0"
                placeholder="Country"
              />
            </div>
          </div>
          <input
            type="tel"
            name="phone"
            value={shippingDetails.phone}
            onChange={(e) => handleInputChange(e, "shippingDetails")}
            className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 focus:outline-0"
            placeholder="Phone Number"
          />
          <div className="flex mt-4">
            <input
              type="checkbox"
              name="saveInfo"
              checked={shippingDetails.saveInfo}
              onChange={(e) => handleInputChange(e, "shippingDetails")}
              className="w-5 h-5 accent-gray-800 lg:mt-5 cursor-pointer"
            />
            <p className="text-sm leading-none text-gray-600 pl-2 lg:mt-6 md:mt-1 mt-1">
              Save this information for next time.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="relative md:pb-20 pb-9 px-4 sm:px-0 md:px-6">
          <div className="grid grid-cols-12">
            <div className="lg:col-start-1 md:col-start-0 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
              <div className="lg:mt-12 md:mt-8 mt-8 lg:ml-0 md:ml-0 ml-0 col-span-10">
                <p className="text-xl font-semibold leading-tight text-gray-800">
                  Order Summary
                </p>
                <div className="product-container">
                  {cartItems.map((item) => (
                    <div className="sm:flex items-start mt-10" key={item.id}>
                      <div className="sm:w-48 w-full">
                        <img
                          src={item.image}
                          className="w-full"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex items-start justify-between w-full">
                        <div className="sm:ml-8">
                          <p className="text-lg font-medium leading-none text-gray-800 mt-6 sm:mt-0">
                            {item.name}
                          </p>
                          <p className="text-base leading-none text-gray-600 mt-4">
                            {item.color}
                          </p>
                          <p className="text-base leading-none text-gray-600 mt-4">
                            {item.size}
                          </p>
                          <p className="text-base leading-none text-gray-600 mt-4">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-lg font-semibold leading-none text-gray-800 mt-6 sm:mt-0">
                          ${calculateTotal(item.price, item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="div flex justify-between lg:mt-12 md:mt-12 mt-8">
                  <div className="title">
                    <p className="text-lg leading-none text-gray-600">
                      Total items
                    </p>
                  </div>
                  <div className="price">
                    <p className="text-lg font-semibold leading-none text-gray-600">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </p>
                  </div>
                </div>
                <div className="div flex justify-between mt-6">
                  <div className="title">
                    <p className="text-lg leading-none text-gray-600">
                      Total Charges
                    </p>
                  </div>
                  <div className="price">
                    <p className="text-lg font-semibold leading-none text-gray-600">
                      ${calculateGrandTotal()}
                    </p>
                  </div>
                </div>
                <hr className="w-full bg-gray-200 border mt-6 h-[1px]" />
                <div className="div flex justify-between mt-6">
                  <div className="title">
                    <p className="text-2xl font-semibold leading-normal text-gray-800">
                      Total
                    </p>
                  </div>
                  <div className="price">
                    <p className="text-2xl font-semibold leading-normal text-gray-800">
                      ${calculateGrandTotal()}
                    </p>
                  </div>
                </div>
                <hr className="w-full bg-gray-200 border mt-6 h-[1px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="grid grid-cols-12 lg:mt-16 md:mt-16 mt-8">
          <div className="sm:col-start-1 col-start-1 sm:col-span-10 col-span-12 md:col-span-12 lg:px-0 sm:px-0 md:px-0">
            <p className="text-xl font-semibold leading-tight text-gray-800">
              Payment Method
            </p>
            <div className="flex md:flex-row flex-col">
              <input
                type="text"
                name="cardName"
                value={paymentMethod.cardName}
                onChange={(e) => handleInputChange(e, "paymentMethod")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 focus:outline-0"
                placeholder="Name of Card"
              />
              <input
                type="text"
                name="cardNumber"
                value={paymentMethod.cardNumber}
                onChange={(e) => handleInputChange(e, "paymentMethod")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 md:ml-8 focus:outline-0"
                placeholder="Card Number"
              />
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row relative">
              <div className="mx-auto mt-6 w-full">
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentMethod.expiryDate}
                  onChange={(e) => handleInputChange(e, "paymentMethod")}
                  className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 focus:outline-0"
                  placeholder="Expiry Date"
                />
              </div>
              <input
                type="text"
                name="cvc"
                value={paymentMethod.cvc}
                onChange={(e) => handleInputChange(e, "paymentMethod")}
                className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 sm:ml-8 md:ml-0 lg:ml-8 focus:outline-0"
                placeholder="CVC"
              />
            </div>
          </div>
        </div>

        {/* Complete Purchase Button */}
        <div className="div flex w-full md:pt-12 pt-8">
          <button
            type="submit"
            className="text-base font-medium leading-none text-white bg-gray-800 py-4 w-full hover:bg-gray-700 transform duration-300 ease-in-out"
          >
            Complete Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
