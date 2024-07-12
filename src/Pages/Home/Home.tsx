import { useGetAllProductsQuery } from "../../redux/features/Products/productsApi";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({});
  console.log(data);
  return <div>Home</div>;
};

export default Home;
