import './signin.css'
import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import { Link, useHistory } from 'react-router-dom'
import Notifications from "../../notifications/notifications";
import Api from "../../apis/apis";
import {useRecoilState} from "recoil";
import {_authData, _checkLogin} from "../../data/atom";


function UserSignINAndRedirect() {
    const history = useHistory();

    let [authData,setAuthData]=useRecoilState(_authData);

    let [phone,setPhone]=useState(null);
    // let [password,setPassword]=useState(null);


    function resetForm() {
        setPhone("");
        // setPassword("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={                // form data
            "phone": phone,
            // "password": password
        }

        console.log(data)
        let resp=await Api.userSignIn(data); // call admin signup api

        if (resp.status == '200')  // if response 202
        {
            await Notifications.successMsg(resp.message);
            history.push('/verify-otp-and-redirect-booking');

            // if (resp.type == 'affiliate')
            // {
            //     sessionStorage.setItem('auth',JSON.stringify(resp));
            //     sessionStorage.setItem('token',resp.token);
            //     setAuthData(resp);
            //     history.push('/affiliate-dashboard')  // if response 202
            // }
            // else if (resp.type == 'cleaner')
            // {
            //     sessionStorage.setItem('auth',JSON.stringify(resp));
            //     sessionStorage.setItem('token',resp.token);
            //     setAuthData(resp);
            //     //history.push('/dashboard')  // if response 202
            // }
            // else
            // {
            //     sessionStorage.setItem('auth',JSON.stringify(resp));
            //     sessionStorage.setItem('token',resp.token);
            //     setAuthData(resp);
            //     //history.push('/dashboard')  // if response 202
            // }
        }
        else
        {
            await Notifications.errorMsg(resp.message);
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
                            <h3>User Login</h3>
                            <p>Lorem Ipsum is simply text</p>
                            <div className=' load-input-wrapper'>
                                <div className=' load-input'>
                                    <label>Phone</label>
                                    <input required type={'phone'}  placeholder="Enter phone number" min={10} max={10} minLength={10} maxLength={10} className='form-input_ input' value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                                </div>
                            </div>
                            <div className='sign-forget'>
                                {/*<Link to={'/reset-password'}>Forgot Password?</Link>*/}
                            </div>
                            <div className='form-buttons'>
                                <button type={'submit'} style={{ fontSize: '14px', background: "#FF7B00" }} className='button-primary'>Get OTP</button>
                            </div>
                            <div style={{marginTop: "3%"}} className='form-buttons'>
                                <button onClick={()=>{history.push('/admin')}} type={'button'} style={{ fontSize: '14px', background: "#FF7B00"  }} className='button-primary'>Admin sign in</button>
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

export default UserSignINAndRedirect



// <button onClick={() => {
//     history.push('/')
//     sessionStorage.setItem('authData', 'auth')
// }} style={{ fontSize: '14px' }} className='button-primary'>Login</button>