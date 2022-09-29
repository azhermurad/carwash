import React,{useState,useEffect} from 'react'
import './website.css'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {Link, useHistory} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Api from "../../apis/apis";
import Notifications from "../../notifications/notifications";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import logo from '../../assets/images/logo.png'

function Website() {

    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [desc,setDesc]=useState(null);
    let [usr,setUsr]=useState(null);
    let [slots,setSlots]=useState(null);
    let [codeStatus,setCodeStatus]=useState(null);


    let [showMobileScreen,setShowMobileScreen]=useState(true);
    let [showOtpScreen,setShowOtpScreen]=useState(false);
    let [showCarScreen,setShowCarScreen]=useState(false);
    let [showPackagesTypeScreen,setShowPackagesTypeScreen]=useState(false);
    let [showPackagesScreen,setShowPackagesScreen]=useState(false);
    let [showExtraScreen,setShowExtraScreen]=useState(false);
    let [showBookingScreen,setShowBookingScreen]=useState(false);
    let check= JSON.parse(sessionStorage.getItem('auth'))?true:false;
    let [checkAuth,setCheckAuth]=useState(check);
    let [couponApplied,setCouponApplied]=useState(false);
    let [packages,setPackages]=useState(null);
    let [extraFeatures,setExtraFeatures]=useState(null);
    let [userDiscount,setUserDiscount]=useState(null);
    let [affiliateCommission,setAffiliateCommission]=useState(null);
    let [subTotal,setSubTotal]=useState(null);

    useEffect(async ()=>{

        let res3=await Api.getCODStatus();
        if (res3.status ='200')
        {
            setCodeStatus(res3.data);
        }

        let res2=await Api.getAllSlots();
        if (res2.status ='200')
        {
            setSlots(res2.data);
        }

        setUsr(JSON.parse(sessionStorage.getItem('auth')));

        let res1= await Api.getAllExtraFeatures();
        if (res1.status == '200')
        {
            setExtraFeatures(res1.data);
        }

        // if (checkAuth)
        // {
        //     setShowMobileScreen(false);
        //     setShowCarScreen(true);
        // }
        // else
        // {
        //     setShowMobileScreen(true);
        //     setShowCarScreen(false);
        // }
    },[])



    let [phone,setPhone]=useState(null);
    let [otp,setOtp]=useState(null);
    let [carType,setCarType]=useState(null);
    let [packageType,setPackageType]=useState(null);
    let [packageId,setPackageId]=useState([]);
    let [extFeatures,setExtFeatures]=useState([]);
    let [amount,setAmount]=useState(0);
    let [usrName,setUsrName]=useState(null);
    let [usrEmail,setUsrEmail]=useState(null);
    let [usrAddress,setUsrAddress]=useState(null);
    let [date,setDate]=useState(null);
    let [time,setTime]=useState(null);
    let [brand,setBrand]=useState(null);
    let [model,setModel]=useState(null);
    let [plate,setPlate]=useState(null);
    let [color,setColor]=useState(null);
    let [parkingNo,setParkingNo]=useState(null);
    let [parkingFloor,setParkingFloor]=useState(null);
    let [code,setCode]=useState(null);
    let [link,setLink]=useState(null);
    let [linkDes,setLinkDes]=useState(null);
    // let [couponData,setCouponData]=useState(null);
    let [affiliateId,setAffiliateId]=useState(null);




    async function getOtp(e) {
        e.preventDefault();

        let data={
            phone: phone
        }

        let res = await Api.userSigninAndSignupByPhone(data);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message)
            setShowMobileScreen(false);
            setShowOtpScreen(true);
        }
        else
        {
            await Notifications.errorMsg(res.message)
        }
    }


    function resetAmount() {
        setAmount(0);
    }


    function calculateAmount(value){
        let total=parseInt(amount)+parseInt(value);
        setAmount(total);
    }


    async function verifyOtp(e) {

        e.preventDefault();

        let data={
            code: otp
        }

        let res = await Api.verifyOtp(data);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            sessionStorage.setItem('auth',JSON.stringify(res.data))
            setShowOtpScreen(false);
            setShowCarScreen(true);
        }
        else
        {
            await Notifications.errorMsg(res.message);

        }
    }


    async function getPackages(car,type) {

        let data={
            car: car,
            type: type
        }

        console.log(data)

        let res= await Api.allPlanByCarAndPlanType(data);
        console.log(res)
        if (res.status == '200')
        {
            setPackages(res.data);
        }
    }


    // async function submitForm() {
    //
    //     let user=JSON.parse(sessionStorage.getItem('auth'));
    //
    //     let data={
    //         carType: carType,
    //         planId: packageId,
    //         userId: usr?.id,
    //         packageType: packageType,
    //         extraFeatures: extFeatures,
    //         date: date,
    //         bookingType: packageType,
    //         amount: couponApplied?subTotal:amount,
    //         time: time,
    //         brand: brand,
    //         model: model,
    //         plate: plate,
    //         color: color,
    //         parkingNo: parkingNo,
    //         parkingFloor: parkingFloor,
    //         // coupon: coupon,
    //         usrName: usrName,
    //         usrEmail: usrEmail,
    //         usrAddress: usrAddress,
    //         // couponCode: coupon.code,
    //         // commission: affiliateCommission,
    //         // discount:  userDiscount,
    //         // affiliateId: coupon.userId,
    //         // linkId: coupon.id,
    //     }
    //
    //     console.log("Form Data:",data);
    //
    // }


    function addOrRemoveExtFeatures(value) {
        // (extFeatures.indexOf(value) > -1)?extFeatures.filter(item => item !== value):setExtFeatures([...extFeatures,value])
        if(extFeatures.indexOf(value) > -1)
        {
            extFeatures.filter(item => item !== value)
        }
        else
        {
            setExtFeatures([...extFeatures,value])
        }

    }
    function addOrRemovePlan(value) {
        // (extFeatures.indexOf(value) > -1)?extFeatures.filter(item => item !== value):setExtFeatures([...extFeatures,value])
        if(packageId.indexOf(value) > -1)
        {
            packageId.filter(item => item !== value)
        }
        else
        {
            setPackageId([...packageId,value])
        }

    }

    const successPayment = data => {
        alert('Payment Successful');
    };

    const errorPayment = data => {
        alert('Payment Error');
    };

    const onToken = async (token) => {

        if (model == null || model == ''  || plate == null || plate == '' || brand == null || brand == '' || parkingFloor == null || parkingFloor == '' || parkingNo == null || parkingNo == '')
        {
            await Notifications.errorMsg('Please enter data in all the fields');
            return ;
        }
        else
        {
            let data={
                token: token,
                carType: carType,
                planId: packageId,
                packageType: packageType,
                userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
                extraFeatures: extFeatures,
                date: date,
                bookingType: packageType,
                amount: couponApplied?subTotal:amount,
                time: time,
                brand: brand,
                model: model,
                plate: plate,
                color: color,
                parkingNo: parkingNo,
                parkingFloor: parkingFloor,
                usrName: usrName,
                usrEmail: usrEmail,
                usrAddress: usrAddress,
                status: 'placed',
                couponCode: link?.code,
                commission: affiliateCommission,
                discount:  userDiscount,
                affiliateId: link?.userId,
                linkId: linkDes?.id,

            }

            let res= await Api.stripePayment(data);
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
    }

    async function payWithCode() {
        if (model == null || model == ''  || plate == null || plate == '' || brand == null || brand == '' || parkingFloor == null || parkingFloor == '' || parkingNo == null || parkingNo == '')
        {
            await Notifications.errorMsg('Please enter data in all the fields');
            return ;
        }
        else
        {
            let data={
                carType: carType,
                planId: packageId,
                packageType: packageType,
                userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
                extraFeatures: extFeatures,
                date: date,
                bookingType: packageType,
                amount: couponApplied?subTotal:amount,
                time: time,
                brand: brand,
                model: model,
                plate: plate,
                color: color,
                parkingNo: parkingNo,
                parkingFloor: parkingFloor,
                usrName: usrName,
                usrEmail: usrEmail,
                usrAddress: usrAddress,
                status: 'placed',
                couponCode: link?.code,
                commission: affiliateCommission,
                discount:  userDiscount,
                affiliateId: link?.userId,
                linkId: linkDes?.id,

            }

            let res= await Api.codPayment(data);
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
    }

    function resetForm() {

    }


    async function applyCoupon() {

        let data={
            code: code
        }

        console.log(data);

        let res= await Api.linkByCode(data); // get user by code


        console.log(res)

        if (res.status == '200')
        {
            setLink(res.data);

            let data1={
                userId: res.data.userId,
                planId: packageId
            }

            console.log(data1);

            let res1= await Api.linkDescByPlanAndUser(data1); // get user by code
            console.log(res1);



            if (res1.status == '200')
            {
                setLinkDes(res1.data);
                setCouponApplied(true);


                if (res1.data.type == 'absolute')
                {
                    setAffiliateCommission(res1.data.commission);
                    setUserDiscount(res1.data.discount);
                    setSubTotal(parseInt(amount)-parseInt(res1.data.discount));
                    setAffiliateId(res1.data.userId);
                    setCode('');
                    await Notifications.successMsg('Coupon Applied');
                }
                else
                {
                    setAffiliateCommission((parseInt(amount)*(res1.data.commission)/100));
                    setUserDiscount((parseInt(amount)*(res1.data.discount)/100));
                    setSubTotal(parseInt(amount)-(parseInt(amount)*(res1.data.discount)/100));
                    setAffiliateId(res1.data.userId);
                    setCode('');
                    await Notifications.successMsg('Coupon Applied');
                }
            }
            else
            {
                await Notifications.errorMsg(res1.message);
                setCode('');
            }
        }





    }

    return(
        <>
            <div class='main'>
                <div class='container-fluid'>
                    <div class='row d-flex'>
                        <div class='col-xl-8 col-lg-8 col-md-8 col-sm-12 c1'>
                            <div class='p-3'>
                                {/*<h1>Welcome to </h1>*/}
                                {/*<h1>Car Wash </h1>*/}
                                <img class='mt-2 mb-2' src={logo} width={200} height={130}/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi atque blanditiis dolorum, esse eveniet illum, laboriosam laudantium libero modi mollitia neque obcaecati officiis perspiciatis placeat possimus quam quasi, tempora tempore.</p>
                                {
                                    showMobileScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                1
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                2
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                3
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                4
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                5
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='sign-cont mt-5'>
                                                <div className='sign-form'>
                                                    <form onSubmit={getOtp}>
                                                        <div className=' load-form'>
                                                            <div className=' load-input-wrapper'>
                                                                <div className=' load-input'>
                                                                    <label>Phone</label>
                                                                    <input required type={'phone'}  placeholder="Enter phone number" min={10} max={10} minLength={10} maxLength={10} className='form-input_ input' value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                                                                </div>
                                                            </div>
                                                            <div className='sign-forget'>
                                                                {/*<Link to={'/reset-password'}>Forgot Password?</Link>*/}
                                                            </div>
                                                            <div className='form-buttons'>
                                                                <button type={'submit'} style={{ fontSize: '14px', background: "#FF7B00" }} className='button-primary'>Get OTP</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        ""
                                }

                                {
                                    showOtpScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i class='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                2
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                3
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                4
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                5
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='sign-cont mt-5'>
                                                <div className='sign-form'>
                                                    <form onSubmit={verifyOtp}>
                                                        <div className=' load-form'>
                                                            <div className=' load-input-wrapper'>
                                                                <div className=' load-input'>
                                                                    <label>OTP</label>
                                                                    <input required type={'phone'}  placeholder="Enter OTP"  minLength={6} maxLength={6} className='form-input_ input' value={otp} onChange={(e)=>{setOtp(e.target.value)}} />
                                                                </div>
                                                            </div>
                                                            <div className='sign-forget'>
                                                                {/*<Link to={'/reset-password'}>Forgot Password?</Link>*/}
                                                            </div>
                                                            <div className='form-buttons'>
                                                                <button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Login</button>
                                                                {/*<button onClick={()=>{setShowMobileScreen(true);setShowOtpScreen(false)}} style={{ fontSize: '14px' }} className='button-primary'>Resend Otp</button>*/}
                                                            </div>
                                                            <div className='form-buttons mt-1'>
                                                                {/*<button type={'submit'} style={{ fontSize: '14px' }} className='button-primary'>Login</button>*/}
                                                                <button onClick={()=>{setShowMobileScreen(true);setShowOtpScreen(false);setPhone(null)}} style={{ fontSize: '14px' }} className='button-primary'>Resend Otp</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        ""
                                }
                                {
                                    showCarScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div
                                                        className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                3
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                4
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                5
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{marginTop: "6%"}}>
                                                <p className='text-center '>
                                                    <button style={{width: "50%"}} className='btn btn-outline-primary' onClick={()=>{setShowCarScreen(false);setShowPackagesTypeScreen(true);setCarType('SUV')}}>SUV</button>
                                                </p>
                                                <p className='text-center '>
                                                    <button style={{width: "50%",marginTop: "2%"}} className='btn btn-outline-primary' onClick={()=>{setShowCarScreen(false);setShowPackagesTypeScreen(true);setCarType('Sedan')}}>Sedan</button>
                                                </p>
                                                <p className='text-center mt-5'>
                                                    <button style={{width: "50%",marginTop: "2%"}} className='btn btn-warning' onClick={()=>{setShowMobileScreen(true);setShowOtpScreen(false);setShowCarScreen(false);setPhone(null)}}>Resend OTP</button>
                                                </p>
                                            </div>
                                        </>
                                        :
                                        ""
                                }
                                {
                                    showPackagesTypeScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div
                                                        className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                4
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                5
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{marginTop: "6%"}}>
                                                <p className='text-center '>
                                                    <button style={{width: "50%"}} className='btn btn-outline-primary' onClick={async ()=>{setShowPackagesTypeScreen(false);setShowPackagesScreen(true);setPackageType('onetime');await getPackages(carType,'onetime')}}>One Time Wash</button>
                                                </p>
                                                <p className='text-center '>
                                                    <button style={{width: "50%",marginTop: "2%"}} className='btn btn-outline-primary' onClick={async ()=>{setShowPackagesTypeScreen(false);setShowPackagesScreen(true);setPackageType('monthly');await getPackages(carType,'monthly')}}>Monthly Packages</button>
                                                </p>
                                                <p className='text-center mt-4'>
                                                    <button style={{width: "50%",marginTop: "2%"}} className='btn btn-outline-secondary customButtonColor' onClick={async ()=>{setShowPackagesTypeScreen(false);setShowCarScreen(true)}}>Previous</button>
                                                </p>
                                            </div>
                                        </>
                                        :
                                        ""
                                }
                                {
                                    showPackagesScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div
                                                        className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                4
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                5
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{marginTop: "6%"}}>
                                                <div class='container-fluid'>
                                                    {
                                                        packages?.map((itm,i)=>(
                                                            <div className='row mt-1 p-1' style={{background: "white"}} >
                                                                <div className='col-lg-3 col-md-3 col-sm-3'><input onClick={()=>{setShowPackagesScreen(false);setShowExtraScreen(true);setPackageId(itm.id);calculateAmount(itm.price)}} type={'radio'}/></div>
                                                                <div
                                                                    className='col-lg-3 col-md-3 col-sm-3'>{itm.name}</div>
                                                                <div
                                                                    className='col-lg-3 col-md-3 col-sm-3'>{itm.price} AED</div>
                                                                <div className='col-lg-3 col-md-3 col-sm-3'>
                                                                    <button onClick={()=>{setDesc(itm.feature1);handleShow()}} className='btn btn-secondary customButtonColor'>Read more</button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <p className='text-center mt-4'>
                                                        <button style={{width: "50%",marginTop: "2%"}} className='btn btn-outline-secondary customButtonColor' onClick={async ()=>{setShowPackagesScreen(false);setShowPackagesTypeScreen(true)}}>Previous</button>
                                                    </p>
                                                </div>
                                                {/*<p class={'text-center mt-3'}><button className={'p-1'} >Next</button></p>*/}
                                            </div>
                                        </>
                                        :
                                        ""
                                }
                                {
                                    showExtraScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div
                                                        className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                5
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<button className='mt-5 mb-2 p-1' onClick={()=>{setExtFeatures([])}}>Reset</button>*/}
                                            <div style={{marginTop: "4%"}}>
                                                {
                                                    extraFeatures?.map((itm,i)=>(
                                                        <div className='container-fluid mt-2' style={{background: "white"}}>
                                                            <div className='row p-3'>
                                                                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                                                                    <p>
                                                                        <input type='checkbox' onClick={async ()=>{addOrRemoveExtFeatures(itm.id);calculateAmount(itm.price)}} />
                                                                    </p>
                                                                </div>
                                                                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                                                                    <p>{itm.name}</p>
                                                                </div>
                                                                {/*<div className='col-xl-3 col-lg-3 col-md-3 col-sm-3'>*/}
                                                                {/*    <p>{itm.time} min</p>*/}
                                                                {/*</div>*/}
                                                                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-4'>
                                                                    <p>{itm.price} AED</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <p className={'text-center mt-4'}><button class='btn btn-primary customButtonColor' style={{width: '100px'}} onClick={()=>{setShowExtraScreen(false);setShowBookingScreen(true)}}>Next</button></p>
                                            <p className={'text-center mt-2'}><button class='btn btn-primary customButtonColor' style={{width: '100px'}} onClick={()=>{resetAmount();setShowExtraScreen(false);setShowPackagesScreen(true);}}>Previous</button></p>
                                        </>
                                        :
                                        ""
                                }
                                {
                                    showBookingScreen?
                                        <>
                                            <div className='container-fluid multi-step p-1'>
                                                <div className='row'>
                                                    <div
                                                        className='col-xl-12 col-lg-12 col-md-12 col-sm-12 multi-links'>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Mobile Number</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> OTP</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Vehiche Type</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Plan</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                <i className='fas fa-check'></i>
                                                            </Badge><span class="badgeDesc"> Add on</span>
                                                        </div>
                                                        <div>
                                                            <Badge pill   bg="primary">
                                                                6
                                                            </Badge><span class="badgeDesc"> Conform</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='mt-4'>
                                                {
                                                    (packageType == 'onetime')?
                                                        <div className='container-fluid mt-2 p-4' style={{border: "3px solid blue",borderRadius: "10px"}}>
                                                            <div className='row'>
                                                                <div
                                                                    className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                    <label>Date</label>
                                                                    <input required onChange={(e) => {
                                                                        setDate(e.target.value)
                                                                    }} className='form-control' type={'date'}/>
                                                                </div>
                                                                <div
                                                                    className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                    <label>Time Slot</label>
                                                                    <select className='form-control' required
                                                                            onChange={(e) => {
                                                                                setTime(e.target.value)
                                                                            }}>
                                                                        <option>Select</option>
                                                                        {
                                                                            slots?.map((itm, i) => (
                                                                                <option
                                                                                    value={itm.time}>{itm.time}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>:""
                                                }
                                                {
                                                    (usr?.email == '' || usr?.email == null)?
                                                        <>
                                                            <div className='container-fluid mt-4 p-1' style={{border: "3px solid blue",borderRadius: "10px"}}>
                                                                <div className='row'>
                                                                    <div
                                                                        className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                        <label>Name</label>
                                                                        <input required value={usrName} onChange={(e)=>{setUsrName(e.target.value)}}  className='form-control' type={'text'}/>
                                                                    </div>
                                                                    <div
                                                                        className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                        <label>Email</label>
                                                                        <input required value={usrEmail} onChange={(e)=>{setUsrEmail(e.target.value)}}  className='form-control' type={'email'}/>
                                                                    </div>
                                                                    <div
                                                                        className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                        <label>Apt no. or Building Name </label>
                                                                        <input required value={usrAddress} onChange={(e)=>{setUsrAddress(e.target.value)}}  className='form-control' type={'text'}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :""
                                                }
                                                <div class='mt-4 p-2' style={{border: "3px solid blue",borderRadius: "10px"}}>
                                                    <div className='container-fluid mt-2'>
                                                        <div className='row'>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Brand</label>
                                                                <input required onChange={(e)=>{setBrand(e.target.value)}} value={brand} className='form-control' type={'text'}/>
                                                            </div>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Model</label>
                                                                <input required onChange={(e)=>{setModel(e.target.value)}} value={model} className='form-control' type={'text'}/>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className='container-fluid mt-2'>
                                                        <div className='row'>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Plate No</label>
                                                                <input required onChange={(e)=>{setPlate(e.target.value)}} value={plate} className='form-control' type={'text'}/>
                                                            </div>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Color</label>
                                                                <input required onChange={(e)=>{setColor(e.target.value)}} value={color} className='form-control' type={'text'}/>
                                                            </div>


                                                        </div>
                                                    </div>
                                                    <div className='container-fluid mt-2'>
                                                        <div className='row'>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Parking No</label>
                                                                <input required onChange={(e)=>{setParkingNo(e.target.value)}} value={parkingNo} className='form-control' type={'text'}/>
                                                            </div>
                                                            <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                                <label>Parking Floor</label>
                                                                <input required onChange={(e)=>{setParkingFloor(e.target.value)}} value={parkingFloor} className='form-control' type={'text'}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            <div className='container-fluid mt-5' style={{background: "gray",borderRadius: "10px"}}>
                                                <div className='row p-3 ' >
                                                    <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                        <label><b>Coupon</b></label>
                                                        <input value={code} onChange={(e)=>{setCode(e.target.value)}} className='form-control' placeholder={'Enter Coupon'} type={'text'}/>
                                                    </div>
                                                    <div className='col-lg-6 col-md-6 col-sm-6 d-flex flex-column'>
                                                        <label style={{visibility: "hidden"}}>Coupon</label>
                                                        <button onClick={applyCoupon} className={'btn btn-primary'}>Apply</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class='mt-5 justify-content-center'>
                                                {/*<br/>*/}
                                                <h4 className={'text-center'}><b>Total: </b>{amount} AED</h4>
                                                <h4 className={'text-center'}><b>Discount: </b>{couponApplied?userDiscount:"0"} AED</h4>
                                                <h4 className={'text-center'}><b>Subtotal: </b>{couponApplied?subTotal:"0"} AED</h4>
                                                <p class='text-center mt-4 '>
                                                    <StripeCheckout
                                                        name={"Pay "+couponApplied?subTotal:amount+".00"}
                                                        amount={couponApplied?subTotal*100:amount*100} // cents
                                                        currency="AED"// the pop-in header title
                                                        token={onToken}
                                                        stripeKey="pk_test_51LXoKNA82nvbi04Cmtz1dSfDSzwo3cYWyhHL1SqeoWxtMqfEIsA25M9VPayqiAVn6acHmUyHm9UJXTR6WggyOfXZ00AWulYq4G"
                                                    />
                                                    {/*<button onClick={submitForm}>Get</button>*/}
                                                </p>
                                            </div>
                                            {
                                                (codeStatus?.status == 'true')?
                                                    <div className='mt-3 justify-content-center'>
                                                        {/*<br/>*/}
                                                        <h4 className={'text-center'}>
                                                            <button onClick={payWithCode} className='btn btn-primary'>Pay With COD</button>
                                                        </h4>
                                                    </div>
                                                    :""
                                            }

                                        </>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                        <div class='col-xl-4 col-lg-4 col-md-4 col-sm-12 c2'>
                            <div class={'faqs p-1'}>
                                <h5 style={{marginTop: "5%"}} className={'text-center'}>How can we Help you ?</h5>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>What payment methods exist in your company?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            Direct back transfer ,Debit and credit card.

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>How do I book car wash service ?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            All car wash package available in booking tab

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>How do I make changes to an active order?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            Once you’ve placed an order, you cannot change or reschedule it via the online. If you want to make changes to a scheduled delivery, kindly contact our team.

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>What was Refund policy ?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            One time wash refund policy not applicable ,All monthly package booking please request to contact our team.

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>What was the day you wash monthly package ?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            All monthly package days and date decide by our team, make sure to choose  convenient days and date before booking done.

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5">
                                        <Accordion.Header>What was product you use for washing ?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            All of our products are safety certified by Dubai Municipality department

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="6">
                                        <Accordion.Header>Is your team professional ?</Accordion.Header>
                                        <Accordion.Body>
                                            yes, all our teams are well trained for washing ,As per policy we giving important for safety for avoid scratches and paint fade which is long term effect this reason we use micro fiber towel and concentrate product for body shine.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="7">
                                        <Accordion.Header>How do you make sure perfect wash every time ?

                                        </Accordion.Header>
                                        <Accordion.Body>
                                            In order to receive perfect wash kindly use our feedback and suggestion portal each time get washed !


                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="8">
                                        <Accordion.Header>How do I use a promotional code ?
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            There is so many way to redeem coupon:- 1-Any situation eco friendly car wash issued coupon can use while booking 2-Any situation third person or party offer you coupon code or link that can be redeem.

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div class='faqs p-1'>
                                <Card >
                                    <Card.Body>
                                        {/*<Card.Title>Card Title</Card.Title>*/}
                                        <Card.Subtitle className="mb-2"><i class='fas fa-phone'></i> +971-562871522</Card.Subtitle>
                                        <Card.Subtitle className="mb-2"><i class='fas fa-envelope'></i> info@ecofriendlycarwash</Card.Subtitle>
                                        <Card.Subtitle className="mb-2"><i class='fas fa-map-marker'></i> Suite 17, The Iridium Building,Umm Suqeim Road,Al Barsha Dubai</Card.Subtitle>
                                        <Card.Subtitle className="mb-2"><i class='fas fa-globe'></i> www.ecofriendlycarwash.ae</Card.Subtitle>
                                        {/*<Card.Text>*/}
                                        {/*    Some quick example text to build on the card title and make up the*/}
                                        {/*    bulk of the card's content.*/}
                                        {/*</Card.Text>*/}
                                        {/*<Card.Link href="#">Card Link</Card.Link>*/}
                                        {/*<Card.Link href="#">Another Link</Card.Link>*/}
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='container-fluid footer p-3'>
                 <div class='row'>
                     <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 footer-links'>
                         <h5 class='footerDesc' style={{cursor: "pointer"}}>Gallery</h5>
                         <h5 class='footerDesc' style={{cursor: "pointer"}}>Privacy & Terms</h5>
                         {/*<h5 class='footerDesc' style={{cursor: "pointer"}}>Privacy & Policy</h5>*/}
                         {/*<h5 class='footerDesc' style={{cursor: "pointer"}}>Terms & Condition</h5>*/}
                         <h5 class='footerDesc' style={{cursor: "pointer"}}>About Us</h5>
                         <h5 class='footerDesc' style={{cursor: "pointer"}} onClick={()=>{history.push('/sign-in')}}>Login</h5>
                         <h5 class='footerDesc' style={{cursor: "pointer"}}>Blog</h5>
                     </div>
                 </div>
            </div>



            <Modal show={show} onHide={handleClose}>
                {/*<Modal.Header closeButton>*/}
                {/*    <Modal.Title></Modal.Title>*/}
                {/*</Modal.Header>*/}
                <Modal.Body>
                    <textarea class='form-control' disabled cols={55} rows={10}>{desc}</textarea>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/*<Button variant="primary" onClick={handleClose}>*/}
                    {/*    Save Changes*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Website
