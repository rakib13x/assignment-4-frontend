//@ts-ignore
const RenderStars = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          fill={index < filledStars ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 ${
            index < filledStars ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 17.27l-5.18 2.73 1-5.77L2 9.24l5.81-.84L12 2l2.19 6.4 5.81.84-4.22 4.99 1 5.77z"
          />
        </svg>
      ))}
    </div>
  );
};

export default RenderStars;
