import React,{useState,useEffect} from 'react'
import add from '../../../../assets/images/add.png'
import {useHistory} from 'react-router-dom';
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Api from "../../../../apis/apis";
import Notifications from "../../../../notifications/notifications";


function Links() {

    let history=useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let [plans,setPlans]=useState(null);
    let [plansSuv,setPlansSuv]=useState(null);
    let [plansSedan,setPlansSedan]=useState(null);
    let [affiliate,setAffiliate]=useState(null);
    let [links,setLinks]=useState(null);



    let [selectedAffiliate,setSelectedAffiliate]=useState(null);
    let [type,setType]=useState(null);
    let [affDiscount,setAffDiscount]=useState(null);
    let [userDiscount,setUserDiscount]=useState(null);


    useEffect(async ()=>{

        let data={
            car: "SUV"
        }
        let res3=await Api.getAllPlansByCarType(data)
        if (res3.status == '200')
        {
            setPlansSuv(res3.data)
        }
        let data1={
            car: "Sedan"
        }
        let res4=await Api.getAllPlansByCarType(data1)
        if (res4.status == '200')
        {
            setPlansSedan(res4.data)
        }

        let res2=await Api.getAllPlans();
        if (res2.status == '200')
        {
            setPlans(res2.data);

        }


        let res1=await Api.getAllLinks();
        if (res1.status == '200')
        {
            setLinks(res1.data);

        }

        let res=await Api.getAllAffiliate();
        if (res.status == '200')
        {
            setAffiliate(res.data);

        }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])



    async function generateLink(e) {

        e.preventDefault();

        let data={
            userId: selectedAffiliate,
            type: type,
        }

        let res=await Api.generateAffiliateLink(data);


        if (res.status == "200")
        {
            await Notifications.successMsg(res.message);

            plansSuv?.map(async (itm,i)=>{

                let commission=document.getElementById('suvC'+i).value
                let discount=document.getElementById('suvD'+i).value

                let param={
                    userId: selectedAffiliate,
                    planId: itm.id,
                    type: type,
                    commission: commission,
                    discount: discount
                }

                let rees1=await Api.generateLinkDesc(param);
                if (rees1.status == '200')
                {
                    console.log('Yes');
                }

            })



            // history.push('/affiliate-links');
        }
        else
        {
            await Notifications.errorMsg(res.message);
        }
        handleClose();
        await refreshRecord();
        resetForm();
    }

    function resetForm() {
        setSelectedAffiliate('');
        setType('');
        setAffDiscount('');
        setUserDiscount('');
    }

    async function Delete(id) {
        let data={
            id: id
        }

        let res= await Api.adminDeleteLink(data);
        console.log(res);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            await refreshRecord();
        }
    }


    async function refreshRecord() {
        let res1=await Api.getAllLinks();
        if (res1.status == '200')
        {
            setLinks(res1.data);

        }
    }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Affiliates Links</h3>
                <div>
                    <div className='nav-buttons'>
                        <button onClick={handleShow} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Generate Link</button>
                    </div>
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <table id="example" className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>CODE</th>
                        {/*<th>LINK</th>*/}
                        <th>TYPE</th>
                        {/*<th>Affiliate DISCOUNT</th>*/}
                        {/*<th>User DISCOUNT</th>*/}
                        {/*<th>USED</th>*/}
                        {/*<th>PHONE</th>*/}
                        {/*<th>TOTAL EARNING</th>*/}
                        {/*<th>PAID</th>*/}
                        {/*<th>NOT PAID</th>*/}
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        links?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.userId}</td>
                                <td>{itm.code}</td>
                                {/*<td>{itm.link}</td>*/}
                                <td>{itm.type}</td>
                                {/*<td>{itm.commission}</td>*/}
                                {/*<td>{itm.discount}</td>*/}
                                {/*<td>{itm.timesUsed}</td>*/}
                                {/*<td>{itm.phone}</td>*/}
                                {/*<td>{itm.total}</td>*/}
                                {/*<td>{itm.paid}</td>*/}
                                {/*<td>{itm.nonpaid}</td>*/}
                                <td><i onClick={()=>{Delete(itm.id)}} style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={generateLink} style={{overflow: "auto"}}>
                    <Modal.Header closeButton >
                        <Modal.Title>Generate Link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label><b>Select Affiliate Person</b></label>
                        <Form.Select aria-label="Default select example" required onChange={(e)=>setSelectedAffiliate(e.target.value)}>
                            <option value="---">Select</option>
                            {
                                affiliate?.map((itm,i)=>(
                                    <option value={itm.id}>{itm.name}</option>
                                ))
                            }
                        </Form.Select>
                        {/*<label><b>Select Plan</b></label>*/}
                        {/*<Form.Select aria-label="Default select example" required onChange={(e)=>setSelectedAffiliate(e.target.value)}>*/}
                        {/*    <option value="---">Select</option>*/}
                        {/*    {*/}
                        {/*        plans?.map((itm,i)=>(*/}
                        {/*            <option value={itm.id}>{itm.name}</option>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</Form.Select>*/}
                        <label><b>Absolute and Percentage</b></label>
                        <Form.Select aria-label="Default select example" required onChange={(e)=>setType(e.target.value)}>
                            <option value="---">Select</option>
                            <option value="absolute">Absolute</option>
                            <option value="discount">Percentage</option>
                        </Form.Select>
                        <table style={{borderCollapse: "separate",borderSpacing:"1em"}}>
                            <thead>
                            <th style={{width: "32%"}}>SUV Plan</th>
                            <th style={{width: "32%"}}>Commission</th>
                            <th style={{width: "32%"}}>Discount</th>
                            </thead>
                            <tbody>
                            {
                                plansSuv?.map((itm,i)=>(
                                    <tr>
                                        <td>{itm.name}</td>
                                        <td><input required  className={'form-control'} type={'number'} id={'suvC'+i}/></td>
                                        <td><input required  className={'form-control'} type={'number'} id={'suvD'+i}/></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <table style={{borderCollapse: "separate",borderSpacing:"1em"}}>
                            <thead>
                            <th style={{width: "32%"}}>Sedan Plan</th>
                            <th style={{width: "32%"}}>Commission</th>
                            <th style={{width: "32%"}}>Discount</th>
                            </thead>
                            <tbody>
                            {
                                plansSedan?.map((itm,i)=>(
                                    <tr>
                                        <td>{itm.name}</td>
                                        <td><input required  className={'form-control'} type={'number'} id={'sedC'+i}/></td>
                                        <td><input required  className={'form-control'} type={'number'} id={'sedD'+i}/></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        {/*<label><b>Enter Commission for Affiliate</b></label>*/}
                        {/*<InputGroup className="mb-3" onChange={(e)=>setAffDiscount(e.target.value)}>*/}
                        {/*    <Form.Control*/}
                        {/*        required*/}
                        {/*        placeholder="Enter Amount"*/}
                        {/*        aria-label="Username"*/}
                        {/*        aria-describedby="basic-addon1"*/}
                        {/*    />*/}
                        {/*</InputGroup>*/}
                        {/*<label><b>Enter Discount for User</b></label>*/}
                        {/*<InputGroup className="mb-3" onChange={(e)=>setUserDiscount(e.target.value)}>*/}
                        {/*    <Form.Control*/}
                        {/*        required*/}
                        {/*        placeholder="Enter Amount"*/}
                        {/*        aria-label="Username"*/}
                        {/*        aria-describedby="basic-addon1"*/}
                        {/*    />*/}
                        {/*</InputGroup>*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type={'submit'} variant="primary">Save</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Links