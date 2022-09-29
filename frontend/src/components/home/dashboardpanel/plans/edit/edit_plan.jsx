import React, {useEffect, useState} from 'react'
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
import {useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Editor} from "@tinymce/tinymce-react";

function EditPlan() {

    const history=useHistory();

    let [car,setCar]=useState(null);
    let [name,setName]=useState(null);
    let [time,setTime]=useState(null);
    let [price,setPrice]=useState(null);
    let [fea1,setFea1]=useState(null);
    let [feaStatus1,setFeaStatus1]=useState(null);
    let [fea2,setFea2]=useState(null);
    let [feaStatus2,setFeaStatus2]=useState(null);
    let [fea3,setFea3]=useState(null);
    let [feaStatus3,setFeaStatus3]=useState(null);
    let [fea4,setFea4]=useState(null);
    let [feaStatus4,setFeaStatus4]=useState(null);
    let [fea5,setFea5]=useState(null);
    let [feaStatus5,setFeaStatus5]=useState(null);



    useEffect(async ()=>{
        let data={
            id: sessionStorage.getItem('planId')
        }
        let tempData=await Api.planById(data);

        if (tempData.status == '200')
        {
            setCar(tempData.data.carType);
            setName(tempData.data.name);
            setPrice(parseInt(tempData.data.price));
            setFea1(tempData.data.feature1);
        }


    },[])



    function resetForm(){
        setCar("");
        setName("");
        setTime("");
        setPrice("");
        setFea1("");
        setFeaStatus1("");
        setFea2("");
        setFeaStatus2("");
        setFea3("");
        setFeaStatus3("");
        setFea4("");
        setFeaStatus4("");
        setFea5("");
        setFeaStatus5("");
    }

    async function submitForm(e) {
        e.preventDefault();

        let data={
            id: sessionStorage.getItem('planId'),
            carType: car,
            name: name,
            time: time,
            price: price,
            feature1: fea1,
            feature1Status: feaStatus1,
            feature2: fea2,
            feature2Status: feaStatus2,
            feature3: fea3,
            feature3Status: feaStatus3,
            feature4: fea4,
            feature4Status: feaStatus4,
            feature5: fea5,
            feature5Status: feaStatus5
        }

        let res=await Api.adminUpdatePlan(data);


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
            <h3 className='dashboard-head-title'>Edit Plan</h3>
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
                            <input value={name} onChange={(e)=>{setName(e.target.value)}} required type={'text'} placeholder="Enter Plan Name" className='form-input_ input'  />
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
                            <label>Feature 1</label>
                            <textarea className='form-control' cols={100} rows={10} onChange={(e) => setFea1(e.target.value)} value={fea1}></textarea>
                            {/*<input value={fea1} onChange={(e)=>{setFea1(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
                        </div>
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 1 Status</label>*/}
                        {/*    <select className={'form-input_ input'} required onChange={(e)=>setFeaStatus1(e.target.value)}>*/}
                        {/*        <option value="---">Select</option>*/}
                        {/*        <option value={'no'}>no</option>*/}
                        {/*        <option value={'yes'}>yes</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 2</label>*/}
                        {/*    <input value={fea2} onChange={(e)=>{setFea2(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 2 Status</label>*/}
                        {/*    <select className={'form-input_ input'} required onChange={(e)=>setFeaStatus2(e.target.value)}>*/}
                        {/*        <option value="---">Select</option>*/}
                        {/*        <option value={'no'}>no</option>*/}
                        {/*        <option value={'yes'}>yes</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 3</label>*/}
                        {/*    <input value={fea3} onChange={(e)=>{setFea3(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 3 Status</label>*/}
                        {/*    <select className={'form-input_ input'} required onChange={(e)=>setFeaStatus3(e.target.value)}>*/}
                        {/*        <option value="---">Select</option>*/}
                        {/*        <option value={'no'}>no</option>*/}
                        {/*        <option value={'yes'}>yes</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 4</label>*/}
                        {/*    <input value={fea4} onChange={(e)=>{setFea4(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 4 Status</label>*/}
                        {/*    <select className={'form-input_ input'} required onChange={(e)=>setFeaStatus4(e.target.value)}>*/}
                        {/*        <option value="---">Select</option>*/}
                        {/*        <option value={'no'}>no</option>*/}
                        {/*        <option value={'yes'}>yes</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 5</label>*/}
                        {/*    <input value={fea5} onChange={(e)=>{setFea5(e.target.value)}} required type={'text'} placeholder="Enter Feature Name" className='form-input_ input' />*/}
                        {/*</div>*/}
                        {/*<div className=' load-input'>*/}
                        {/*    <label>Feature 5 Status</label>*/}
                        {/*    <select className={'form-input_ input'} required onChange={(e)=>setFeaStatus5(e.target.value)}>*/}
                        {/*        <option value="---">Select</option>*/}
                        {/*        <option value={'no'}>no</option>*/}
                        {/*        <option value={'yes'}>yes</option>*/}
                        {/*    </select>*/}
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

export default EditPlan