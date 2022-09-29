import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
// import Form from 'react-bootstrap/Form';
import BeautyStars from 'beauty-stars';


function UserBooking() {

    const [rating,setRating]=useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [bookings,setBookings]=useState(null);
    let [bookingId,setBookingId]=useState(null);

    let [editIndex,setEditIndex]=useState(null);
    let [review,setReview]=useState(null);

    useEffect(async ()=>{

        let userData=JSON.parse(sessionStorage.getItem('auth'));
        console.log(userData)

        let data={
            id: userData.id
        }

        let res=await Api.getAllBokingsByUserId(data);
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

        let data={
            id: bookingId,
            review: rating
        }

        let res= await Api.reviewAndUpdate(data);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            refreshRecord();
            handleClose();
        }
    }


    async function refreshRecord() {
        let userData=JSON.parse(sessionStorage.getItem('auth'));
        console.log(userData)

        let data={
            id: userData.id
        }

        let res=await Api.getAllBokingsByUserId(data);
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
                        <th>UPLOADED IMAGES</th>
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
                                <td>{itm.assignCleaner}</td>
                                <td>{itm.review}</td>
                                <td>
                                    {itm.cleanerImg1?<><a target="_blank" href={itm.cleanerImgLink1}>Image 1</a><br/></>:""}
                                    {itm.cleanerImg2?<><a target="_blank" href={itm.cleanerImgLink2}>Image 2</a><br/></>:""}
                                    {itm.cleanerImg3?<><a target="_blank" href={itm.cleanerImgLink3}>Image 3</a><br/></>:""}
                                </td>
                                {/*<td>{itm.paymentId}</td>*/}
                                <td>{itm.createdAt}</td>
                                <td onClick={()=>{setBookingId(itm.id);handleShow()}}>{(itm.status == 'completed')?<button className={'btn btn-primary'}>Review</button>:""}</td>
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
                            <Modal.Title>Review Booking</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label><b>Select Rating (1-5)</b></label>
                            <BeautyStars
                                value={rating}
                                onChange={value => setRating( value )}
                            />
                            <i className={'text-mute'}>Your Rating: {rating}</i>
                            {/*<input type={'range'} min={1} max={5} onChange={(e)=>setReview(e.target.value)} className={'form-control'}></input>*/}
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

export default UserBooking