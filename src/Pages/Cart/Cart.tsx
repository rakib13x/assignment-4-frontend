import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link to navigate
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
        e.returnValue = ""; // Modern browsers display a default message

        // Show warning with SweetAlert (optional)
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
          }
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when component unmounts
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

          {/* Total section */}
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

          {/* Checkout Button */}
          <div className="mt-8 flex justify-center">
            <Link
              to={{
                pathname: "/checkout", // Link to checkout page
              }}
              state={{ cartItems, total: calculateTotal() }} // Pass cart items and total to checkout page
            >
              <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
