import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/home";
import React,{useEffect} from "react";
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import AdminSignIn from "./components/signin/admin_signin";
import UserSignIN from "./components/signin/signin";
import UserSignUp from "./components/signup/signup";
import UserResetPassword from "./components/reset_password/reset_password";
import UserChangePassword from "./components/change_password/change_password";
import AdminSignUp from "./components/signup/admin_signup";
import VerifyOtp from "./components/signin/verify_otp";
import UserSignINAndRedirect from "./components/signin/signin_redirect_booking";
import VerifyOtpRedirect from "./components/signin/verify_otp_redirect";
import Website from "./components/website/website";



function App() {


    return (
        <div className="App">
            <Router>
                <Route exact path={'/'}><Website/></Route>
                <Home />
                <Route path={'/admin'}><AdminSignIn/></Route>
                <Route path={'/admin-signup'}><AdminSignUp/></Route>
                <Route path={'/sign-in'}><UserSignIN /></Route>
                <Route path={'/sign-in-and-redirect-booking'}><UserSignINAndRedirect /></Route>
                <Route path={'/verify-otp'}><VerifyOtp /></Route>
                <Route path={'/verify-otp-and-redirect-booking'}><VerifyOtpRedirect /></Route>
                <Route path={'/sign-up'}><UserSignUp /></Route>
                <Route path={'/reset-password'}><UserResetPassword /></Route>
                <Route path={'/change-password'}><UserChangePassword /></Route>
                {/*<Route path={'/invoice'}><Invoice /></Route>*/}
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div >
    );
}

export default App;
