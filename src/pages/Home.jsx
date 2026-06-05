import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h1>Welcome to ShopEase</h1>
        <p>Your one-stop online shopping destination for everything you need.</p>
      </div>

      <Footer />
    </>
  );
};

export default Home;