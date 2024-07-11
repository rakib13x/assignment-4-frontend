import about1 from "../assets/images/resource/about-1.jpg";
import shape3 from "../assets/images/shape/shape-3.png";
import shape4 from "../assets/images/shape/shape-4.png";
const About = () => {
  return (
    <>
      <div className="px-4 py-12">
        <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] w-full  py-12 bg-gray-100 mx-auto">
          <section className="relative py-[120px]">
            <img
              className=" absolute left-0 top-0 right-0 inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              src={shape4}
            />
            <div className="auto-container">
              <div className="flex flex-row">
                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                  <div className="relative block mr-[70px]">
                    <div className=" relative mr-[70px]">
                      <div className="text absolute top-[250px] left-[-340px] text-[100px] leading-[100px] font-light text-white uppercase transform rotate-90 tracking-[30px]">
                        amping
                      </div>
                      <img
                        className=" absolute right-0 bottom-0 w-full h-[95px] bg-no-repeat"
                        src={shape3}
                        // style="background-image: url(assets/images/shape/shape-3.png);"
                      />
                      <figure className="image">
                        <img
                          src={about1}
                          alt=""
                          className="w-full clip-path-[polygon(0%_0%,100%_0%,100%_86%,0%_100%,0%_0%)]"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                  <div className="">
                    <div className="relative block -mt-[8px]">
                      <div className="relative block mb-[34px]">
                        <span className="relative block text-[30px] leading-[40px] font-amatic font-bold text-customGreen mb-[6px]">
                          Our Introductions
                        </span>
                        <h2 className="block text-[55px] leading-[66px] font-black">
                          Welcome to Camp of Summers
                        </h2>
                      </div>
                      <div className="text relative pl-[80px] mb-[37px]">
                        <div className="icon-box absolute left-0 top-[10px] text-[65px] leading-[65px]">
                          <i className="flaticon-camping"></i>
                        </div>
                        <p className="text-[24px] leading-[40px]">
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                      </div>
                      <ul className="list-style-one mb-[44px]">
                        <li className="relative block text-[18px] leading-[30px] pl-[32px] mb-[10px] before:content-['\f058'] before:font-awesome before:absolute before:left-0 before:top-0 before:text-[16px] before:font-bold">
                          Refresing to get such a personal touch.
                        </li>
                        <li className="relative block text-[18px] leading-[30px] pl-[32px] mb-[10px] before:content-['\f058'] before:font-awesome before:absolute before:left-0 before:top-0 before:text-[16px] before:font-bold">
                          Duis aute irure dolor in reprehenderit in voluptate.
                        </li>
                        <li className="relative block text-[18px] leading-[30px] pl-[32px] mb-0 before:content-['\f058'] before:font-awesome before:absolute before:left-0 before:top-0 before:text-[16px] before:font-bold">
                          Velit esse cillum dolore eu fugiat nulla pariatur.
                        </li>
                      </ul>
                      <div className="btn-box">
                        <a href="about.html" className="theme-btn btn-one">
                          Discover More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
