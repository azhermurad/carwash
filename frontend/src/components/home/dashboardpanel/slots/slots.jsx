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


function Slot() {

    let history=useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setRequestType(false)
        resetForm();
        setShow(false)
    };
    const handleShow = () => setShow(true);

    let [slots,setSlots]=useState(null);

    let [time,setTime]=useState(null);
    let [allowed,setAllowed]=useState(null);
    let [editIndex,setEditIndex]=useState(null);

    let [reqType,setRequestType]=useState(false);

    useEffect(async ()=>{

        let res=await Api.getAllSlots();
        if (res.status == '200')
        {
            setSlots(res.data);

        }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])


    async function add(e) {
        e.preventDefault();

        if (reqType === false)
        {
            let data={
                time: time,
                allowed: allowed
            }

            let res=await Api.adminAddSlot(data);


            if (res.status == "200")
            {
                await Notifications.successMsg(res.message);
                history.push('/slots');
            }
            else
            {
                await Notifications.errorMsg(res.message);
            }
            handleClose();
            await refreshRecord();
            resetForm();
        }
        else
        {
            let data={
                time: time,
                allowed: allowed,
                id: editIndex
            }

            let res=await Api.updateSlot(data);


            if (res.status == "200")
            {
                await Notifications.successMsg(res.message);
                history.push('/slots');
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

    async function Delete(id) {
        let data={
            id: id
        }

        let res= await Api.adminDeleteSlot(data);
        console.log(res);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            await refreshRecord();
        }
    }


    async function refreshRecord() {
        let res=await Api.getAllSlots();
        if (res.status == '200')
        {
            setSlots(res.data);

        }
    }

    function resetForm() {
        setTime("");
        setAllowed("");
    }


    async function edit(id) {
        let data={
            id: id
        }
        console.log(reqType)
        let res=await Api.slotById(data);
        if (res.status == '200')
        {
            setTime(res.data.time);
            setAllowed(res.data.allowed);
            setEditIndex(id);
            handleShow();
            handleShow();
        }
    }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Extra Features</h3>
                <div>
                    <div className='nav-buttons'>
                        <button onClick={handleShow} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Slot</button>
                    </div>
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <table id="example" className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>TIME</th>
                        <th>BOOKING ALLOWED</th>
                        <th>EDIT</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        slots?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.time}</td>
                                <td>{itm.allowed}</td>
                                <td><i onClick={async ()=>{setRequestType(true);await edit(itm.id)}} style={{color:"green",cursor:"pointer"}} className={'fas fa-pen'}></i></td>
                                <td><i onClick={async ()=>{await Delete(itm.id)}} style={{color:"red",cursor:"pointer"}} className={'fas fa-trash'}></i></td>
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
                <form onSubmit={add}>
                    <Modal.Header closeButton>
                        <Modal.Title>{(reqType == false)?"Add Slot":"Edit Slot"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Time</label>
                        <InputGroup className="mb-3" type={'text'} required onChange={(e)=>setTime(e.target.value)}>
                            <Form.Control
                                required
                                type={'text'}
                                value={time}
                                placeholder="Enter Time"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <label>Allowed Bookings</label>
                        <InputGroup className="mb-3" required onChange={(e)=>setAllowed(e.target.value)}>
                            <Form.Control
                                required
                                type={'number'}
                                value={allowed}
                                placeholder="Enter Name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
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

export default Slot