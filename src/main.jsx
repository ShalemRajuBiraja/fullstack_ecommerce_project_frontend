import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Home from './pages/Home'
import LoginForm from './pages/LoginForm'
import RegisterForm from './pages/RegisterForm'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerfifyOtp'
import UpdatePassword from './pages/UpdatePassword'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/create-account' element={<RegisterForm/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/verifyotp' element={<VerifyOtp/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>
        <Route path='/cart' element={<Cart/>}/>
        {/* <Route path='/orders' element={</>}/> */}
      </Routes>
     <ToastContainer
      position="top-center"
      autoClose={750}
      hideProgressBar={false}
      closeButton={false}
      pauseOnHover
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
    />
    </BrowserRouter>
  </StrictMode>,
)
