import { useState } from "react";
import "./RegisterForm.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//1. ── Form submission with backend integration ── SIGNUP API CALLING
  const handleCreateAccount = async (e) => {

    e.preventDefault();

    const apiData = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      mobileNumber: form.mobileNumber.trim(),
      password: form.password,
    }

    try {
        const response = await axios.post("http://localhost:8080/signup", apiData);

        if (response.status === 200) {
            toast.success("Account created successfully!");
              navigate("/login");
        }

    } catch (error) {
        if (error.response) {
            // ── Validation errors from backend ──
            const errors = error.response.data.errors;
            if (errors) {
                const firstError = Object.values(errors)[0];
                toast.error(firstError);
            } else {
                // ── Duplicate email/mobile ──
                toast.error(error.response.data.message);
            }
        } else {
            toast.error("Server is not responding. Please try again!");
        }
    }
};
  return (
    <div className="register-wrapper ">
      <div className="register-card mt-5 p-4">

        {/* Brand */}
        <div className="register-brand">
          <h1 className="brand-name">Amazon</h1>
        </div>

        <h2 className="register-title">Create Account</h2>
        <p className="register-sub">Join us today — it's free and easy</p>

        {/* Name */}
        <div className="mb-3">
          <label className="field-label text">Full Name</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              type="text"
              name="fullName"
              className="register-input"
              placeholder="John Doe"
              value={form.fullName}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
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
              name="email"
              className="register-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="field-label">Mobile Number</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </span>
            <input
              type="tel"
              name="mobileNumber"
              className="register-input"
              placeholder="+91 98765 43210"
              value={form.mobileNumber}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="field-label">Password</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="register-input"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowPass(!showPass)}
              aria-label="Toggle password visibility"
            >
              {showPass ? (
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
              )}
            </button>
          </div>
        </div>

        {/* Create Account Button */}
        <button className="btn-create-account" onClick={handleCreateAccount}>
          Create Account
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        {/* Login Redirect */}
        <p className="login-redirect text-light">
          Already have an account?{" "}
          <Link to="/login" className="login-link">Login here</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterForm;
