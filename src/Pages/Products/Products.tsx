//@ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetAllProductsQuery } from "../../redux/features/Products/productsApi";

const Products = () => {
  const [text, setText] = useState(false);
  const [value, setValue] = useState("Latest");
  const [filter, setFilter] = useState(false);
  const [show, setShow] = useState(Array(14).fill(false));
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>("asc");

  const debouncedMinPrice = useDebounce(priceRange.min, 500);
  const debouncedMaxPrice = useDebounce(priceRange.max, 500);
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductsQuery({
    category: selectedCategory,
    minPrice: debouncedMinPrice ? parseFloat(debouncedMinPrice) : undefined,
    maxPrice: debouncedMaxPrice ? parseFloat(debouncedMaxPrice) : undefined,
    sortOrder,
  });

  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category).flat()),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleShow = (id: number) => {
    const arr = [...show];
    arr[id] = !show[id];
    setShow(arr);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    setValue(order === "asc" ? "Low to High" : "High to Low");
    setText(false);
  };

  const handleClearAll = () => {
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setSortOrder("asc");
    setValue("Latest");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      <NavBar />
      <div style={{ minHeight: 1250 }}>
        <div className="py-12 2xl:container flex-col 2xl:mx-auto px-4 md:px-6 lg:px-20 space-y-6 md:space-y-12 w-full flex justify-center items-center">
          <div className="text-center w-full flex justify-center items-center flex-col space-y-3 md:space-y-5"></div>
          <div className="flex relative w-full justify-start items-start lg:space-x-12 xl:space-x-32">
            {/* Filter Section */}
            <div
              id="menu4"
              className={`${
                filter ? "block" : "hidden lg:flex"
              } absolute lg:static z-10 inset-0 w-full h-full lg:h-auto lg:w-96 bg-white lg:bg-transparent shadow-md lg:shadow-none px-4 py-6 lg:px-0 lg:py-0 rounded-md lg:rounded-none lg:flex-col`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                <div className="flex justify-between lg:justify-center items-center w-full lg:w-auto">
                  <p className="text-lg font-medium leading-none text-gray-800">
                    Filters
                  </p>
                  <button
                    onClick={() => setFilter(false)} // Close filter on mobile
                    className="lg:hidden"
                  >
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 6L18 18"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleClearAll}
                  className="text-base font-medium leading-4 text-gray-600"
                >
                  Clear All
                </button>
              </div>
              <hr className="w-full my-8" />
              <div className="flex justify-start space-y-6 w-full items-start flex-col">
                <div className="flex w-full justify-between items-center">
                  <p className="text-xl font-semibold leading-5 text-gray-800">
                    Categories
                  </p>
                  <button onClick={() => handleShow(0)}>
                    <svg
                      id="menu1Icon"
                      className={`transform ${show[0] ? "rotate-180" : ""} `}
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z"
                        fill="#1F2937"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  id="menu1"
                  className={`${
                    show[0] ? "hidden" : ""
                  } flex justify-start items-start flex-col space-y-5`}
                >
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-center space-x-4"
                    >
                      <button
                        onClick={() => handleCategoryClick(category)}
                        aria-label="Checkbox"
                        className={`${
                          selectedCategory === category ? "bg-gray-800" : ""
                        } flex justify-center items-center shadow-inner w-5 h-5 border border-gray-400`}
                      >
                        {selectedCategory === category && (
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.9707 3.93572L6.03408 13.0062L2.02832 9.00039L3.00059 8.02812L5.9671 10.9946L12.9359 3.03027L13.9707 3.93572Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </button>
                      <p className="text-base leading-4 text-gray-600">
                        {category}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="w-full my-8" />
              <div className="flex justify-start flex-col items-start space-y-6">
                <p className="text-lg font-medium leading-none text-gray-800">
                  Price
                </p>
                <div className="flex justify-start items-center space-x-4">
                  <p className="text-sm w-24 leading-none text-gray-600">
                    Price Range
                  </p>
                  <input
                    className="border w-24 focus:outline-none text-sm font-medium leading-4 placeholder-gray-600 text-gray-600 border-gray-300 py-3 text-center"
                    placeholder="$0"
                    type="text"
                    name="min"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                  />
                  <div className="border border-gray-600 w-2"></div>
                  <input
                    className="border w-24 focus:outline-none text-sm font-medium leading-4 placeholder-gray-600 text-gray-600 border-gray-300 py-3 text-center"
                    placeholder="$250"
                    type="text"
                    name="max"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                  />
                </div>
              </div>
            </div>
            {/* Product Grid Section */}
            {/* Product Grid Section */}
            <div className="flex justify-start items-start w-full flex-col">
              <div className="flex md:flex-row flex-col-reverse justify-between md:items-end w-full">
                <div className="md:hidden mt-6 md:mt-0 flex space-x-2 items-center justify-center">
                  <button
                    className="px-4 py-3 bg-gray-200 text-gray-700"
                    onClick={() => setFilter(true)} // Show filter on mobile
                  >
                    Show Filters
                  </button>
                </div>
              </div>

              {/* Product List */}
              <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products?.length === 0 ? (
                  <p className="text-lg font-medium leading-6 text-gray-600">
                    No products available within the selected range.
                  </p>
                ) : (
                  products?.map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col justify-start items-start"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div className="w-full relative">
                        <img
                          className="w-full h-64 object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                        <div
                          className={`absolute top-0 right-0 bg-gray-800 p-1 ${
                            product.stock === 0 ? "" : "hidden"
                          }`}
                        >
                          <p className="text-sm leading-none text-white">
                            Out of Stock
                          </p>
                        </div>
                        <div className="absolute top-0 left-0 bg-gray-800 p-1">
                          <p className="text-sm leading-none text-white">New</p>
                        </div>
                      </div>
                      <p className="mt-4 md:mt-6 text-base md:text-lg font-medium leading-none text-gray-800">
                        {product.name}
                      </p>
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${
                              i < product.ratings
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="mt-3 text-xl lg:text-2xl font-medium leading-6 text-center text-gray-600">
                        ${product.price}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
