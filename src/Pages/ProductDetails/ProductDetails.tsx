import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useGetProductByIdQuery } from "../../redux/features/Products/productsApi";
import { addToCart } from "../../redux/reducer/cartReducer";
import { RootState } from "../../redux/store"; // Ensure you import RootState from your store

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id || "");
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state: RootState) => state.cart.items || []);
  const itemInCart = cartItems.find(
    (item: { _id: string }) => String(item._id) === String(id)
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const stockAvailable = product?.stock || 0;
    const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;

    if (quantity + currentQuantityInCart > stockAvailable) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot add more items than are in stock!",
      });
    } else {
      dispatch(addToCart(product, quantity)); // Pass the product and quantity separately
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${quantity} ${product?.name} added to cart!`,
      });
    }
  };

  const isAddToCartDisabled =
    product?.stock === 0 ||
    (itemInCart && itemInCart.quantity >= !product?.stock);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {"An error occurred"}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NavBar />
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={product?.images[0]}
                alt={product?.name}
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
              {/* <p className="text-gray-600 mb-4">SKU: {product?.sku}</p> */}
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  ${product?.price}
                </span>
                <span className="text-gray-500 line-through">$399.99</span>
              </div>

              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>

              <p className="text-gray-700 mb-6">
                {product?.description ||
                  "Experience premium sound quality and industry-leading noise cancellation with these wireless headphones. Perfect for music lovers and frequent travelers."}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                  <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                  <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isAddToCartDisabled}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  {isAddToCartDisabled ? "Out of Stock" : "Add to Cart"}
                </button>
                <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
