const RenderStars = ({ rating }) => {
  console.log("Rating:", rating);
  const totalStars = 5;
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 !== 0;
  let emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <svg
            key={`full-${index}`}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
          </svg>
        ))}
      {halfStar && (
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
            key={`half-${index}`}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="50%"
                  style={{ stopColor: "currentColor", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "currentColor", stopOpacity: 0 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M12 2l2.39 4.842 5.35.777-3.87 3.774.914 5.33L12 14.956l-4.784 2.767.914-5.33-3.87-3.774 5.35-.777L12 2z"
              fill="url(#half-fill)"
            />
          </svg>
        </svg>
      )}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <svg
            key={`empty-${index}`}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              key={`empty-${index}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2l2.39 4.842 5.35.777-3.87 3.774.914 5.33L12 14.956l-4.784 2.767.914-5.33-3.87-3.774 5.35-.777L12 2z"
                fill="none"
                stroke="currentColor"
              />
            </svg>
          </svg>
        ))}
    </>
  );
};

export default RenderStars;
