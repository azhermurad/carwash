import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import Api from "../../../../apis/apis";

function UserDashboard() {

    let [count,setCount]=useState(null);

    useEffect(async ()=>{

        let user=JSON.parse(sessionStorage.getItem('auth'));

        let data={
            id: user.id
        }

        let res=await Api.getAllUserCounts(data);
        if (res.status == '200')
        {
            setCount(res.data);
        }

    },[])

    return (
        <>
            <div style={{ padding: '13px 0' }}></div>
            <div style={{marginBottom:"3%"}} className='dashboard-table-wrapper_ p-3'>
                <div className={'dashboardDiv'}>
                    <div className={'dashboardDivCounter'}>
                        <h4>Bookings <span><span style={{visibility: "hidden"}}>d</span> {count?.allBookings}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Pending <span><span style={{visibility: "hidden"}}>d</span> {count?.placedBookings}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Completed <span><span style={{visibility: "hidden"}}>d</span> {count?.completeBookings}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>To Review <span><span style={{visibility: "hidden"}}>d</span> {count?.reviewBooking}</span></h4>
                    </div>
                </div>

            </div>
            <div style={{ padding: '13px 0' }}></div>
        </>
    )
}

export default UserDashboard