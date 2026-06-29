import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";
import { toast } from "react-toastify";


// ── Single Product Card ──────────────────────────────────
// ✅ Correct field names
const ProductCard = ({ product }) => {

  // ── Add to Cart button handler ───────────────────────────
  const handleAddToCart = (product) => {
    // alert("Product added to cart!");
    toast("Product added to cart");
    console.log("Added to cart:", product);
  };

  
  return (
    <div className="product-card">
      <img
        src={product.productImage}       // ✅ correct
        alt={product.productName}      // ✅ correct
        className="product-image"
      />
      <div className="product-info">
        <p className="product-name text-black" >{product.productName}</p>  
        <p className="product-price">₹{product.productPrice}</p>   
        <button
          className="btn btn-warning btn-sm w-100 fw-bold"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// ── Category Section (reused for all 6 categories) ───────
const CategorySection = ({ title, emoji, products, handleAddToCart }) => {

  // Left column  → first 4 products  (index 0,1,2,3)
  const leftColumn  = products.slice(0, 4);

  // Right column → next 4 products   (index 4,5,6,7)
  const rightColumn = products.slice(4, 8);

  return (
    <div className="category-section">

      {/* Category Title */}
      <h2 className="category-title">
        {emoji} {title}
      </h2>

      <hr className="category-divider" />

      {products.length === 0 ? (
        <p className="text-muted text-center py-3">No products found.</p>
      ) : (
        <div className="row g-3">

          {/* Left Column — 4 products */}
          <div className="col-6">
            {leftColumn.map((product) => (
              <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* Right Column — 4 products */}
          <div className="col-6">
            {rightColumn.map((product) => (
              <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

const Home = () => {

  // ── One state for each category ──────────────────────────
  const [mensProducts,       setMensProducts]       = useState([]);
  const [womensProducts,     setWomensProducts]     = useState([]);
  const [kidsProducts,       setKidsProducts]       = useState([]);
  const [sportsProducts,     setSportsProducts]     = useState([]);
  const [electronicsProducts,setElectronicsProducts]= useState([]);
  const [furnitureProducts,  setFurnitureProducts]  = useState([]);

  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Fetch all categories when page loads ─────────────────
  useEffect(() => {

    const fetchAllCategories = async () => {
      try {
        setLoading(true);

        // Fetch each category one by one (simple & easy to understand)
        const mensRes        = await axios.get("http://localhost:8080/products?categoryId=1");
        const womensRes      = await axios.get("http://localhost:8080/products?categoryId=2");
        const kidsRes        = await axios.get("http://localhost:8080/products?categoryId=3");
        const sportsRes      = await axios.get("http://localhost:8080/products?categoryId=4");
        const electronicsRes = await axios.get("http://localhost:8080/products?categoryId=5");
        const furnitureRes   = await axios.get("http://localhost:8080/products?categoryId=6");

        // Save first 8 products for each category (4 left column + 4 right column)
        setMensProducts(mensRes.data.slice(0, 8));
        setWomensProducts(womensRes.data.slice(0, 8));
        setKidsProducts(kidsRes.data.slice(0, 8));
        setSportsProducts(sportsRes.data.slice(0, 8));
        setElectronicsProducts(electronicsRes.data.slice(0, 8));
        setFurnitureProducts(furnitureRes.data.slice(0, 8));

      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();

  }, []);

  // // ── Add to Cart button handler ───────────────────────────
  // const handleAddToCart = (product) => {
  //   alert("Product added to cart!");
  //   console.log("Added to cart:", product);
  // };

  // ── Loading State ────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-box d-flex flex-column align-items-center justify-content-center">
          <div className="spinner-border text-warning mb-3" role="status" />
          <p className="text-muted">Loading products...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ── Error State ──────────────────────────────────────────
  if (error) {
    return (
      <>
        <Header />
        <div className="loading-box d-flex align-items-center justify-content-center">
          <div className="alert alert-danger text-center">
            <p>{error}</p>
            <button className="btn btn-warning btn-sm" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ── Main Page ────────────────────────────────────────────
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <div className="hero-banner text-center text-white py-5">
        <h1 className="fw-bold">Welcome to ShopEase</h1>
        <p className="lead">Your one-stop shop for everything you need</p>
        <a href="#shop" className="btn btn-warning fw-bold px-4">Shop Now ↓</a>
      </div>

      {/* All 6 Category Sections — one below the other */}
      <div className="container my-5" id="shop">

        <CategorySection title="Men's Wear" emoji="👔" products={mensProducts}/>

        <CategorySection title="Women's Fashion" emoji="👗" products={womensProducts}/>

        <CategorySection title="Kids" emoji="🧸"  products={kidsProducts} />

        <CategorySection title="Sports" emoji="🏋️" products={sportsProducts} />

        <CategorySection title="Electronics" emoji="💻" products={electronicsProducts} />

        <CategorySection title="Furniture" emoji="🛋️" products={furnitureProducts} />

      </div>

      <Footer />
    </>
  );

};

export default Home;
