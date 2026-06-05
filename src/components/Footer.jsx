

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">

        <div className="row">

          <div className="col-md-4">
            <h4>ShopEase</h4>
            <p>
              Your trusted online shopping destination.
            </p>
          </div>

          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>Home</li>
              <li>Products</li>
              <li>Cart</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4>Contact</h4>
            <p>Email: support@shopease.com</p>
            <p>Phone: +91 9876543210</p>
          </div>

        </div>

        <hr />

        <p className="text-center">
          © 2026 ShopEase. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;