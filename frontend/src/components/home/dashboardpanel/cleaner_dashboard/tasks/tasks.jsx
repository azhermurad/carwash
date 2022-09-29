import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";



function CleanerTask() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [bookings,setBookings]=useState(null);
     let [bookingId,setBookingId]=useState(null);

    let [editIndex,setEditIndex]=useState(null);
    let [images,setImages]=useState(null);

    useEffect(async ()=>{

        let userData=JSON.parse(sessionStorage.getItem('auth'));
        console.log(userData)

        let data={
            id: userData.id
        }

        let res=await Api.allBookingsByCleanerId(data);
        if (res.status == '200')
        {
            setBookings(res.data);

        }

        // let res1=await Api.getAllCleaners();
        // if (res1.status == '200')
        // {
        //     setCleaner(res1.data);
        //
        // }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])

    let history=useHistory();


    async function completeBooking(e){
        e.preventDefault();

        console.log(images.length)

        if (images.length > 3)
        {
            await Notifications.errorMsg('You cannot upload more than 3 file');
            return ;
        }
        else
        {

            for (let i = 0; i < images.length ; i++) {
                if (i == 0)
                {
                    let data = new FormData();
                    console.log(images[i]);
                    data.append("id", bookingId);   //append the values with key, value pair
                    data.append("image", images[i]);

                    let res=await Api.saveCleanerImage1(data);


                    if (res.status == "200")
                    {
                        console.log(res.message);
                    }
                }
                else if (i == 1)
                {
                    let data = new FormData();
                    console.log(images[i]);
                    data.append("id", bookingId);   //append the values with key, value pair
                    data.append("image", images[i]);

                    let res=await Api.saveCleanerImage2(data);


                    if (res.status == "200")
                    {
                        console.log(res.message);
                    }
                }
                else
                {
                    let data = new FormData();
                    console.log(images[i]);
                    data.append("id", bookingId);   //append the values with key, value pair
                    data.append("image", images[i]);

                    let res=await Api.saveCleanerImage3(data);


                    if (res.status == "200")
                    {
                        console.log(res.message);
                    }
                }
            }




            let data={
                id: bookingId,
            }

            let res=await Api.completeCleanerTask(data);

            if (res.status == "200")
            {
                await Notifications.successMsg(res.message);
                history.push('/cleaner-tasks');
            }
            else
            {
                await Notifications.errorMsg(res.message);
            }
            handleClose();
            await refreshRecord();
            resetForm();
        }
    }


    async function refreshRecord() {
        let userData=JSON.parse(sessionStorage.getItem('auth'));
        console.log(userData)

        let data={
            id: userData.id
        }

        let res=await Api.allBookingsByCleanerId(data);
        if (res.status == '200')
        {
            setBookings(res.data);

        }
    }


    function resetForm() {
        setBookingId("");
        // setCleanerId("");
    }



    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Bookings</h3>
                <div>
                    {/*<div className='nav-buttons'>*/}
                    {/*    <button onClick={()=>history.push('/add-cleaner')} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Cleaner</button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3' >


                <table id="example" className="table table-hover table-bordered" style={{overFlow:"auto"}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>CAR TYPE</th>
                        <th>PLAN</th>
                        <th>USER</th>
                        <th>Ext Features</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>PLATE</th>
                        <th>COLOR</th>
                        <th>PARKING#</th>
                        <th>PARKING FLOOR</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>CLEANER</th>
                        <th>REVIEW</th>
                        {/*<th>PAYMENT</th>*/}
                        <th>CREATED</th>
                        <th>Action</th>
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
                                {/*<td>{itm.comment}</td>*/}
                                <td>{itm.date}</td>
                                <td>{itm.time}</td>
                                <td>{itm.brand}</td>
                                <td>{itm.model}</td>
                                <td>{itm.plate}</td>
                                <td>{itm.color}</td>
                                <td>{itm.parkingNo}</td>
                                <td>{itm.parkingFloor}</td>
                                <td>${itm.amount}</td>
                                <td style={{color:"orange"}}>{itm.status}</td>
                                <td>{itm.assignCleaner?itm.assignCleaner:<button onClick={()=>{setEditIndex(itm.id);handleShow()}} className={'btn btn-primary'}>Assign</button>}</td>
                                <td></td>
                                {/*<td>{itm.paymentId}</td>*/}
                                <td>{itm.createdAt}</td>
                                <td onClick={()=>{setBookingId(itm.id);handleShow()}}>{(itm.status == 'completed' || itm.status == 'reviewed')?"":<button className={'btn btn-primary'}>Complete</button>}</td>
                                {/*<td><i style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>*/}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>


                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <form onSubmit={completeBooking}>
                        <Modal.Header closeButton>
                            <Modal.Title>Complete Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label><b>Upload Images (Max 3)</b></label>
                            <input onChange={(e)=>{setImages(e.target.files)}} required className={'form-control'} type={'file'} multiple/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type={'submit'} variant="primary">Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        </>
    )
}

export default CleanerTask