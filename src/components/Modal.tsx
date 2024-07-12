interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  return (
    <>
      <div className="py-8">
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center px-2"
        >
          <div className="relative w-96 bg-gray-600 shadow px-3 md:px-6 pt-4 pb-6 rounded">
            <div className="flex items-center">
              <div className="pl-4"></div>
            </div>
            <div className="mt-5">
              <div className="bg-gray-50 border rounded border-gray-200 mt-3">
                <input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  type="text"
                  placeholder="Image"
                />
              </div>
              <div className="bg-gray-50 border rounded border-gray-200 mt-3">
                <input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="bg-gray-50 border rounded border-gray-200 mt-3">
                <input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  type="text"
                  placeholder="Price"
                />
              </div>
              <div className="bg-gray-50 border rounded border-gray-200 mt-3">
                <input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="bg-gray-50 border rounded border-gray-200 mt-3">
                <input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  type="text"
                  placeholder="Stock"
                />
              </div>
              <div className="bg-gray-50 border rounded border-gray-200 mt-3">
                <input
                  className="py-3 pl-4 bg-transparent text-sm font-medium leading-none text-gray-600 placeholder-gray-600 w-full focus:outline-none"
                  type="text"
                  placeholder="Ratings"
                />
              </div>
              <div className="mt-3 px-3 bg-gray-50 border rounded border-gray-200">
                <select className="bg-transparent border-none focus:outline-none py-3 w-full text-xs font-medium leading-3 text-gray-600">
                  <option selected hidden>
                    Country
                  </option>
                  <option>Pakistan</option>
                  <option>India</option>
                  <option>Russia</option>
                  <option>China</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-6 items-center justify-end w-full mt-5">
              <button
                onClick={onClose}
                className="w-1/2 focus:outline-none py-3 bg-indigo-100 hover:bg-indigo-200 rounded"
              >
                <p className="text-xs font-medium leading-3 text-indigo-700">
                  Back
                </p>
              </button>
              <button className="w-1/2 focus:outline-none py-3 bg-indigo-700 hover:bg-opacity-80 rounded">
                <p className="text-xs font-medium leading-3 text-gray-100">
                  Add
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
