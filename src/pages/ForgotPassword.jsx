import { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    if (!email) return alert("Please enter your email.");
    alert(`OTP sent to: ${email}`);
  };

  return (
    <div className="rp-wrapper">
      <div className="rp-card">

        {/* Brand */}
        <div className="rp-brand">
          <div className="brand-icon">⬡</div>
          <h1 className="brand-name">
            Amazon
          </h1>
        </div>

        {/* Icon */}
        <div className="rp-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fd7e14" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h2 className="rp-title">Forgot Password?</h2>
        <p className="rp-sub">Enter your registered email and we'll send you a 6-digit OTP.</p>

        {/* Email */}
        <div className="rp-field">
          <label className="field-label">Email Address</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <input
              type="email"
              className="rp-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Button */}
        <button className="rp-btn" onClick={handleSendOtp}>
          Send OTP
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        <p className="rp-redirect">
          Remember your password?{" "}
          <Link to="/login" className="rp-link">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;
