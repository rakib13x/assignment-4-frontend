import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useUpdateProductMutation } from "../redux/features/Products/productsApi";

interface UpdateModalProps {
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    price: string;
    description: string;
    stock: string;
    category: string;
    ratings: string;
    imageUrl: string;
  };
}

interface FormData {
  name: string;
  price: string;
  description: string;
  stock: string;
  category: string;
  ratings: string;
  image: FileList;
}

const UpdateModal = ({ onClose, product }: UpdateModalProps) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: product
      ? {
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          category: product.category,
          ratings: product.ratings,
        }
      : {},
  });

  const onSubmit = async (data: FormData) => {
    if (!product) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("ratings", data.ratings);

    if (data.image.length > 0) {
      formData.append("images", data.image[0]);
    }

    try {
      await updateProduct({ id: product.id, formData }).unwrap();
      Swal.fire({
        title: "Product updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      onClose();
    } catch (error) {
      console.error("Failed to update product:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!product) {
    return (
      <div className="py-8">
        <div role="alert" className="container mx-auto">
          <div className="relative py-8 px-5 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-gray-800 font-lg font-bold">
              Product Not Found
            </h1>
            <p className="text-gray-600">
              There was an error loading the product details.
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-gray-100 text-gray-800 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="py-8 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="updateModal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Update Product Details
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Product Image
            </label>
            <input
              type="file"
              {...register("image")}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            />
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt="Product"
                className="w-24 h-24 object-cover mb-3"
              />
            )}

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Name"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">Name is required</span>
            )}

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Price
            </label>
            <input
              type="text"
              {...register("price", { required: true })}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Price"
            />
            {errors.price && (
              <span className="text-red-500 text-xs">Price is required</span>
            )}

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Description
            </label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Description"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                Description is required
              </span>
            )}

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Stock
            </label>
            <input
              type="text"
              {...register("stock", { required: true })}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Stock"
            />
            {errors.stock && (
              <span className="text-red-500 text-xs">Stock is required</span>
            )}

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Ratings
            </label>
            <input
              type="text"
              {...register("ratings", { required: true })}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ratings"
            />
            {errors.ratings && (
              <span className="text-red-500 text-xs">Ratings are required</span>
            )}

            <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: true })}
              className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Category"
            />
            {errors.category && (
              <span className="text-red-500 text-xs">Category is required</span>
            )}

            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={onClose}
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
