import React, {useEffect, useState} from 'react'
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
import {useHistory} from 'react-router-dom';

function EditCleaner() {

    const history=useHistory();

    let [user,setUser]=useState(null);

    let [name,setName]=useState(user?.name);
    let [phone,setPhone]=useState(user?.phone);
    let [email,setEmail]=useState(user?.email);
    let [address,setAddres]=useState(user?.address);



    useEffect(async ()=>{
        let data={
            id:sessionStorage.getItem('cleanerId')
        }
        let tempData=await Api.userByID(data);
        if (tempData.status == '200')
        {
            console.log(tempData)
            setUser(tempData.data);
            setName(tempData.data.name);
            setPhone(tempData.data.phone);
            setEmail(tempData.data.email);
            setAddres(tempData.data.address);
        }



    },[])


    function resetForm(){
        setName("");
        setPhone("");
        setEmail("");
        setAddres("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={
            id: sessionStorage.getItem('cleanerId'),
            name: name,
            email: email,
            phone: phone,
            address: address
        }

        let res=await Api.adminUpdateCleaner(data);


        if (res.status == "200")
        {
            await Notifications.successMsg(res.message);
            history.push('/cleaner');
        }
        else
        {
            await Notifications.errorMsg(res.message);
        }
        resetForm();
    }

    return (
        <>
            <h3 className='dashboard-head-title'>Edit Cleaner</h3>
            <form onSubmit={submitForm}>
                <div className=' load-form'>
                    <div className=' load-input-wrapper'>
                        <div className=' load-input'>
                            <label>Name</label>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}}  type={'text'} placeholder="Enter Name" className='form-input_ input' />
                        </div>
                        <div className=' load-input'>
                            <label>Phone </label>
                            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}}  type={'phone'} placeholder="Enter Phone" className='form-input_ input' maxLength={10} minLength={10} />
                        </div>
                        <div className=' load-input'>
                            <label>{`Email`}</label>
                            <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  type={'email'} placeholder="Enter Email" className='form-input_ input' />
                        </div>
                        <div className=' load-input'>
                            <label>Address</label>
                            <input value={address} onChange={(e)=>{setAddres(e.target.value)}}  type={'text'} placeholder="Enter Address" className='form-input_ input' />
                        </div>
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Password</label>*/}
                        {/*    <input value={address} onChange={(e)=>{setName(e.target.value)}} required type={'text'} placeholder="Enter Password" className='form-input_ input' />*/}
                        {/*</div>*/}
                    </div>
                    <div className='form-buttons'>
                        <button type={'submit'} className='button-primary'>Save Changes</button>
                        {/*<button className='button-primary btn-cancel'>Cancel</button>*/}
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditCleaner