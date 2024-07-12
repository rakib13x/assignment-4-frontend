import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Cart from "../Pages/Cart/Cart";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ProductManagement from "../Pages/ProductManagement/ProductManagement";
import Products from "../Pages/Products/Products";

export const router = createBrowserRouter([
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
    ],
  },
]);
