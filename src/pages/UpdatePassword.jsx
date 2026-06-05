import { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const renderEyeIcon = (visible) => visible ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const UpdatePassword = () => {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const handleUpdate = () => {
    if (!form.password || !form.confirm) return alert("Please fill in both fields.");
    if (form.password !== form.confirm) return alert("Passwords do not match!");
    if (form.password.length < 8) return alert("Password must be at least 8 characters.");
    alert("Password updated successfully!");
  };

  return (
    <div className="rp-wrapper">
      <div className="rp-card">

        {/* Brand */}
        <div className="rp-brand">
          <div className="brand-icon">⬡</div>
          <h1 className="brand-name">Amazon</h1>
        </div>

        {/* Icon */}
        <div className="rp-icon-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fd7e14" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>

        <h2 className="rp-title">Update Password</h2>
        <p className="rp-sub">Set a new strong password for your account.</p>

        {/* New Password */}
        <div className="rp-field">
          <label className="field-label">New Password</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              type={show.password ? "text" : "password"}
              name="password"
              className="rp-input"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button type="button" className="toggle-pass" onClick={() => toggleShow("password")}>
              {renderEyeIcon(show.password)}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="rp-field">
          <label className="field-label">Confirm Password</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            <input
              type={show.confirm ? "text" : "password"}
              name="confirm"
              className="rp-input"
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button type="button" className="toggle-pass" onClick={() => toggleShow("confirm")}>
              {renderEyeIcon(show.confirm)}
            </button>
          </div>

          {/* Match indicator */}
          {form.confirm.length > 0 && (
            <p className={`match-hint ${form.password === form.confirm ? "match-ok" : "match-err"}`}>
              {form.password === form.confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}
        </div>

        {/* Button */}
        <button className="rp-btn" onClick={handleUpdate}>
          Update Password
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <p className="rp-redirect">
          Back to{" "}
          <Link to="/login" className="rp-link">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default UpdatePassword;
