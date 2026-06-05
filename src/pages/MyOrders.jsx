import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyOrders.css";


const MyOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [cancelId, setCancelId] = useState(null);
  

  
  const handleCancel = (id) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o))
    );
    setCancelId(null);
  };

  return (
    <div className="orders-page">

      {/* ── Header ── */}
      <header className="orders-header">
        <div className="orders-header-inner">
          <div className="orders-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">Amazon</span>
          </div>
          <div className="orders-header-title">
            <h1>My Orders</h1>
            <span className="orders-badge">{orders.length} orders</span>
          </div>
          <Link to="/home" className="orders-back-link">
            ← Continue Shopping
          </Link>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="orders-main">

        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders. Start shopping!</p>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <button className="btn-shop-now">Shop Now</button>
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>

                {/* Product Image */}
                <img src={order.image} alt={order.name} className="order-img" />

                {/* Details */}
                <div className="order-details">
                  <span className="order-id">Order ID: {order.id}</span>
                  <h3 className="order-name">{order.name}</h3>
                  <div className="order-meta">
                    <span className="order-date">📅 {order.date}</span>
                    <span className="order-qty">Qty: {order.qty}</span>
                  </div>
                </div>

                {/* Right Side */}
                <div className="order-right">
                  <span className="order-price">₹{(order.price * order.qty).toLocaleString()}</span>

                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status === "Pending" && "🕐"} 
                    {order.status === "Cancelled" && "✗"} 
                    {" "}{order.status}
                  </span>

                  {order.status === "Pending" && (
                    <button
                      className="btn-cancel"
                      onClick={() => setCancelId(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Cancel Confirm Modal ── */}
      {cancelId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">⚠️</div>
            <h3>Cancel Order?</h3>
            <p>Are you sure you want to cancel order <strong>{cancelId}</strong>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setCancelId(null)}>
                Keep Order
              </button>
              <button className="btn-modal-confirm" onClick={() => handleCancel(cancelId)}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyOrders;
