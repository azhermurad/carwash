import React,{useState,useEffect} from 'react'
import add from '../../../../../assets/images/add.png'
import {useHistory} from 'react-router-dom';
import $ from "jquery";
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";


function WithdrawHistory() {

    let history=useHistory();

    let [records,setRecords]=useState(null);

    useEffect(async ()=>{

        let data={
            userId: JSON.parse(sessionStorage.getItem('auth'))?.id
        }
        let res=await Api.requestsByAffiliateId(data);
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




    // async function Delete(id) {
    //     let data={
    //         id: id
    //     }
    //
    //     let res= await Api.adminDeleteAffiliate(data);
    //     console.log(res);
    //
    //     if (res.status == '200')
    //     {
    //         await Notifications.successMsg(res.message);
    //         await refreshRecord();
    //     }
    // }

    // async function refreshRecord() {
    //     let res=await Api.getAllAffiliate();
    //     if (res.status == '200')
    //     {
    //         setAffiliate(res.data);
    //     }
    // }

    function editAffiliate(id) {
        console.log(id)
        sessionStorage.setItem('affiliateId',id);
        history.push('/edit-affiliate')
    }

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
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>CREATED AT</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        records?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.amount}</td>
                                <td>{(itm.status == 'pending')?<p style={{color: 'orange'}}>{itm.status}</p>:<p style={{color: 'green'}}>{itm.status}</p>}</td>
                                <td>{itm.createdAt}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WithdrawHistory