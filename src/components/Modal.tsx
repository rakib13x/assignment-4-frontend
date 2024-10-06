import { useForm } from "react-hook-form"; // Import react-hook-form
import { useCreateProductMutation } from "../redux/features/Products/productsApi";

interface ModalProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  price: string;
  description: string;
  stock: string;
  category: string;
  ratings: string;
  images: FileList;
}

const Modal = ({ onClose }: ModalProps) => {
  const [createProduct, { isLoading }] = useCreateProductMutation(); // Use the mutation hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.images.length === 0) {
      alert("Image is required");
      return;
    }

    // Create FormData to send to the server
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("ratings", data.ratings);
    formData.append("images", data.images[0]); // Append the first image

    try {
      // Trigger the createProduct mutation
      await createProduct(formData).unwrap();
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <>
      <div className="py-8">
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center px-2"
        >
          <div className="relative w-96 bg-white shadow px-3 md:px-6 pt-4 pb-6 rounded">
            <form onSubmit={handleSubmit(onSubmit)}>
              {" "}
              {/* Form submission handler */}
              <div className="mt-5">
                <input
                  type="file"
                  {...register("images", { required: true })} // Register file input with validation
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                />
                {errors.images && (
                  <span className="text-red-500 text-xs">
                    Image is required
                  </span>
                )}

                <input
                  type="text"
                  {...register("name", { required: true })} // Register text input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">Name is required</span>
                )}

                <input
                  type="text"
                  {...register("price", { required: true })}
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  placeholder="Price"
                />
                {errors.price && (
                  <span className="text-red-500 text-xs">
                    Price is required
                  </span>
                )}

                <input
                  type="text"
                  {...register("description", { required: true })}
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  placeholder="Description"
                />
                {errors.description && (
                  <span className="text-red-500 text-xs">
                    Description is required
                  </span>
                )}

                <input
                  type="text"
                  {...register("stock", { required: true })}
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  placeholder="Stock"
                />
                {errors.stock && (
                  <span className="text-red-500 text-xs">
                    Stock is required
                  </span>
                )}

                <input
                  type="text"
                  {...register("ratings", { required: true })}
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  placeholder="Ratings"
                />
                {errors.ratings && (
                  <span className="text-red-500 text-xs">
                    Ratings are required
                  </span>
                )}

                <input
                  type="text"
                  {...register("category", { required: true })}
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  placeholder="Category"
                />
                {errors.category && (
                  <span className="text-red-500 text-xs">
                    Category is required
                  </span>
                )}
              </div>
              <div className="flex space-x-6 items-center justify-end w-full mt-5">
                <button
                  onClick={onClose}
                  className="w-1/2 py-3 bg-indigo-100 hover:bg-indigo-200 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-indigo-700 hover:bg-opacity-80 rounded"
                >
                  {isLoading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
