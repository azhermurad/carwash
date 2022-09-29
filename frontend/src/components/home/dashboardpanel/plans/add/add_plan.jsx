import React, {useEffect, useState} from 'react'
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Editor} from "@tinymce/tinymce-react";

function AddPlan() {

    const history=useHistory();

    let [car,setCar]=useState(null);
    let [name,setName]=useState(null);
    let [time,setTime]=useState(null);
    let [price,setPrice]=useState(null);
    let [fea1,setFea1]=useState(null);
    let [planType,setPlanType]=useState(null);


    function resetForm(){
        setCar("");
        setName("");
        setTime("");
        setPrice("");
        setFea1("");
        setPlanType("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={
            carType: car,
            name: name,
            time: time,
            price: price,
            feature1: fea1,
            planType: planType
        }

        let res=await Api.adminAddPlan(data);


        if (res.status == "200")
        {
            await Notifications.successMsg(res.message);
            history.push('/plans');
        }
        else
        {
            await Notifications.errorMsg(res.message);
        }
        resetForm();
    }
    return (
        <>
            <h3 className='dashboard-head-title'>Add Plan</h3>
            <form onSubmit={submitForm}>
                <div className=' load-form'>
                    <div className=' load-input-wrapper'>
                        <div className=' load-input'>
                            <label>Select Car</label>
                            <select required className={'form-input_ input'} onChange={(e)=>setCar(e.target.value)}>
                                <option value="---">Select</option>
                                <option value={'SUV'}>SUV</option>
                                <option value={'Sedan'}>Sedan</option>
                            </select>
                        </div>
                        <div className=' load-input'>
                            <label>Name </label>
                            <input value={name} onChange={(e)=>{setName(e.target.value)}} required type={'text'} placeholder="Enter Plan Name" className='form-input_ input' />
                        </div>
                        {/*<div className=' load-input'>*/}
                        {/*    <label>{`Time`}</label>*/}
                        {/*    <input value={time} onChange={(e)=>{setTime(e.target.value)}} required type={'number'} placeholder="Enter Time" className='form-input_ input' />*/}
                        {/*</div>*/}
                        <div className=' load-input'>
                            <label>Price</label>
                            <input value={price} onChange={(e)=>{setPrice(e.target.value)}} required type={'number'} placeholder="Enter Price" className='form-input_ input' />
                        </div>
                        <div className=' load-input'>
                            <label>Plan Type </label>
                            <select className='form-input_ input' onChange={(e)=>{setPlanType(e.target.value)}}>
                                <option value={'select'}>Select</option>
                                <option value={'onetime'}>One Time</option>
                                <option value={'monthly'}>Monthly</option>
                            </select>
                            {/*<input value={name} onChange={(e)=>{setName(e.target.value)}} required type={'text'} placeholder="Enter Plan Name" className='form-input_ input' />*/}
                        </div>

                        <div className=' load-input'>
                            <label>Features</label>
                            <textarea class='form-control' cols={100} rows={10} onChange={(e)=>setFea1(e.target.value)}></textarea>
                            {/*<input value={fea1} onChange={(e)=>{setFea1(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
                        </div>
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

export default AddPlan