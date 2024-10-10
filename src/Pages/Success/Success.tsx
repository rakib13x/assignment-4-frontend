import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
      <p className="text-lg mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Success;
