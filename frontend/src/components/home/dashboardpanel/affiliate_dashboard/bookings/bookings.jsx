import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";



function AffiliateBookings() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    let [bookings,setBookings]=useState(null);
    let [bookingsE,setBookingsE]=useState(null);
    let [cleaner,setCleaner]=useState(null);
    let [slot,setSlot]=useState(null);

    let [editIndex,setEditIndex]=useState(null);
    let [cleanerId,setCleanerId]=useState(null);
    let [bookingId,setBookingId]=useState(null);
    let [selectedSlot,setSelectedSlot]=useState(null);

    useEffect(async ()=>{
        let data={
            id: JSON.parse(sessionStorage.getItem('auth'))?.id
        }
        let res1=await Api.codeByUserId(data);
        if (res1.status == '200')
        {
            let par={
                code: res1.data.code
            }

            let res=await Api.getAffiliateBookings(par);

            if (res.status == '200')
            {
                setBookings(res.onetime);
                setBookingsE(res.monthly);
            }
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
        let res=await Api.getAllBookings();
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
                        <th>Booking</th>
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>PLATE</th>
                        <th>COLOR</th>
                        <th>PARKING#</th>
                        <th>PARKING FLOOR</th>
                        {/*<th>Comment</th>*/}
                        <th>AMOUNT</th>
                        <th>COMMISSION</th>
                        <th>CREATED</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        bookings?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.carType}</td>
                                <td>{itm.planId}</td>
                                <td>{itm.bookingType}</td>
                                <td>{itm.brand}</td>
                                <td>{itm.model}</td>
                                <td>{itm.plate}</td>
                                <td>{itm.color}</td>
                                <td>{itm.parkingNo}</td>
                                <td>{itm.parkingFloor}</td>
                                <td>{itm.amount} AED</td>
                                <td>{itm.commission} AED</td>
                                <td>{itm.createdAt}</td>
                            </tr>
                        ))
                    }
                    {
                        bookingsE?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.carType}</td>
                                <td>{itm.planId}</td>
                                <td>{itm.bookingType}</td>
                                <td>{itm.brand}</td>
                                <td>{itm.model}</td>
                                <td>{itm.plate}</td>
                                <td>{itm.color}</td>
                                <td>{itm.parkingNo}</td>
                                <td>{itm.parkingFloor}</td>
                                <td>{itm.amount} AED</td>
                                <td>{itm.commission} AED</td>
                                <td>{itm.createdAt}</td>
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

export default AffiliateBookings