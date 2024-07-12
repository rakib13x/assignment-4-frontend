import { useState } from "react";

const CheckoutForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", {
      contactInfo,
      shippingDetails,
      paymentMethod,
    });
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="w-full mx-auto">
          <div className="w-full py-12 md:py-8 px-4 sm:px-0 md:px-6">
            <p className="lg:text-4xl md:text-2xl text-2xl font-semibold leading-9 text-gray-800 sm:mb-8 mb-8 md:mb-8">
              Check out
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full px-4 sm:px-0 md:px-6">
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
        </div>

        <div className="relative md:pb-20 pb-9 px-4 sm:px-0 md:px-6">
          <div className="grid grid-cols-12">
            <div className="lg:col-start-1 md:col-start-0 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
              <div className="lg:mt-12 md:mt-8 mt-8 lg:ml-0 md:ml-0 ml-0 col-span-10">
                <p className="text-xl font-semibold leading-tight text-gray-800">
                  Order Summary
                </p>
                <div className="product-container">
                  <div className="sm:flex items-start mt-10">
                    <div className="sm:w-48 w-full">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Rectangle%20193.png"
                        className="w-full"
                        alt="Sweat Shirt"
                      />
                    </div>
                    <div className="flex items-start justify-between w-full">
                      <div className="sm:ml-8">
                        <p className="text-lg font-medium leading-none text-gray-800 mt-6 sm:mt-0">
                          Sweat Shirt
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          White
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Small
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Quantity: 1
                        </p>
                      </div>
                      <p className="text-lg font-semibold leading-none text-gray-800 mt-6 sm:mt-0">
                        $20
                      </p>
                    </div>
                  </div>
                  <div className="sm:flex items-start mt-10">
                    <div className="sm:w-48 w-full">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Rectangle%20194.png"
                        className="w-full"
                        alt="Air Jordens"
                      />
                    </div>
                    <div className="flex items-start justify-between w-full">
                      <div className="sm:ml-8">
                        <p className="text-lg font-medium leading-none text-gray-800 mt-6 sm:mt-0">
                          Air Jordens
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Black and Orange
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Size: 41
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Quantity: 2
                        </p>
                      </div>
                      <p className="text-lg font-semibold leading-none text-gray-800 mt-6 sm:mt-0">
                        $40
                      </p>
                    </div>
                  </div>
                  <div className="sm:flex items-start mt-10">
                    <div className="sm:w-48 w-full">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/Rectangle%20195.png"
                        className="w-full"
                        alt="Denim Jeans"
                      />
                    </div>
                    <div className="flex items-start justify-between w-full">
                      <div className="sm:ml-8">
                        <p className="text-lg font-medium leading-none text-gray-800 mt-6 sm:mt-0">
                          Pack of 3 Denim Jeans
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Blue, Gray, Black
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Size: 41
                        </p>
                        <p className="text-base leading-none text-gray-600 mt-4">
                          Quantity: 1
                        </p>
                      </div>
                      <p className="text-lg font-semibold leading-none text-gray-800 mt-6 sm:mt-0">
                        $70
                      </p>
                    </div>
                  </div>

                  <div className="div flex justify-between lg:mt-12 md:mt-12 mt-8">
                    <div className="title">
                      <p className="text-lg leading-none text-gray-600">
                        Total items
                      </p>
                    </div>
                    <div className="price">
                      <p className="text-lg font-semibold leading-none text-gray-600">
                        07
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
                        $80
                      </p>
                    </div>
                  </div>
                  <div className="div flex justify-between mt-6">
                    <div className="title">
                      <p className="text-lg leading-none text-gray-600">
                        Shipping charges
                      </p>
                    </div>
                    <div className="price">
                      <p className="text-lg font-semibold leading-none text-gray-600">
                        $90
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
                        $170
                      </p>
                    </div>
                  </div>
                  <hr className="w-full bg-gray-200 border mt-6 h-[1px]" />

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
                          onChange={(e) =>
                            handleInputChange(e, "paymentMethod")
                          }
                          className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 focus:outline-0"
                          placeholder="Name of Card"
                        />

                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentMethod.cardNumber}
                          onChange={(e) =>
                            handleInputChange(e, "paymentMethod")
                          }
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
                            onChange={(e) =>
                              handleInputChange(e, "paymentMethod")
                            }
                            className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 focus:outline-0"
                            placeholder="Expiry Date"
                          />
                        </div>

                        <input
                          type="text"
                          name="cvc"
                          value={paymentMethod.cvc}
                          onChange={(e) =>
                            handleInputChange(e, "paymentMethod")
                          }
                          className="pb-4 rounded border-b border-gray-200 block w-full placeholder-gray-600 mt-6 sm:ml-8 md:ml-0 lg:ml-8 focus:outline-0"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="div flex w-full md:pt-12 pt-8">
                    <button
                      type="submit"
                      className="text-base font-medium leading-none text-white bg-gray-800 py-4 w-full hover:bg-gray-700 transform duration-300 ease-in-out"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
