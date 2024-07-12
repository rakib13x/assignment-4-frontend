import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import RenderStars from "../../components/RenderStars";
import { useGetProductByIdQuery } from "../../redux/features/Products/productsApi";

const ProductDetails = () => {
  const { id } = useParams(); // Access the product ID from the URL
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  console.log(product?.data?.ratings);
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const addToCart = () => {
    if (quantity > product?.data?.stock) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot add more items than are in stock!",
      });
    } else {
      // Proceed to add to cart
      console.log("Added to cart", quantity);
    }
  };

  useEffect(() => {
    document.querySelector("body").addEventListener("click", (e) => {
      // e.stopPropagation();
      console.log("body");
      if (
        document.getElementById("drop-down-div1").classList.contains("active")
      ) {
        document.getElementById("drop-down-div1").classList.add("hidden");
        document.getElementById("drop-down-div1").classList.remove("active");
      }
    });
  });
  function showDropDownMenu(el) {
    document.querySelectorAll(".hideme").forEach((el) => {
      el.classList.remove("active");
    });
    el.parentElement.children[1].classList.add("active");
    el.parentElement.children[1].classList.remove("hidden");
  }
  function text(el) {
    const targetText = el.innerText;
    document.getElementById("drop-down-content-setter1").innerText = targetText;
    document.getElementById("drop-down-div1").classList.toggle("hidden");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || "An error occurred"}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div className="bg-gray-800">
        <div className="px-4 py-12">
          <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[373px] lg:px-10 md:px-6 px-4 py-16 bg-white mx-auto">
            <div className="lg:flex">
              <div>
                <img
                  src={product?.data?.images[0]}
                  alt={product?.data?.name}
                  className=""
                />
              </div>
              <div className="bg-gray-50 lg:px-12 md:px-6 px-4 lg:py-12 md:py-6 py-6">
                <p className="lg:text-4xl text-3xl font-semibold text-gray-800 lg:max-w-[528px] w-full">
                  {product?.data?.name}
                </p>
                <p className="text-2xl font-semibold leading-normal text-gray-800 mt-6">
                  {product?.data?.price}
                </p>
                <div className="flex mt-6 gap-2">
                  <RenderStars rating={product?.data?.ratings} />
                </div>
                <div className="mt-8">
                  <ul className="marker:text-gray-600 list-disc px-4">
                    <li className="mt-6">
                      <p className="text-base text-gray-600 leading-normal lg:w-1/2 w-full">
                        {product?.data?.description}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <p className="text-base font-medium leading-tight text-gray-800 mt-6">
                    Quantity (Available: {product?.data?.stock})
                  </p>
                  <div className="lg:flex gap-4 w-full mt-6">
                    <div className="lg:flex gap-4 w-full mt-6">
                      <div className="lg:w-[23%] w-full">
                        <input
                          type="number"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="lg:max-w-[100px] w-full bg-white border px-5 py-[12px]"
                          min="1"
                          max={product.stock}
                        />
                      </div>
                      <button
                        onClick={addToCart}
                        className="lg:max-w-[412px] w-full bg-gray-800 text-white hover:bg-gray-700 duration-300 py-3 lg:mt-0 mt-4"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:block md:hidden block">
              <div className="lg:flex gap-1 justify-evenly mt-8">
                <div className="flex items-center lg:items-start xl:items-center gap-2">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 10.7431L5.52094 6.62265C5.80922 5.95188 6.54375 5.50781 7.36453 5.50781H16.6355C17.4563 5.50781 18.1908 5.95188 18.4791 6.62265L20.25 10.7431"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.25 17.4733V10.7422H12H3.75V17.4733H20.25Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.25047 17.4766V18.9724H3.75V17.4766"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.2505 17.4766V18.9724H18.75V17.4766"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.75023 14.4802C7.16458 14.4802 7.50047 14.1453 7.50047 13.7323C7.50047 13.3192 7.16458 12.9844 6.75023 12.9844C6.33589 12.9844 6 13.3192 6 13.7323C6 14.1453 6.33589 14.4802 6.75023 14.4802Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.2502 14.4802C17.6646 14.4802 18.0005 13.7323 18.0005 13.7323L17.2502 12.9844C17.2502 12.9844 16.5 13.3192 16.5 13.7323C16.5 14.1453 16.8359 14.4802 17.2502 14.4802Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    We deliver it to you
                  </p>
                </div>
                <div className="flex items-center lg:items-start xl:items-center gap-2 lg:mt-0 mt-4">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8.00043V21.0004M12 8.00043C11.6383 6.50983 11.0154 5.2355 10.2127 4.3436C9.41003 3.4517 8.46469 2.98363 7.5 3.00044C6.83696 3.00044 6.20107 3.26383 5.73223 3.73267C5.26339 4.20151 5 4.8374 5 5.50044C5 6.16348 5.26339 6.79936 5.73223 7.2682C6.20107 7.73705 6.83696 8.00044 7.5 8.00044M12 8.00043C12.3617 6.50983 12.9846 5.2355 13.7873 4.3436C14.59 3.4517 15.5353 2.98363 16.5 3.00044C17.163 3.00044 17.7989 3.26383 18.2678 3.73267C18.7366 4.20151 19 4.8374 19 5.50044C19 6.16348 18.7366 6.79936 18.2678 7.2682C17.7989 7.73705 17.163 8.00044 16.5 8.00044M19 12.0004V19.0004C19 19.5309 18.7893 20.0396 18.4142 20.4146C18.0391 20.7897 17.5304 21.0004 17 21.0004H7C6.46957 21.0004 5.96086 20.7897 5.58579 20.4146C5.21071 20.0396 5 19.5309 5 19.0004V12.0004M4 8.00043H20C20.5523 8.00043 21 8.44814 21 9.00043V11.0004C21 11.5527 20.5523 12.0004 20 12.0004H4C3.44772 12.0004 3 11.5527 3 11.0004V9.00043C3 8.44814 3.44772 8.00043 4 8.00043Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    Get gift through your order
                  </p>
                </div>
                <div className="flex items-center lg:items-start xl:items-center gap-2 lg:mt-0 mt-4">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 13L15 11M8 18V17C8 15.9391 7.57857 14.9217 6.82843 14.1716C6.07828 13.4214 5.06087 13 4 13H3M10 12L11.5 9M4 6H9.426C9.60063 6.00012 9.77219 6.04598 9.9236 6.133C10.075 6.22002 10.201 6.34517 10.289 6.496L11.353 8.319C11.5574 8.66957 11.8309 8.97502 12.1568 9.21686C12.4827 9.4587 12.8542 9.63191 13.249 9.726L17.926 10.84C18.8012 11.0483 19.5806 11.5455 20.1384 12.2513C20.6961 12.9571 20.9997 13.8304 21 14.73V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H4C3.73478 18 3.48043 17.8946 3.29289 17.7071C3.10536 17.5196 3 17.2652 3 17V7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    Custom designs are available
                  </p>
                </div>
                <div className="flex items-center lg:items-start xl:items-center gap-2 lg:mt-0 mt-4">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.7 8C16.501 7.43524 16.1374 6.94297 15.6563 6.58654C15.1751 6.23011 14.5983 6.02583 14 6H10C9.20435 6 8.44129 6.31607 7.87868 6.87868C7.31607 7.44129 7 8.20435 7 9C7 9.79565 7.31607 10.5587 7.87868 11.1213C8.44129 11.6839 9.20435 12 10 12H14C14.7956 12 15.5587 12.3161 16.1213 12.8787C16.6839 13.4413 17 14.2044 17 15C17 15.7956 16.6839 16.5587 16.1213 17.1213C15.5587 17.6839 14.7956 18 14 18H10C9.40175 17.9742 8.82491 17.7699 8.34373 17.4135C7.86255 17.057 7.49905 16.5648 7.3 16M12 3V6M12 18V21"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    Get 20% off on your next order
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:hidden md:block hidden mt-6">
              <div className="flex justify-between">
                <div className="flex items-center lg:items-start xl:items-center gap-2">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.75 10.7431L5.52094 6.62265C5.80922 5.95188 6.54375 5.50781 7.36453 5.50781H16.6355C17.4563 5.50781 18.1908 5.95188 18.4791 6.62265L20.25 10.7431"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.25 17.4733V10.7422H12H3.75V17.4733H20.25Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.25047 17.4766V18.9724H3.75V17.4766"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.2505 17.4766V18.9724H18.75V17.4766"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.75023 14.4802C7.16458 14.4802 7.50047 14.1453 7.50047 13.7323C7.50047 13.3192 7.16458 12.9844 6.75023 12.9844C6.33589 12.9844 6 13.3192 6 13.7323C6 14.1453 6.33589 14.4802 6.75023 14.4802Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.2502 14.4802C17.6646 14.4802 18.0005 13.7323 18.0005 13.7323L17.2502 12.9844C17.2502 12.9844 16.5 13.3192 16.5 13.7323C16.5 14.1453 16.8359 14.4802 17.2502 14.4802Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    We deliver it to you
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8.00043V21.0004M12 8.00043C11.6383 6.50983 11.0154 5.2355 10.2127 4.3436C9.41003 3.4517 8.46469 2.98363 7.5 3.00044C6.83696 3.00044 6.20107 3.26383 5.73223 3.73267C5.26339 4.20151 5 4.8374 5 5.50044C5 6.16348 5.26339 6.79936 5.73223 7.2682C6.20107 7.73705 6.83696 8.00044 7.5 8.00044M12 8.00043C12.3617 6.50983 12.9846 5.2355 13.7873 4.3436C14.59 3.4517 15.5353 2.98363 16.5 3.00044C17.163 3.00044 17.7989 3.26383 18.2678 3.73267C18.7366 4.20151 19 4.8374 19 5.50044C19 6.16348 18.7366 6.79936 18.2678 7.2682C17.7989 7.73705 17.163 8.00044 16.5 8.00044M19 12.0004V19.0004C19 19.5309 18.7893 20.0396 18.4142 20.4146C18.0391 20.7897 17.5304 21.0004 17 21.0004H7C6.46957 21.0004 5.96086 20.7897 5.58579 20.4146C5.21071 20.0396 5 19.5309 5 19.0004V12.0004M4 8.00043H20C20.5523 8.00043 21 8.44814 21 9.00043V11.0004C21 11.5527 20.5523 12.0004 20 12.0004H4C3.44772 12.0004 3 11.5527 3 11.0004V9.00043C3 8.44814 3.44772 8.00043 4 8.00043Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    Get gift through your order
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <div className="flex items-center gap-2">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 13L15 11M8 18V17C8 15.9391 7.57857 14.9217 6.82843 14.1716C6.07828 13.4214 5.06087 13 4 13H3M10 12L11.5 9M4 6H9.426C9.60063 6.00012 9.77219 6.04598 9.9236 6.133C10.075 6.22002 10.201 6.34517 10.289 6.496L11.353 8.319C11.5574 8.66957 11.8309 8.97502 12.1568 9.21686C12.4827 9.4587 12.8542 9.63191 13.249 9.726L17.926 10.84C18.8012 11.0483 19.5806 11.5455 20.1384 12.2513C20.6961 12.9571 20.9997 13.8304 21 14.73V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H4C3.73478 18 3.48043 17.8946 3.29289 17.7071C3.10536 17.5196 3 17.2652 3 17V7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6Z"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    Custom designs are available
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.7 8C16.501 7.43524 16.1374 6.94297 15.6563 6.58654C15.1751 6.23011 14.5983 6.02583 14 6H10C9.20435 6 8.44129 6.31607 7.87868 6.87868C7.31607 7.44129 7 8.20435 7 9C7 9.79565 7.31607 10.5587 7.87868 11.1213C8.44129 11.6839 9.20435 12 10 12H14C14.7956 12 15.5587 12.3161 16.1213 12.8787C16.6839 13.4413 17 14.2044 17 15C17 15.7956 16.6839 16.5587 16.1213 17.1213C15.5587 17.6839 14.7956 18 14 18H10C9.40175 17.9742 8.82491 17.7699 8.34373 17.4135C7.86255 17.057 7.49905 16.5648 7.3 16M12 3V6M12 18V21"
                      stroke="#4B5563"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-base leading-none text-gray-600">
                    Get 20% off on your next order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
