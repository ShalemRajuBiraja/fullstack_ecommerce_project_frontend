import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

const [showDropdown, setShowDropdown] = useState(false);
const timeoutRef = useRef(null);
const [isLoggedIn, setIsLoggedIn] = useState(false); 

      const handleMouseEnter = () => {
            clearTimeout(timeoutRef.current);
            setShowDropdown(true);
      };

      const handleMouseLeave = () => {
            timeoutRef.current = setTimeout(() => {
              setShowDropdown(false);
            }, 300);
      };


  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg amazon-navbar">
        <div className="container-fluid">

          {/* Logo */}
          <a className="navbar-brand amazon-logo" href="/">
            Amazon
          </a>

          {/* Location */}
          <div className="location-section d-none d-lg-flex">
            <div>
              <small>Deliver to</small>
              <h6 className="m-0">India</h6>
            </div>
          </div>

          {/* Search Bar */}
          <form className="search-container mx-3">
            <select className="search-category text-black">
              <option>All</option>
              <option>Amazon Devices</option>
              <option>Amazon Fashion</option>
              <option>Amazon Fresh</option>
              <option>Amazon Pantry</option>
              <option>Appliances</option>
              <option>Arts, Crafts & Sewing</option>
              <option>Automotive</option>
              <option>Baby</option>
              <option>Beauty & Personal Care</option>
              <option>Books</option>
              <option>CDs & Vinyl</option>
              <option>Cell Phones & Accessories</option>
              <option>Clothing, Shoes & Jewelry</option>
              <option>Collectibles & Fine Art</option>
              <option>Computers</option>
              <option>Electronics</option>
              <option>Gift Cards</option>
              <option>Grocery & Gourmet Food</option>
              <option>Handmade</option>
              <option>Health & Household</option>
              <option>Home & Kitchen</option>
            </select>

            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
            />

            <button className="search-btn" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* Right Side */}
          <div className="d-flex align-items-center ms-auto">

            {/* Account & Lists */}
            <div
              className="nav-item-custom account-dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <small>Hello, Sign in</small>

              <strong>
                Accounts ▼
              </strong>

              {showDropdown && (
                <div className="dropdown-menu-custom" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                     <div className="account-menu">
                       {
                        !isLoggedIn && (
                        <div>
                           <h5 className="account-title text-center"> Welcome to Amazon!</h5>
                          <button type="button" className="btn text-light"><Link to="/login" className="rp-link">Sign in</Link></button>
                          <small className="d-block mt-2">New customer? <Link to="/create-account" className="rp-link">Start here.</Link></small>
                        </div>
                        )
                       }

                        {isLoggedIn && (
                          <div>

                        <Link to="/profile" className="menu-item">
                          <i className="bi bi-person-circle"></i>
                          <span>My Profile</span>
                        </Link>

                        <Link to="/orders" className="menu-item">
                          <i className="bi bi-box-seam"></i>
                          <span>Orders</span>
                        </Link>

                        <Link to="/coupons" className="menu-item">
                          <i className="bi bi-ticket-perforated"></i>
                          <span>Coupons</span>
                        </Link>

                        <Link to="/wallet" className="menu-item">
                          <i className="bi bi-wallet2"></i>
                          <span>Wallet</span>
                        </Link>

                        <Link to="/address" className="menu-item">
                          <i className="bi bi-geo-alt"></i>
                          <span>Saved Addresses</span>
                        </Link>

                        <Link to="/wishlist" className="menu-item">
                          <i className="bi bi-heart"></i>
                          <span>Wishlist</span>
                        </Link>

                        <Link to="/gift-cards" className="menu-item">
                          <i className="bi bi-gift"></i>
                          <span>Gift Cards</span>
                        </Link>

                        <Link to="/logout" className="menu-item logout-item">
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Logout</span>
                        </Link>

                          </div>
                         )
                        }
                        
                      </div>
                  
                </div>
              )}
            </div>

            {/* Returns */}
            <Link to="/orders" className="nav-item-custom returns-section" style={{ textDecoration: "none", }}>
              <small>Returns</small>
              <strong>& Orders</strong>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="nav-item-custom cart-section" style={{ textDecoration: "none", }}>
              🛒
              <strong>Cart</strong>
            </Link>

          </div>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <div className="bottom-navbar">
        <div className="container-fluid d-flex gap-4">
          <span>For You</span>
          <span>Fashion</span>
          <span>Mobiles</span>
          <span>Beauty</span>
          <span>Electronics</span>
          <span>Home</span>
          <span>Appliances</span>
          <span>Books</span>
          <span>Medical</span>
          <span>Toys</span>
          <span>Baby</span>
          <span>Sports</span>
          <span>Furniture</span>
          <span>Grocery</span>
          <span>Prime</span>
          <span>Amazon Pay</span>
          <span>Gift Cards</span>
        </div>
      </div>  
    </>
  );
};

export default Header;