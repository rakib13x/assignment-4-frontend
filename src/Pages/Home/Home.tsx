import BestSelling from "../../components/BestSelling";
import Blog from "../../components/Blog";
import Category from "../../components/Category";
import Faq from "../../components/Faq";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import NavBar from "../../components/NavBar";
import Partner from "../../components/Partner";
import { useGetAllProductsQuery } from "../../redux/features/Products/productsApi";

const Home = () => {
  const { data } = useGetAllProductsQuery({});
  console.log(data);
  return (
    <div>
      <NavBar />
      <Hero />
      <BestSelling />
      <Category />
      <Blog />
      <Partner />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
