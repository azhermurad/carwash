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
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


function RecentPlans() {

    const [rating,setRating]=useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [bookings,setBookings]=useState(null);
    let [bookingId,setBookingId]=useState(null);

    let [amount,setAmount]=useState(null);

    useEffect(async ()=>{

        let userData=JSON.parse(sessionStorage.getItem('auth'));
        console.log(userData)

        let data={
            userId: userData?userData.id:"-1"
        }

        let res=await Api.allRecentPlans(data);
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


    let [carType,setcarType]=useState(null);
    let [packageId,setpackageId]=useState(null);
    let [extFeatures,setextFeatures]=useState(null);
    let [brand,setbrand]=useState(null);
    let [model,setmodel]=useState(null);
    let [plate,setplate]=useState(null);
    let [color,setcolor]=useState(null);
    let [parkingNo,setparkingNo]=useState(null);
    let [parkingFloor,setparkingFloor]=useState(null);

    const onToken = async (token) => {

        let data={
            token: token,
            carType: carType,
            planId: parseInt(packageId),
            packageType: 'monthly',
            userId: parseInt(JSON.parse(sessionStorage.getItem('auth'))?.id),
            extraFeatures: extFeatures,
            date: "",
            bookingType: 'monthly',
            amount: amount,
            time: "",
            brand: brand,
            model: model,
            plate: plate,
            color: color,
            parkingNo: parkingNo,
            parkingFloor: parkingFloor,
            usrName: JSON.parse(sessionStorage.getItem('auth'))?.name,
            usrEmail: JSON.parse(sessionStorage.getItem('auth'))?.email,
            usrAddress: JSON.parse(sessionStorage.getItem('auth'))?.address,

            status: 'placed',
            couponCode: "",
            commission: "",
            discount: "",
            affiliateId: "",
            linkId: "",

        }

        let res= await axios.post('http://localhost:4700/create-payment',data);
        if (res.status == '200')
        {
            await Notifications.successMsg('Booking Conformed');
            window.location.reload();
        }
        else
        {
            await Notifications.errorMsg('Something went wrong. Try Again!');
            window.location.reload();
        }
    }


    function setValues(carType,packageId,extFeatures,brand,model,plate,color,parkingNo,parkingFloor,amt) {
        setcarType(carType);
        setpackageId(packageId);
        setextFeatures(extFeatures);
        setbrand(brand);
        setmodel(model);
        setplate(plate);
        setcolor(color);
        setparkingNo(parkingNo);
        setparkingFloor(parkingFloor);
        setAmount(amt)
    }



    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Recent Plan</h3>
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
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>PLATE</th>
                        <th>COLOR</th>
                        <th>PARKING#</th>
                        <th>PARKING FLOOR</th>
                        <th>AMOUNT</th>
                        <th>Action</th>
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

                                <td>{itm.brand}</td>
                                <td>{itm.model}</td>
                                <td>{itm.plate}</td>
                                <td>{itm.color}</td>
                                <td>{itm.parkingNo}</td>
                                <td>{itm.parkingFloor}</td>
                                <td>${itm.amount}</td>
                                <td>
                                    <button
                                        onClick={()=>{handleShow();setValues(itm.carType,itm.planId,itm.extraFeatures,itm.brand,itm.model,itm.plate,itm.color,itm.parkingNo,itm.parkingFloor,itm.amount)}} className={'btn btn-primary'}>Resubscribe</button></td>
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
                    {/*<form >*/}
                        <Modal.Header closeButton>
                            <Modal.Title>Resubscribe Plan</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label><b>Are you sure want to Buy this plan again?</b></label>
                            <p className='text-center mt-4 '>
                                <StripeCheckout
                                    name={"Pay " +amount}
                                    amount={amount*100} // cents
                                    currency="AED"// the pop-in header title
                                    token={onToken}
                                    stripeKey="pk_test_51LXoKNA82nvbi04Cmtz1dSfDSzwo3cYWyhHL1SqeoWxtMqfEIsA25M9VPayqiAVn6acHmUyHm9UJXTR6WggyOfXZ00AWulYq4G"
                                />
                                {/*<button onClick={submitForm}>Get</button>*/}
                            </p>
                            {/*<input type={'range'} min={1} max={5} onChange={(e)=>setReview(e.target.value)} className={'form-control'}></input>*/}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            {/*<Button type={'button'} variant="primary">Save</Button>*/}
                        </Modal.Footer>
                    {/*</form>*/}
                </Modal>
            </div>
        </>
    )
}

export default RecentPlans