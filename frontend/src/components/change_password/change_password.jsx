import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import qoute from '../../assets/images/quote2.png'
import truck from '../../assets/images/truck.png'
import { Link, useHistory } from 'react-router-dom'
import Api from "../../apis/apis";
import Notifications from "../../notifications/notifications";

function UserChangePassword() {

    const history = useHistory();

    let [code,setCode]=useState(null);
    let [password,setPassword]=useState(null);
    let [rePassword,setRePassword]=useState(null);

    function resetForm() {
        setCode("");
        setPassword("");
        setRePassword("");
    }

    async function submitForm(e) {
        e.preventDefault();

        if (password != rePassword)
        {
            await Notifications.errorMsg("Password Mismatch");
            resetForm();
        }
        else
        {
            let data={                // form data
                "code": code,
                "password": password,
                "repassword": rePassword
            }

            let resp=await Api.changePassword(data); // call admin signup api

            if (resp.status == '200')  // if response 202
            {
                await Notifications.successMsg(resp.message);

                history.push('/sign-in')  // if response 404
            }
            else
            {
                await Notifications.errorMsg(resp.message);
            }
        }
        resetForm();
    }


    return (
        <div className='sign-parent'>
            <div className='sign-logo'>
                <img className={'logo'} src={logo} alt="" />
            </div>
            <div className='sign-cont'>
                {/*<div className='sign-truck'>*/}
                {/*    <img src={truck} alt="" />*/}
                {/*</div>*/}
                <div className='sign-form'>
                    <form onSubmit={submitForm}>
                        <div className=' load-form'>
                            <h3>User Change Password</h3>
                            <p>Lorem Ipsum is simply text</p>
                            <div className=' load-input-wrapper'>
                                <div className=' load-input'>
                                    <label>Reset Code</label>
                                    <input required type={'text'} placeholder="Enter Reset Code" className='form-input_ input' value={code} onChange={(e)=>{setCode(e.target.value)}} />
                                </div>
                                <div className=' load-input'>
                                    <label>Password</label>
                                    <input required type={'password'} placeholder="Enter password" className='form-input_' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                </div>
                                <div className=' load-input'>
                                    <label>Repeat Password</label>
                                    <input required type={'password'} placeholder="Enter password" className='form-input_' value={rePassword} onChange={(e)=>{setRePassword(e.target.value)}} />
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Change Password</button>
                            </div>
                            <div className='sign-form-bottom'>
                                <p>Don’t have an account? <Link to="/sign-up">Sign Up</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/*<div className='sign-footer'>*/}
            {/*    <img src={qoute} alt="" />*/}
            {/*</div>*/}
        </div>
    )
}

export default UserChangePassword