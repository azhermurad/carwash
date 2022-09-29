import './dashboard.css'
import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import Api from "../../../../apis/apis";

function Dashboard() {

    let [bookings,setBookings]=useState(null);
    let [counts,setCounts]=useState(null);

    useEffect(async ()=>{

        let res=await Api.getAllBookings();
        if (res.status == '200')
        {
            setBookings(res.data);
        }

        let res1= await Api.getAllAdminCounts();
        if (res1.status == '200')
        {
            setCounts(res1.data);
        }


        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])

    return (
        <>
            <div style={{marginBottom:"3%"}} className='dashboard-table-wrapper_ p-3'>
                <div className={'dashboardDiv'}>
                    <div className={'dashboardDivCounter'}>
                        <h4>Bookings <span><span style={{visibility: "hidden"}}>d</span> {counts?.allBookings}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Placed <span><span style={{visibility: "hidden"}}>d</span> {counts?.placedBookings}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Completed <span><span style={{visibility: "hidden"}}>d</span> {counts?.completeBookings}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Cleaners <span><span style={{visibility: "hidden"}}>d</span> {counts?.allCleaner}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Affiliate <span><span style={{visibility: "hidden"}}>d</span> {counts?.allAffiliates}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Approvals <span><span style={{visibility: "hidden"}}>d</span> {counts?.allApprovals}</span></h4>
                    </div>
                </div>

            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <h3>Latest Bookings</h3>
                <table id="example" className="table table-hover table-bordered" style={{overFlow:"auto"}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>CAR TYPE</th>
                        <th>PLAN</th>
                        <th>USER</th>
                        <th>Ext Features</th>
                        <th>Booking</th>
                        <th>TIME</th>
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>PLATE</th>
                        <th>COLOR</th>
                        <th>PARKING#</th>
                        <th>PARKING FLOOR</th>
                        {/*<th>Comment</th>*/}
                        <th>DATE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        {/*<th>CLEANER</th>*/}
                        {/*<th>UPLOADED IMAGES</th>*/}
                        <th>REVIEW</th>
                        {/*<th>PAYMENT</th>*/}
                        <th>CREATED</th>
                        {/*<th>Edit</th>*/}
                        {/*<th>Delete</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        bookings?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.carType}</td>
                                <td>{itm.planId}</td>
                                <td>{itm.userId}</td>
                                <td>
                                    {itm.extraFeatures}
                                </td>
                                <td>{itm.bookingType}</td>
                                <td>{itm.time}</td>
                                <td>{itm.brand}</td>
                                <td>{itm.model}</td>
                                <td>{itm.plate}</td>
                                <td>{itm.color}</td>
                                <td>{itm.parkingNo}</td>
                                <td>{itm.parkingFloor}</td>
                                {/*<td>{itm.comment}</td>*/}
                                <td>{itm.date}</td>
                                <td>${itm.amount}</td>
                                <td style={{color:"orange"}}>{itm.status}</td>
                                {/*<td>{itm.assignCleaner?itm.assignCleaner:<button onClick={()=>{setEditIndex(itm.id);handleShow()}} className={'btn btn-primary'}>Assign</button>}</td>*/}
                                {/*<td>*/}
                                {/*    {itm.cleanerImg1?<><a target="_blank" href={itm.cleanerImgLink1}>Image 1</a><br/></>:""}*/}
                                {/*    {itm.cleanerImg2?<><a target="_blank" href={itm.cleanerImgLink2}>Image 2</a><br/></>:""}*/}
                                {/*    {itm.cleanerImg3?<><a target="_blank" href={itm.cleanerImgLink3}>Image 3</a><br/></>:""}*/}
                                {/*</td>*/}
                                <td></td>
                                {/*<td>{itm.paymentId}</td>*/}
                                <td>{itm.createdAt}</td>
                                {/*<td onClick={}><i style={{color:"green",cursor:"pointer"}} className={'fas fa-pen'}></i></td>*/}
                                {/*<td><i style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>*/}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div style={{ padding: '13px 0' }}></div>
        </>
    )
}

export default Dashboard