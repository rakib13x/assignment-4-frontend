import campingBlog1 from "../assets/images/camping-blog-1.jpg";
import campingBlog2 from "../assets/images/camping-blog-2.jpg";
import campingBlog3 from "../assets/images/camping-blog-3.jpeg";
const Blog = () => {
  return (
    <section className="w-screen py-20">
      <h1 className="mb-12 text-center font-sans text-5xl font-bold">
        Our Blog
      </h1>
      <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
        <article className="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
          <img
            className="w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-36 lg:h-48"
            src={campingBlog1}
            alt="blog-1"
          />
          <h2 className="title-font inline-block cursor-pointer px-6 pt-4 pb-1 text-xs font-semibold uppercase tracking-widest text-orange-600 hover:font-bold">
            Adventure
          </h2>
          <div className="py-1 px-6">
            <h1 className="title-font mb-3 inline-block cursor-pointer text-xl capitali font-extrabold tracking-wide text-gray-800">
              Escape the City: Discover Tranquility in Nature's Heart
            </h1>
            <p className="line-clamp-6 mb-3 cursor-pointer overflow-hidden leading-relaxed text-gray-500">
              Blog content can focus on how camping allows you to reconnect with
              nature, offering peace and solitude away from the bustling city
              life.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between px-6 pt-1 pb-4">
            <div className="flex flex-wrap text-sm text-gray-500">
              <span className="mr-1">Oct 15, 2024</span>
              <span className="">· 9 min read</span>
            </div>
            <div className="mt-1">
              <span className="mr-3 ml-auto inline-flex items-center py-1 pr-3 text-sm leading-none text-gray-400 md:ml-0 lg:ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                3.5K
              </span>
            </div>
          </div>
        </article>

        <article className="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
          <img
            className="w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-36 lg:h-48"
            src={campingBlog2}
            alt="blog-2"
          />
          <h2 className="title-font inline-block cursor-pointer px-6 pt-4 pb-1 text-xs font-semibold uppercase tracking-widest text-orange-600 hover:font-bold">
            Outdoor Life
          </h2>
          <div className="py-1 px-6">
            <h1 className="title-font mb-3 inline-block cursor-pointer text-xl capitali font-extrabold tracking-wide text-gray-800">
              Top 5 Must-Have Gear for the Ultimate Camping Experience
            </h1>
            <p className="line-clamp-6 mb-3 cursor-pointer overflow-hidden leading-relaxed text-gray-500">
              The blog can cover essential camping gear and tools to enhance
              your outdoor adventure and ensure a safe and enjoyable trip.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between px-6 pt-1 pb-4">
            <div className="flex flex-wrap text-sm text-gray-500">
              <span className="mr-1">Oct 20, 2024</span>
              <span className="">· 9 min read</span>
            </div>
            <div className="mt-1">
              <span className="mr-3 ml-auto inline-flex items-center py-1 pr-3 text-sm leading-none text-gray-400 md:ml-0 lg:ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                3.5K
              </span>
            </div>
          </div>
        </article>

        <article className="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
          <img
            className="w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-36 lg:h-48"
            src={campingBlog3}
            alt="blog-3"
          />
          <h2 className="title-font inline-block cursor-pointer px-6 pt-4 pb-1 text-xs font-semibold uppercase tracking-widest text-orange-600 hover:font-bold">
            Wilderness
          </h2>
          <div className="py-1 px-6">
            <h1 className="title-font mb-3 inline-block cursor-pointer text-xl capitali font-extrabold tracking-wide text-gray-800">
              The Joys of Campfire Cooking: Delicious Recipes for the Outdoors
            </h1>
            <p className="line-clamp-6 mb-3 cursor-pointer overflow-hidden leading-relaxed text-gray-500">
              This post can highlight how to cook flavorful meals while camping,
              with easy-to-follow recipes perfect for outdoor enthusiasts.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between px-6 pt-1 pb-4">
            <div className="flex flex-wrap text-sm text-gray-500">
              <span className="mr-1">Oct 30, 2024</span>
              <span className="">· 9 min read</span>
            </div>
            <div className="mt-1">
              <span className="mr-3 ml-auto inline-flex items-center py-1 pr-3 text-sm leading-none text-gray-400 md:ml-0 lg:ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                3.5K
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Blog;
