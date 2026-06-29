import { useState } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import {isEmailValid} from "../utils/Reusablecode";
import {loginapi} from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  
  const [loginData, setLoginData] = useState({email : "", password : ""});
  const [loginErrors, setLoginErrors] = useState({email : false, password : false, apiError : false});
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();


  const handleLogin =  async () => {
        let tempErrors = {};
        let hasErrors = false;

        if(isEmailValid(loginData.email) == false){
                hasErrors = true;
            tempErrors = {...tempErrors,email : true};
        } else {
            tempErrors = {...tempErrors, email: false};
        }
        if(loginData.password.length < 6){
                hasErrors = true;
            tempErrors = {...tempErrors, password : true};
        }else {
            tempErrors = {...tempErrors, password: false};
        }
  
        setLoginErrors({tempErrors});

        if(hasErrors == false){
            //API call
            //fake API response
            try{

                const loginApiresponse = await loginapi(loginData);// ISSUES IS HERE 

                  if(loginApiresponse?.data?.success){
                          localStorage.setItem("userData", JSON.stringify(loginApiresponse.data.data.userData));
                          localStorage.setItem("token", loginApiresponse.data.data.token)
                          navigate("/home");
                          // window.location = '/';
                    }
            }catch(error){
                console.log(error); // see error in console
                console.log(error?.response); // see error response in console
                setLoginErrors({...loginErrors, apiError : true});
                toast.error("Login failed. Please try again.");
                                   
            } 
        }
    }
  return (
    <div className="login-wrapper">
      <div className="login-card mt-3 mb-3">
        {/* Brand */}
        <div className="login-brand">
          <div className="brand-icon">⬡</div>
          <h1 className="brand-name">Amazon</h1>
        </div>

        <h2 className="login-title">Welcome back to Login</h2>
        <p className="login-sub">Sign in to continue to your account</p>

        {/* Form */}
        <div className="login-form">
          {/* Email */}
          <div className="field-group">
            <label className="field-label" htmlFor="email">Email Address</label>
            <div className="input-wrap">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="you@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email : e.target.value})}
                autoComplete="email"
              />
              {
                loginErrors.email && <span className="error-text">Email is Invalid</span>
              }
            </div>
          </div>

          {/* Password */}
          <div className="field-group">
            <div className="label-row">
              <label className="field-label" htmlFor="password">Password</label>
              <Link to="/forgotpassword" className="forgot-link">Forgot password?</Link>
            </div>
            <div className="input-wrap">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                className="login-input"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password : e.target.value})}
                autoComplete="current-password"
              />
              {
                loginErrors.password && <span className="error-text">Password must be at least 6 characters</span>
              }
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password"
              >
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <button className="btn-continue" onClick={handleLogin}>
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <span className="divider-line" />
          <span className="divider-text text-warning">New customer?</span>
          <span className="divider-line" />
        </div>

        {/* Create Account */}
        <Link to="/create-account" className="btn-create">
          Create Account
        </Link>
      </div>
    </div>
  );
}
export default LoginForm;