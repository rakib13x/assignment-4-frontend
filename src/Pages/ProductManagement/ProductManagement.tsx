import { useState } from "react";
import Modal from "../../components/Modal";

const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
                    name
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Price
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Category
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
                <tr className="h-24 border-gray-300 border-t border-b hover:border-indigo-300 hover:shadow-md cursor-pointer transition duration-150 ease-in-out">
                  <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 tracking-normal leading-4">
                    06/02/2020
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    9:00 am
                  </td>
                  <td className="pr-6">
                    <div className="w-full flex justify-start items-center h-full">
                      <div className="bg-indigo-200 text-indigo-700 rounded-full text-sm leading-3 py-2 px-5">
                        New
                      </div>
                    </div>
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    Saun Berenson
                  </td>
                  <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal leading-4">
                    <div className="flex items-center">
                      <a
                        className="rounded border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                        href="javascript: void(0)"
                      >
                        <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-indigo-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-edit"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
                            <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0-3-3l-8.5 8.5v3" />
                            <line x1={16} y1={5} x2={19} y2={8} />
                          </svg>
                        </div>
                      </a>
                      <a
                        className="mx-2 rounded border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                        href="javascript: void(0)"
                      >
                        <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-indigo-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-settings"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <circle cx={12} cy={12} r={3} />
                          </svg>
                        </div>
                      </a>
                      <a
                        className="rounded border border-transparent focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                        href="javascript: void(0)"
                      >
                        <div className="p-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-trash"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={4} y1={7} x2={20} y2={7} />
                            <line x1={10} y1={11} x2={10} y2={17} />
                            <line x1={14} y1={11} x2={14} y2={17} />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
                            <path d="M9 7v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </div>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
};

export default ProductManagement;
