import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
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
    ],
  },
]);
