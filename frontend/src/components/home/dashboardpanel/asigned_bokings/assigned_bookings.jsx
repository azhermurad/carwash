import React,{useState,useEffect} from 'react'
import add from '../../../../assets/images/add.png'
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Api from "../../../../apis/apis";
import Notifications from "../../../../notifications/notifications";



function AssignedBookings() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    let [bookings,setBookings]=useState(null);
    let [cleaner,setCleaner]=useState(null);
    let [slot,setSlot]=useState(null);

    let [editIndex,setEditIndex]=useState(null);
    let [cleanerId,setCleanerId]=useState(null);
    let [bookingId,setBookingId]=useState(null);
    let [selectedSlot,setSelectedSlot]=useState(null);

    useEffect(async ()=>{

        let res2=await Api.getAllSlots();
        if (res2.status == '200')
        {
            setSlot(res2.data);
        }

        let res=await Api.allAssignedBookings();
        if (res.status == '200')
        {
            setBookings(res.data);

        }

        let res1=await Api.getAllCleaners();
        if (res1.status == '200')
        {
            setCleaner(res1.data);

        }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])

    let history=useHistory();


    async function assignTimeSlot(e)
    {
        e.preventDefault();

        let data={
            time: selectedSlot,
            bookingId: bookingId
        }

        let res= await Api.assignTimeToBooking(data);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            handleClose1();
            await refreshRecord();
        }
    }


    async function assignCleaner(e){
        e.preventDefault();

        let data={
            id: editIndex,
            cleanerId: cleanerId
        }

        let res=await Api.adminAssignBooking(data);


        if (res.status == "200")
        {
            await Notifications.successMsg(res.message);
            history.push('/booking');
        }
        else
        {
            await Notifications.errorMsg(res.message);
        }
        handleClose();
        await refreshRecord();
        resetForm();


    }


    async function refreshRecord() {
        let res=await Api.allAssignedBookings();
        if (res.status == '200')
        {
            setBookings(res.data);

        }
    }


    function resetForm() {
        setEditIndex("");
        setCleanerId("");
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
                        <th>Booking</th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>PLATE</th>
                        <th>COLOR</th>
                        <th>PARKING#</th>
                        <th>PARKING FLOOR</th>
                        {/*<th>Comment</th>*/}

                        <th>AMOUNT</th>
                        <th>STATUS</th>
                        <th>CLEANER</th>
                        <th>UPLOADED IMAGES</th>
                        <th>REVIEW</th>
                        {/*<th>PAYMENT</th>*/}
                        <th>CREATED</th>
                        {/*<th>Edit</th>*/}
                        <th>Delete</th>
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
                                <td>{itm.date}</td>
                                <td>{itm.time?itm.time:<button onClick={()=>{setBookingId(itm.id);handleShow1()}} className={'btn btn-primary'}>Assign</button>}</td>
                                <td>{itm.brand}</td>
                                <td>{itm.model}</td>
                                <td>{itm.plate}</td>
                                <td>{itm.color}</td>
                                <td>{itm.parkingNo}</td>
                                <td>{itm.parkingFloor}</td>
                                {/*<td>{itm.comment}</td>*/}

                                <td>${itm.amount}</td>
                                <td style={{color:"orange"}}>{itm.status}</td>
                                <td>{itm.assignCleaner?itm.assignCleaner:<button onClick={()=>{setEditIndex(itm.id);handleShow()}} className={'btn btn-primary'}>Assign</button>}</td>
                                <td>
                                    {itm.cleanerImg1?<><a target="_blank" href={itm.cleanerImgLink1}>Image 1</a><br/></>:""}
                                    {itm.cleanerImg2?<><a target="_blank" href={itm.cleanerImgLink2}>Image 2</a><br/></>:""}
                                    {itm.cleanerImg3?<><a target="_blank" href={itm.cleanerImgLink3}>Image 3</a><br/></>:""}
                                </td>
                                <td></td>
                                {/*<td>{itm.paymentId}</td>*/}
                                <td>{itm.createdAt}</td>
                                {/*<td onClick={}><i style={{color:"green",cursor:"pointer"}} className={'fas fa-pen'}></i></td>*/}
                                <td><i style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>
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
                    <form onSubmit={assignCleaner}>
                        <Modal.Header closeButton>
                            <Modal.Title>Assign Cleaner</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Select Cleaner</label>
                            <Form.Select aria-label="Default select example" onChange={(e)=>{setCleanerId(e.target.value)}}>
                                <option>Open this select menu</option>
                                {
                                    cleaner?.map((itm,i)=>(
                                        <option value={itm.id}>{itm.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type={'submit'} variant="primary">Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <Modal
                    show={show1}
                    onHide={handleClose1}
                    backdrop="static"
                    keyboard={false}
                >
                    <form onSubmit={assignTimeSlot}>
                        <Modal.Header closeButton>
                            <Modal.Title>Assign Time Slot</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Select Time SLot</label>
                            <Form.Select aria-label="Default select example" onChange={(e)=>{setSelectedSlot(e.target.value)}}>
                                <option>Open this select menu</option>
                                {
                                    slot?.map((itm,i)=>(
                                        <option value={itm.time}>{itm.time}</option>
                                    ))
                                }
                            </Form.Select>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
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

export default AssignedBookings