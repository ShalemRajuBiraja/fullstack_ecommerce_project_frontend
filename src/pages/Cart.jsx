import { useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const initialItems = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "SoundCore",
    price: 2999,
    qty: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
    color: "Midnight Black",
  },
  {
    id: 2,
    name: "Slim Fit Casual Sneakers",
    brand: "UrbanStep",
    price: 1499,
    qty: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
    color: "Cloud White",
  },
  {
    id: 3,
    name: "Minimalist Leather Watch",
    brand: "TimeCraft",
    price: 4599,
    qty: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
    color: "Tan Brown",
  },
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 199;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">

      {/* ── Header ── */}
      <header className="cart-header mt-3">
        <div className="cart-header-inner">
          <div className="cart-logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">Amazon</span>
          </div>
          <div className="cart-header-title">
            <h1>My Cart</h1>
            <span className="cart-count">{items.length} items</span>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="cart-main">

        {items.length === 0 ? (
          /* Empty State */
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/home" style={{ textDecoration: "none" }}>
                <button className="btn-continue btn-warning">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Continue Shopping
                </button>
                </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* ── Left: Items ── */}
            <section className="cart-items-section">
              <div className="section-head">
                <h2 className="section-title">Cart Items</h2>
                <span className="section-sub">{items.length} products</span>
              </div>

              <div className="cart-items-list">
                {items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} className="item-img" />

                    <div className="item-details">
                      <span className="item-brand">{item.brand}</span>
                      <h3 className="item-name">{item.name}</h3>
                      <span className="item-variant">Color: {item.color}</span>
                    </div>

                    <div className="item-actions">
                      {/* Qty Control */}
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="qty-val">{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>+</button>
                      </div>

                      <div className="item-price-row">
                        <span className="item-price">₹{(item.price * item.qty).toLocaleString()}</span>
                        <button className="remove-btn" onClick={() => removeItem(item.id)}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14H6L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/home" style={{ textDecoration: "none" }}>
                <button className="btn-continue">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Continue Shopping
                </button>
                </Link>
            </section>

            {/* ── Right: Order Summary ── */}
            <aside className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "free-tag" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>

                {shipping > 0 && (
                  <div className="free-shipping-hint">
                    Add ₹{(5000 - subtotal).toLocaleString()} more for free shipping!
                  </div>
                )}

                <div className="summary-divider" />

                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button className="btn-checkout">
                Proceed to Checkout
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              <div className="secure-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Secure & Encrypted Checkout
              </div>
            </aside>

          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
