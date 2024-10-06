import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import AboutPage from "../Pages/AboutPage/AboutPage";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/CheckOut/CheckOut";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ProductManagement from "../Pages/ProductManagement/ProductManagement";
import Products from "../Pages/Products/Products";
import Success from "../Pages/Success/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "allProducts",
        element: <Products />,
      },
      {
        path: "product-management",
        element: <ProductManagement />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkOut",
        element: <Checkout />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
