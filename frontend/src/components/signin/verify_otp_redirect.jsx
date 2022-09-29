import './signin.css'
import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import { Link, useHistory } from 'react-router-dom'
import Notifications from "../../notifications/notifications";
import Api from "../../apis/apis";
import {useRecoilState} from "recoil";
import {_authData, _checkLogin} from "../../data/atom";


function VerifyOtpRedirect() {
    const history = useHistory();

    let [authData,setAuthData]=useRecoilState(_authData);

    let [otp,setOtp]=useState(null);
    // let [password,setPassword]=useState(null);


    function resetForm() {
        setOtp("");
        // setPassword("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={                // form data
            "code": otp,
            // "password": password
        }

        let resp=await Api.verifyOtp(data); // call admin signup api

        if (resp.status == '200')  // if response 202
        {
            // await Notifications.successMsg(resp.message);
            sessionStorage.setItem('auth',JSON.stringify(resp.data));
            sessionStorage.setItem('token',resp.data.token);
            setAuthData(resp);
            history.push('/online-booking')  // if response 202

            if (resp.data.type == 'user')
            {
                sessionStorage.setItem('auth',JSON.stringify(resp.data));
                sessionStorage.setItem('token',resp.data.token);
                setAuthData(resp);
                history.push('/online-booking')  // if response 202
            }else
            {
                await Notifications.errorMsg("You are not seem to be User! Login again.");
                history.push('/sign-in-and-redirect-booking')
            }
        }
        else
        {
            // await Notifications.errorMsg(resp.message);
        }

        resetForm();
    }


    return (
        <div className='sign-parent'>
            <div className='sign-logo'>
                <img className={'logo'} src={logo} alt="" />
            </div>
            <div className='sign-cont'>
                <div className='sign-form'>
                    <form onSubmit={submitForm}>
                        <div className=' load-form'>
                            <h3>Verify</h3>
                            <p>Lorem Ipsum is simply text</p>
                            <div className=' load-input-wrapper'>
                                <div className=' load-input'>
                                    <label>OTP</label>
                                    <input required type={'phone'}  placeholder="Enter OTP"  minLength={6} maxLength={6} className='form-input_ input' value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
                                </div>
                            </div>
                            <div className='sign-forget'>
                                {/*<Link to={'/reset-password'}>Forgot Password?</Link>*/}
                            </div>
                            <div className='form-buttons'>
                                <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Login</button>
                            </div>
                            <div className='sign-form-bottom'>
                                <p>Don’t have an account? <Link to="/sign-up">Sign Up</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtpRedirect



// <button onClick={() => {
//     history.push('/')
//     sessionStorage.setItem('authData', 'auth')
// }} style={{ fontSize: '14px' }} className='button-primary'>Login</button>