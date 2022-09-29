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


function ExtraFeatures() {

    let history=useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [features,setFeatures]=useState(null);

    let [name,setName]=useState(null);
    let [time,setTime]=useState(null);
    let [price,setPrice]=useState(null);

    useEffect(async ()=>{

        let res=await Api.getAllExtraFeatures();
        if (res.status == '200')
        {
            setFeatures(res.data);

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

        let data={
            name: name,
            price: price,
            time: time
        }

        let res=await Api.adminAddExtraFeature(data);


        if (res.status == "200")
        {
            await Notifications.successMsg(res.message);
            history.push('/extra-features');
        }
        else
        {
            await Notifications.errorMsg(res.message);
        }
        handleClose();
        await refreshRecord();
        resetForm();
    }

    async function Delete(id) {
        let data={
            id: id
        }

        let res= await Api.adminDeleteExtraFeature(data);
        console.log(res);

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
            await refreshRecord();
        }
    }


    async function refreshRecord() {
        let res=await Api.getAllExtraFeatures();
        if (res.status == '200')
        {
            setFeatures(res.data);
        }
    }

    function resetForm() {
        setName("");
        setTime("");
        setPrice("");
    }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Extra Features</h3>
                <div>
                    <div className='nav-buttons'>
                        <button onClick={handleShow} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Add Feature</button>
                    </div>
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <table id="example" className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        {/*<th>TIME</th>*/}
                        <th>PRICE</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        features?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td>{itm.name}</td>
                                {/*<td>{itm.time} min</td>*/}
                                <td>${itm.price}</td>
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
                <form onSubmit={add}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Extra Features</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Name</label>
                        <InputGroup className="mb-3" required onChange={(e)=>setName(e.target.value)}>
                            <Form.Control
                                required
                                placeholder="Enter Name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        {/*<label>Time</label>*/}
                        {/*<InputGroup className="mb-3" type={'number'} required onChange={(e)=>setTime(e.target.value)}>*/}
                        {/*    <Form.Control*/}
                        {/*        required*/}
                        {/*        type={'number'}*/}
                        {/*        placeholder="Enter Time"*/}
                        {/*        aria-label="Username"*/}
                        {/*        aria-describedby="basic-addon1"*/}
                        {/*    />*/}
                        {/*</InputGroup>*/}
                        <label>Price</label>
                        <InputGroup className="mb-3" type={'number'} required onChange={(e)=>setPrice(e.target.value)}>
                            <Form.Control
                                required
                                type={'number'}
                                placeholder="Enter Price"
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

export default ExtraFeatures