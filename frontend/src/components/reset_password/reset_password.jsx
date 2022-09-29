
import React, {useState} from 'react'
import logo from '../../assets/images/logo.png'
import qoute from '../../assets/images/quote2.png'
import truck from '../../assets/images/truck.png'
import { Link, useHistory } from 'react-router-dom'
import Api from "../../apis/apis";
import Notifications from "../../notifications/notifications";

function UserResetPassword() {

    const history = useHistory();

    let [email,setEmail]=useState(null);

    function resetForm() {
        setEmail("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={                // form data
            "email": email,
        }

        let resp=await Api.resetPassword(data); // call admin signup api

        if (resp.status == '200')  // if response 202
        {
            await Notifications.successMsg(resp.message);

            history.push('/change-password')
        }
        else // if response 404
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
                {/*<div className='sign-truck'>*/}
                {/*    <img src={truck} alt="" />*/}
                {/*</div>*/}
                <div className='sign-form'>
                    <form onSubmit={submitForm}>
                        <div className=' load-form'>
                            <h3>User Reset Password</h3>
                            <p>Lorem Ipsum is simply text</p>
                            <div className=' load-input-wrapper'>
                                <div className=' load-input'>
                                    <label>Email</label>
                                    <input required type={'email'} placeholder="Enter email" className='form-input_ input' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Reset</button>
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

export default UserResetPassword