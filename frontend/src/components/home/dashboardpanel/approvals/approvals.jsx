import React,{useState,useEffect} from 'react'
import add from '../../../../assets/images/add.png'
import {useHistory} from 'react-router-dom';
import $ from "jquery";
import Api from "../../../../apis/apis";
import Notifications from "../../../../notifications/notifications";


function Approvals() {

    let history=useHistory();

    let [records,setRecords]=useState(null);

    useEffect(async ()=>{


        let res=await Api.allApprovals();
        if (res.status == '200')
        {
            setRecords(res.data);

        }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])




    async function approveRequest(id) {
        let data={
            id: id
        }

        let res= await Api.approveRequest(data);
        console.log(res);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            await refreshRecord();
        }
    }

    async function refreshRecord() {
        let res=await Api.allApprovals();
        if (res.status == '200')
        {
            setRecords(res.data);

        }
    }

    // function editAffiliate(id) {
    //     console.log(id)
    //     sessionStorage.setItem('affiliateId',id);
    //     history.push('/edit-affiliate')
    // }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Withdraw History</h3>
                <div>
                    {/*<div className='nav-buttons'>*/}
                    {/*    <button onClick={()=>history.push('/add-affiliate')} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Affiliate</button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <table id="example" className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER ID</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>CREATED AT</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        records?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.userId}</td>
                                <td>{itm.amount}</td>
                                <td>{(itm.status == 'pending')?<p style={{color: 'orange'}}>{itm.status}</p>:<p style={{color: 'green'}}>{itm.status}</p>}</td>
                                <td>{itm.createdAt}</td>
                                <td>{(itm.status == 'pending')?<button className={'btn btn-primary'} onClick={()=>{approveRequest(itm.id)}}>Approve</button>:""}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Approvals