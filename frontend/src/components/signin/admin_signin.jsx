import './signin.css'
import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import { Link, useHistory } from 'react-router-dom'
import Notifications from "../../notifications/notifications";
import Api from "../../apis/apis";
import {useRecoilState} from "recoil";
import {_authData, _checkLogin} from "../../data/atom";


function AdminSignIn() {
    const history = useHistory();

    let [authData,setAuthData]=useRecoilState(_authData);

    let [email,setEmail]=useState(null);
    let [password,setPassword]=useState(null);


    function resetForm() {
        setEmail("");
        setPassword("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={                // form data
            "email": email,
            "password": password
        }


        let resp=await Api.signInAdmin(data); // call admin signup api

        if (resp.status == '200')  // if response 202
        {
            await Notifications.successMsg(resp.message);

            if (resp.type == 'admin')
            {
                sessionStorage.setItem('auth',JSON.stringify(resp));
                sessionStorage.setItem('token',resp.token);
                setAuthData(resp);

                history.push('/dashboard')  // if response 202
            }
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
                            <h3>Admin Login</h3>
                            <p>Lorem Ipsum is simply text</p>
                            <div className=' load-input-wrapper'>
                                <div className=' load-input'>
                                    <label>Email</label>
                                    <input required type={'email'} placeholder="Enter email" className='form-input_ input' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                </div>
                                <div className=' load-input'>
                                    <label>Password</label>
                                    <input required type={'password'} placeholder="Enter password" className='form-input_' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                </div>
                            </div>
                            <div className='sign-forget'>
                                <Link to={'/reset-password'}>Forgot Password?</Link>
                            </div>
                            <div className='form-buttons'>
                                <button type={'submit'} style={{ fontSize: '14px', background: "#FF7B00" }} className='button-primary'>Login</button>
                            </div>
                            <div className='sign-form-bottom'>
                                {/*<p>Don’t have an account? <Link to="/admin-signup">Sign Up</Link></p>*/}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminSignIn



// <button onClick={() => {
//     history.push('/')
//     sessionStorage.setItem('authData', 'auth')
// }} style={{ fontSize: '14px' }} className='button-primary'>Login</button>