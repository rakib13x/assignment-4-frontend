import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import NavBar from "../../components/NavBar";
import UpdateModal from "../../components/UpdateModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/features/Products/productsApi";

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Store the entire product

  const { data: products = [], isLoading } = useGetAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const handleUpdateProductClick = (product: any) => {
    setSelectedProduct(product); // Set the entire product here
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProduct(null); // Clear the selected product
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }

    try {
      await deleteProduct(productId).unwrap();
      Swal.fire({
        title: "Product Added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error creating the product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="py-12">
        <div className="mx-auto container bg-white shadow rounded">
          <div className="flex flex-col lg:flex-row p-8 justify-around items-start lg:items-stretch w-full">
            <div className="w-full lg:w-1/4 xl:w-1/3 flex flex-col lg:flex-row items-start lg:items-center"></div>
            <div className="w-full lg:w-3/4 xl:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="relative w-full lg:w-1/4 my-2 lg:my-0 lg:mx-2 xl:mx-4 z-10"></div>
              <div className="relative w-full lg:w-1/4 my-2 lg:my-0 lg:mx-2 xl:mx-4 z-10"></div>
              <button
                className="focus:shadow-outline-gray border border-transparent w-auto lg:w-1/4 my-2 lg:my-0 lg:ml-2 xl:ml-4 bg-indigo-700 transition focus:outline-none focus:border-gray-800 focus:shadow-outline-gray duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-sm"
                onClick={handleAddProductClick}
              >
                Add Product
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 bg-indigo-100">
                  <th className="pl-8 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Image
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Name
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Price
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Category
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Stock
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Action
                  </th>
                  <td className="pr-8">
                    <button className="w-32 opacity-0 bg-gray-200 transition duration-150 ease-in-out focus:outline-none focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 py-1 text-sm cursor-default">
                      Start Session
                    </button>
                  </td>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="h-24 border-gray-300 border-t border-b hover:border-indigo-300 hover:shadow-md cursor-pointer transition duration-150 ease-in-out"
                    >
                      <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 tracking-normal leading-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                        {product.name}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                        ${product.price}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                        {product.category.join(", ")}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                        {product.stock}
                      </td>
                      <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                        <div className="flex items-center">
                          <button
                            className="rounded focus:outline-none"
                            onClick={() => handleUpdateProductClick(product)} // Pass entire product
                          >
                            <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-indigo-700">
                              <FaEdit className="size-5" />
                            </div>
                          </button>

                          <button
                            className="rounded focus:outline-none"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-red-500">
                              <MdDelete className="size-5" />
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
      {isUpdateModalOpen && selectedProduct && (
        <UpdateModal
          onClose={handleCloseUpdateModal}
          product={selectedProduct}
        />
      )}
      <Footer />
    </>
  );
};

export default ProductManagement;
