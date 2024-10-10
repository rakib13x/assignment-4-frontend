import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useGetBestSellingProductsQuery } from "../redux/features/Products/productsApi";

const BestSelling = () => {
  const { data, error, isLoading } = useGetBestSellingProductsQuery();
  const products = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading best-selling products</div>;

  return (
    <>
      <div id="Projects" className="w-fit mx-auto mt-10 mb-5">
        <section className="mx-auto max-w-md sm:max-w-lg md:max-w-screen-xl">
          <div className="px-4 py-8 md:px-6 md:py-12 lg:px-20">
            <h1 className="text-center text-3xl font-semibold text-gray-800 lg:text-4xl">
              Our Best Selling Collection
            </h1>

            {/* Dynamically render the first 3 products */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14">
              {products?.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                >
                  {/* Link to the product details page using product._id */}
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.productDetails.images[0]} // Assuming images array
                      alt={product.productDetails.name}
                      className="h-80 w-72 object-cover rounded-t-xl"
                    />
                    <div className="px-4 py-3 w-72">
                      <span className="text-gray-400 mr-3 uppercase text-xs">
                        Brand
                      </span>
                      <p className="text-lg font-bold text-black truncate block capitalize">
                        {product.productDetails.name}
                      </p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">
                          ${product.productDetails.price}
                        </p>
                        <del>
                          <p className="text-sm text-gray-600 cursor-auto ml-2">
                            $199
                          </p>
                        </del>
                        <div className="ml-auto">
                          <CgDetailsMore />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="flex justify-center">
        <Link
          to="/allProducts"
          className=" text-black border border-black py-2 px-6 gap-2 rounded inline-flex items-center"
        >
          <span>View Products</span>
          <svg
            className="w-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            // className="w-6 h-6 ml-2"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </>
  );
};

export default BestSelling;
