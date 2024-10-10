import { Link } from "react-router-dom";
import liteGear from "../assets/images/lite-gear.webp";
import outDoor from "../assets/images/outdoor-apparel.webp";
import petCamp from "../assets/images/pet-camp.webp";
import survivingGear from "../assets/images/surviving-gear.webp";
const Category = () => {
  return (
    <Link to="/allProducts">
      <div>
        <div className="pb-16">
          <div className="flex justify-center items-center">
            <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
              <div className="flex flex-col jusitfy-center items-center space-y-10">
                <div className="flex flex-col justify-center items-center space-y-2">
                  <p className="text-xl leading-5 text-gray-600">
                    2024 Trendsetters
                  </p>
                  <h1 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                    Shop By Category
                  </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4  w-full">
                  <div className="relative group flex justify-center items-center h-full w-full">
                    <img
                      className="object-center object-cover h-full w-full"
                      src={petCamp}
                      alt="petCamp"
                    />
                    {/* <Link to="/allProducts"> */}
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                      Pet Camp
                    </button>
                    {/* </Link> */}
                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                  </div>
                  <div className="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-0">
                    <div className="relative group flex justify-center items-center h-full w-full">
                      <img
                        className="object-center object-cover h-full w-full"
                        src={survivingGear}
                        alt="survivingGear"
                      />
                      <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                        Surviving Gear
                      </button>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                    <div className="relative group flex justify-center items-center h-full w-full">
                      <img
                        className="object-center object-cover h-full w-full"
                        src={outDoor}
                        alt="OutDoor"
                      />
                      <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                        Outdoor Apparel
                      </button>
                      <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                    </div>
                  </div>
                  <div className="relative group justify-center items-center h-full w-full hidden lg:flex">
                    <img
                      className="object-center object-cover h-full w-full"
                      src={liteGear}
                      alt="liteGear"
                    />
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                      Lite Gear
                    </button>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                  </div>
                  <div className="relative group flex justify-center items-center h-full w-full mt-4 md:hidden md:mt-8 lg:hidden">
                    <img
                      className="object-center object-cover h-full w-full"
                      src={liteGear}
                      alt="liteGear"
                    />
                    <img
                      className="object-center object-cover h-full w-full"
                      src={liteGear}
                      alt="liteGear"
                    />
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                      Lite Gear
                    </button>
                    <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                  </div>
                </div>
                <div className="relative group hidden md:flex justify-center items-center h-full w-full mt-4 md:mt-8 lg:hidden">
                  <img
                    className="object-center object-cover h-full w-full"
                    src={liteGear}
                    alt="liteGear"
                  />
                  <img
                    className="object-center object-cover h-full w-full"
                    src={liteGear}
                    alt="liteGear"
                  />
                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white">
                    Lite Gear
                  </button>
                  <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
