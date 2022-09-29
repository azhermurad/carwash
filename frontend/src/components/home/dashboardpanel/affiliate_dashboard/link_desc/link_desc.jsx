import React,{useState,useEffect} from 'react'
import add from '../../../../../assets/images/add.png'
import {useHistory} from 'react-router-dom';
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";


function AffiliateLinksDesc() {

    let history=useHistory();

    let [links,setLinks]=useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async ()=>{

        let user=JSON.parse(sessionStorage.getItem('auth'));
        let data={
            id: user.id
        }

        let res1=await Api.linkDescByUser(data);
        if (res1.status == '200')
        {
            setLinks(res1.data);

        }

        //initialize datatable
        $(document).ready(function () {
            setTimeout(function(){
                $('#example').DataTable();
            } ,500);
        });
    },[])




    // async function refreshRecord() {
    //     let tempData=await Api.getAllBrokers();
    //     console.log(tempData)
    //     setData(tempData.data);
    // }

    function copy(that){
        var inp =document.createElement('input');
        document.body.appendChild(inp)
        inp.value =that.textContent
        inp.select();
        document.execCommand('copy',false);
        inp.remove();
    }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Links</h3>
                <div>
                    {/*<div className='nav-buttons'>*/}
                    {/*    <button onClick={handleShow} style={{ background: '#FF7B00', marginRight: '15px' }}><img src={add} alt="" />  Generate Link</button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className='dashboard-table-wrapper_ p-3'>
                <table id="example" className="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>PLAN</th>
                        {/*<th>LINK</th>*/}
                        <th>TYPE</th>
                        <th>AFFILIATE COMMISSION</th>
                        <th>USER DISCOUNT</th>
                        <th>USED</th>
                        {/*<th>PHONE</th>*/}
                        {/*<th>TOTAL EARNING</th>*/}
                        {/*<th>PAID</th>*/}
                        {/*<th>NOT PAID</th>*/}
                        {/*<th>Action</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        links?.map((itm,i)=>(
                            <tr>
                                <td>{itm.id}</td>
                                <td style={{cursor: 'pointer'}} onClick={()=>{Notifications.successMsg('Code Copied');navigator.clipboard.writeText(itm.code)}}>{itm.planId}</td>
                                {/*<td style={{cursor: 'pointer'}} onClick={()=>{Notifications.successMsg('Link Copied');navigator.clipboard.writeText(itm.link)}}>{itm.link}</td>*/}
                                <td>{itm.type}</td>
                                <td>{itm.commission}</td>
                                <td>{itm.discount}</td>
                                <td>{itm.timesUsed}</td>
                                {/*<td>{itm.phone}</td>*/}
                                {/*<td>{itm.total}</td>*/}
                                {/*<td>{itm.paid}</td>*/}
                                {/*<td>{itm.nonpaid}</td>*/}
                                {/*<td><button onClick={handleShow} className={'btn btn-primary'}>Withdraw</button></td>*/}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>


            {/*<Modal*/}
            {/*    show={show}*/}
            {/*    onHide={handleClose}*/}
            {/*    backdrop="static"*/}
            {/*    keyboard={false}*/}
            {/*>*/}
            {/*    <form>*/}
            {/*        <Modal.Header closeButton>*/}
            {/*            <Modal.Title>Withdraw Details</Modal.Title>*/}
            {/*        </Modal.Header>*/}
            {/*        <Modal.Body>*/}
            {/*            <label>Enter Amount</label>*/}
            {/*            <InputGroup className="mb-3" required>*/}
            {/*                <Form.Control*/}
            {/*                    required*/}
            {/*                    type='number'*/}
            {/*                    min='100'*/}
            {/*                    placeholder="Enter Amount"*/}
            {/*                    aria-label="Username"*/}
            {/*                    aria-describedby="basic-addon1"*/}
            {/*                />*/}
            {/*            </InputGroup>*/}
            {/*        </Modal.Body>*/}
            {/*        <Modal.Footer>*/}
            {/*            <Button variant="secondary" onClick={handleClose}>*/}
            {/*                Close*/}
            {/*            </Button>*/}
            {/*            <Button type={'type'} variant="primary">Save</Button>*/}
            {/*        </Modal.Footer>*/}
            {/*    </form>*/}
            {/*</Modal>*/}
        </>
    )
}

export default AffiliateLinksDesc