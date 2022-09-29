import React,{useState,useEffect} from 'react'
import add from '../../../../../assets/images/add.png'
import {useHistory} from 'react-router-dom';
import $ from "jquery";
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";


function CleanerPlans() {

    let history=useHistory();

    let [plans,setPlans]=useState(null);

    useEffect(async ()=>{

        let res=await Api.getAllPlans();
        if (res.status == '200')
        {
            setPlans(res.data);
        }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])

    async function Delete(id) {
        let data={
            id: id
        }

        let res= await Api.adminDeletePlan(data);
        console.log(res);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            await refreshRecord();
        }
    }

    async function refreshRecord() {
        let res=await Api.getAllPlans();
        if (res.status == '200')
        {
            setPlans(res.data);
        }
    }

    function editPlan(id) {
        console.log(id)
        sessionStorage.setItem('planId',id);
        history.push('/edit-plan')
    }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Plans</h3>
                <div>
                    {/*<div className='nav-buttons'>*/}
                    {/*    <button onClick={()=>history.push('/add-plan')} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Plan</button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <table id="example" className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>CAR</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        {/*<th>TIME</th>*/}
                        <th>PLAN TYPE</th>
                        <th>Features</th>
                        {/*<th>Edit</th>*/}
                        {/*<th>Delete</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        plans?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.carType}</td>
                                <td>{itm.name}</td>
                                <td>{itm.price}</td>
                                {/*<td>{itm.time}</td>*/}
                                <td>{itm.planType}</td>
                                <td dangerouslySetInnerHTML={{__html: itm.feature1}}></td>
                                {/*<td onClick={()=>{editPlan(itm.id)}}><i style={{color:"green",cursor:"pointer"}} className={'fas fa-pen'}></i></td>*/}
                                {/*<td><i onClick={()=>Delete(itm.id)} style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>*/}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CleanerPlans