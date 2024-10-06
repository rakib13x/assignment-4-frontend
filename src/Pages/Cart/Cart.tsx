import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import {
  removeFromCart,
  updateQuantity,
} from "../../redux/reducer/cartReducer";
import { RootState } from "../../redux/store";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  deliveryTime: number;
}

const Cart = () => {
  const dispatch = useDispatch();

  // Correctly typing the state parameter using RootState
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.items || []
  );

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity(productId, quantity));
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        e.preventDefault();
        Swal.fire({
          title: "Are you sure?",
          text: "You have items in your cart. If you leave, your cart will be lost.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, leave the page!",
          cancelButtonText: "No, stay on the page",
        }).then((result) => {
          if (result.isConfirmed) {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.location.reload();
          }
        });
        e.returnValue =
          "You have items in your cart. If you leave, your cart will be lost.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  return (
    <>
      <NavBar />
      <div className="px-4 py-12">
        <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] w-full py-12 bg-white mx-auto">
          <div className="mb-14">
            <p className="text-3xl font-semibold leading-9 text-center text-gray-800 lg:text-4xl">
              Shopping Cart
            </p>
          </div>

          <div className="hidden px-4 lg:block md:block lg:px-10 md:px-6">
            <div className="flex justify-between">
              <p className="text-lg font-medium leading-tight text-gray-600 lg:text-xl">
                Product
              </p>
              <p className="text-lg font-medium leading-tight text-gray-600 lg:text-xl">
                Quantity
              </p>
              <p className="text-xl font-medium leading-tight text-gray-600 lg:block hidden">
                Remove
              </p>
              <p className="text-lg font-medium leading-tight text-gray-600 lg:text-xl">
                Total
              </p>
            </div>
          </div>

          <hr className="hidden mt-6 mb-10 border-gray-300 lg:block md:block h-0.5" />

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            cartItems.map((item: CartItem, index: number) => (
              <div
                key={item._id || index}
                className="flex flex-col px-4 mt-10 md:flex-row items-stretch md:mt-14 lg:mt-10 lg:px-10 md:px-6"
              >
                <div className="flex items-center">
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : "default-image-url"
                    }
                    alt={item.name}
                    role="img"
                    className="object-contain max-w-[150px] lg:block md:block hidden"
                  />
                </div>

                <div className="justify-between hidden w-full md:flex">
                  <div className="flex flex-col justify-center md:ml-6 lg:ml-8">
                    <p className="mb-4 text-lg font-semibold leading-tight text-gray-800 lg:text-xl">
                      {item.name}
                    </p>
                    <p className="text-sm leading-normal text-gray-600">
                      Delivery:{" "}
                      <span className="font-medium">
                        Time: {item.deliveryTime} days
                      </span>
                    </p>
                    <div className="flex items-center space-x-6 mt-7 lg:hidden">
                      <p
                        className="text-base font-medium leading-none text-red-500 cursor-pointer"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center h-full 2xl:space-x-60 xl:space-x-52 md:gap-x-12">
                      <div className="flex items-center justify-center w-20 h-10 p-3 space-x-3 border border-gray-300">
                        <button
                          className="outline-none"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                          aria-label="decrease quantity"
                        >
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.625 1.5L3.375 6L8.625 10.5L8.625 1.5Z"
                              fill="#1F2937"
                            />
                          </svg>
                        </button>
                        <p className="text-base text-gray-800 quantity1">
                          {item.quantity}
                        </p>
                        <button
                          className="outline-none"
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                          aria-label="increase quantity"
                        >
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.375 10.5L8.625 6L3.375 1.5L3.375 10.5Z"
                              fill="#1F2937"
                            />
                          </svg>
                        </button>
                      </div>
                      <p
                        className="lg:block hidden text-base font-medium leading-none text-red-500"
                        onClick={() => handleRemove(item._id)}
                      >
                        Remove
                      </p>
                      <div className="hidden md:block">
                        <p className="text-xl font-medium text-right text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          <hr className="mt-6 mb-10 border-gray-300 h-0.5" />

          <div className="lg:block md:hidden block">
            <div className="lg:flex block gap-4 justify-between lg:px-10 md:px-6 px-4">
              <div className="flex justify-between border border-gray-200 py-4 lg:max-w-[296px] w-full px-4">
                <p className="text-base leading-none text-gray-600">Discount</p>
                <p className="text-base leading-none text-gray-600">$0.00</p>
              </div>
              <div className="flex justify-between border border-gray-200 py-4 lg:max-w-[296px] w-full px-4 lg:mt-0 mt-4">
                <p className="text-base leading-none text-gray-600">Delivery</p>
                <p className="text-base leading-none text-gray-600">$0.00</p>
              </div>
              <div className="flex justify-between border border-gray-200 py-4 lg:max-w-[296px] w-full px-4 lg:mt-0 mt-4">
                <p className="text-base leading-none text-gray-600">Subtotal</p>
                <p className="text-base leading-none text-gray-600">
                  ${calculateTotal()}
                </p>
              </div>
              <div className="flex justify-between border border-gray-200 py-4 lg:max-w-[296px] w-full px-4 lg:mt-0 mt-4">
                <p className="text-base font-medium leading-none text-gray-800">
                  Total
                </p>
                <p className="text-base font-medium leading-none text-gray-800">
                  ${calculateTotal()}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:flex justify-between items-center lg:px-10 md:px-6 px-4 mt-12">
            <Link to="/checkout">
              <button className="bg-gray-800 flex justify-center gap-4 items-center min-w-[296px] w-full py-3 px-3 hover:bg-gray-700 transition duration-300 ease-out">
                <p className="text-base font-medium leading-none text-white">
                  Check Out
                </p>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.2803 11.4697C22.5732 11.7626 22.5732 12.2374 22.2803 12.5303L18.5303 16.2803C18.2374 16.5732 17.7626 16.5732 17.4697 16.2803C17.1768 15.9874 17.1768 15.5126 17.4697 15.2197L19.9393 12.75H8.95312C8.53891 12.75 8.20312 12.4142 8.20312 12C8.20312 11.5858 8.53891 11.25 8.95312 11.25H19.9393L17.4697 8.78033C17.1768 8.48744 17.1768 8.01256 17.4697 7.71967C17.7626 7.42678 18.2374 7.42678 18.5303 7.71967L22.2803 11.4697ZM14.25 6.375C14.25 6.07663 14.1315 5.79048 13.9205 5.5795C13.7095 5.36853 13.4234 5.25 13.125 5.25H4.125C3.82663 5.25 3.54048 5.36853 3.32951 5.5795C3.11853 5.79048 3 6.07663 3 6.375V17.625C3 17.9234 3.11853 18.2095 3.32951 18.4205C3.54048 18.6315 3.82663 18.75 4.125 18.75H13.125C13.4234 18.75 13.7095 18.6315 13.9205 18.4205C14.1315 18.2095 14.25 17.9234 14.25 17.625V15.75C14.25 15.3358 14.5858 15 15 15C15.4142 15 15.75 15.3358 15.75 15.75V17.625C15.75 18.3212 15.4734 18.9889 14.9812 19.4812C14.4889 19.9734 13.8212 20.25 13.125 20.25H4.125C3.42881 20.25 2.76113 19.9734 2.26884 19.4812C1.77656 18.9889 1.5 18.3212 1.5 17.625V6.375C1.5 5.67881 1.77656 5.01113 2.26884 4.51884C2.76113 4.02656 3.42881 3.75 4.125 3.75L13.125 3.75C13.8212 3.75 14.4889 4.02656 14.9812 4.51884C15.4734 5.01113 15.75 5.67881 15.75 6.375V8.25C15.75 8.66421 15.4142 9 15 9C14.5858 9 14.25 8.66421 14.25 8.25V6.375Z"
                    fill="white"
                  />
                </svg>
              </button>
            </Link>

            <div className="md:flex lg:mt-0 md:mt-6 mt-4">
              <input
                type="text"
                placeholder="Please enter promo code"
                className="border border-gray-800 focus:outline-none py-2 px-3 text-base placeholder:text-gray-500 lg:min-w-[339px] w-full"
              />
              <button className="bg-gray-800 min-w-[198px] w-full py-3 px-3 hover:bg-gray-700 transition duration-300 ease-out text-white md:mt-0 mt-2">
                Apply Discount
              </button>
            </div>
          </div>

          <div className="lg:px-10 md:px-6 px-4 mt-12">
            <button className="flex justify-center items-center gap-4">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.233 4.4545C12.6723 4.89384 12.6723 5.60616 12.233 6.0455L7.40349 10.875H19.3125C19.9338 10.875 20.4375 11.3787 20.4375 12C20.4375 12.6213 19.9338 13.125 19.3125 13.125H7.40349L12.233 17.9545C12.6723 18.3938 12.6723 19.1062 12.233 19.5455C11.7937 19.9848 11.0813 19.9848 10.642 19.5455L3.892 12.7955C3.45267 12.3562 3.45267 11.6438 3.892 11.2045L10.642 4.4545C11.0813 4.01517 11.7937 4.01517 12.233 4.4545Z"
                  fill="#6B7280"
                />
              </svg>
              <p className="text-base leading-none text-gray-600">
                Continue Shopping
              </p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
