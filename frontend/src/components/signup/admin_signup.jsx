import React, {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import Notifications from "../../notifications/notifications";
import Api from "../../apis/apis";

function AdminSignUp() {
    const history = useHistory();

    let [name,setName]=useState(null);
    let [email,setEmail]=useState(null);
    let [password,setPassword]=useState(null);
    let [repassword,setRePassword]=useState(null);

    function resetForm() {
        setName("");
        setEmail("");
        setPassword("");
    }

    async function submitForm(e) {
        e.preventDefault();

        if (password != repassword) // check password and conform password
        {
            await Notifications.errorMsg('Password Mismatch') // error message

            resetForm();
        }
        else
        {
            let data={                   // form data
                "name": name,
                "email": email,
                "password": password
            }

            let resp=await Api.adminSignUp(data); // call admin signup api

            if (resp.status == '200')  // if response 202
            {
                await Notifications.successMsg(resp.message);

                history.push('/sign-in')  // if response 404
            }
            else
            {
                await Notifications.warningMsg(resp.message);
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
                <div className='sign-form'>
                    <form onSubmit={submitForm}>
                        <div className=' load-form'>
                            <h3>Admin Sign Up</h3>
                            <p>Lorem Ipsum is simply text</p>
                            <div className=' load-input-wrapper'>
                                <div className=' load-input'>
                                    <label>Full Name</label>
                                    <input  type={'text'} placeholder="Enter full name" className='form-input_ input' required value={name} onChange={(e)=>{setName(e.target.value)}} />
                                </div>
                                <div className=' load-input'>
                                    <label>Email</label>
                                    <input  type={'email'} placeholder="Enter email" className='form-input_ input' required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                </div>
                                <div className='sign-pass-cont'>
                                    <div className=' load-input'>
                                        <label>Password</label>
                                        <input  type={'password'} placeholder="Enter password" className='form-input_' required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                    </div>
                                    <div className='sign-pass-cont-sep'></div>
                                    <div className=' load-input'>
                                        <label>Confirm Password</label>
                                        <input  type={'password'} placeholder="Enter confirm password" className='form-input_' required value={repassword} onChange={(e)=>{setRePassword(e.target.value)}} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-buttons'>
                                <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Sign Up</button>
                            </div>
                            <div className='sign-form-bottom'>
                                <p>Already have an account? <Link to="/admin">Login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminSignUp