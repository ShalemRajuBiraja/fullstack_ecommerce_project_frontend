import { useState, useRef } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = [...otp];
    paste.split("").forEach((char, i) => { updated[i] = char; });
    setOtp(updated);
    const nextEmpty = updated.findIndex((v) => !v);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    inputs.current[focusIndex].focus();
  };

  const handleValidate = () => {
    const code = otp.join("");
    if (code.length < 6) return alert("Please enter all 6 digits.");
    alert(`OTP Validated: ${code}`);
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    inputs.current[0].focus();
    alert("OTP resent!");
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
          </svg>
        </div>

        <h2 className="rp-title">Verify OTP</h2>
        <p className="rp-sub">Enter the 6-digit code sent to your email address.</p>

        {/* OTP Boxes */}
        <div className="otp-boxes" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className={`otp-box ${digit ? "otp-filled" : ""}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        {/* Resend */}
        <p className="otp-resend">
          Didn't receive the code?{" "}
          <button className="resend-btn" onClick={handleResend}>Resend OTP</button>
        </p>

        {/* Button */}
        <button className="rp-btn" onClick={handleValidate}>
          Validate OTP
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </button>

        <p className="rp-redirect">
          Back to{" "}
          <Link to="/forgot-password" className="rp-link">
            Forgot Password
          </Link>
        </p>

      </div>
    </div>
  );
};

export default VerifyOtp;
