import React, {useEffect, useState} from 'react'
import Api from "../../../../../apis/apis";
import Notifications from "../../../../../notifications/notifications";
import {useHistory} from 'react-router-dom';
import add from "../../../../../assets/images/add.png";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function WithdrawDetails() {

    const history=useHistory();

    let [bankHolder,setBankHolder]=useState(JSON.parse(sessionStorage.getItem('auth'))?.bankHolder);
    let [bankName,setBankName]=useState(JSON.parse(sessionStorage.getItem('auth'))?.bankName);
    let [iban,setIban]=useState(JSON.parse(sessionStorage.getItem('auth'))?.iban);
    let [account,setAccount]=useState(JSON.parse(sessionStorage.getItem('auth'))?.accountNumber);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [amount,setAmount]=useState(null);

    useEffect(async ()=>{
        let data={
            id: JSON.parse(sessionStorage.getItem('auth'))?.id
        }
        let res=await Api.userByID(data)
        if (res.status == '200')
        {
            sessionStorage.setItem('auth',JSON.stringify(res.data));
        }
    })


    function resetForm(){
        setBankHolder("");
        setBankName("");
        setIban("");
        setAccount("");
    }


    async function submitForm(e) {
        e.preventDefault();

        let userData=JSON.parse(sessionStorage.getItem('auth'));

        let data={
            id: userData.id,
            bankHolder: bankHolder,
            bankName: bankName,
            iban: iban,
            accountNumber: account,
        }

        let res=await Api.saveWithdrawDetails(data);


        if (res.status == "200")
        {
            await Notifications.successMsg(res.message);
            history.push('/affiliate-dashboard');
        }
        else
        {
            await Notifications.errorMsg(res.message);
        }
        resetForm();
    }


    async function requestWithdraw(e) {
        e.preventDefault();

        let data={
            userId: JSON.parse(sessionStorage.getItem('auth'))?.id,
            amount: amount
        }

        let res=await Api.requestWithdrawal(data)
        if (res.status == '200')
        {
            await Notifications.successMsg(res.message)
            handleClose();
        }
    }

    return (
        <>
            <div className='driver-head'>
                <h3 className='dashboard-head-title'>Withdraw Details</h3>
                <div>
                    <div className='nav-buttons'>
                        {
                            (parseInt(JSON.parse(sessionStorage.getItem('auth'))?.nonpaid) >= 100)?
                                <button onClick={handleShow} style={{ background: '#FF7B00', marginRight: '15px' }}>  Withdraw</button>
                                :
                                ""
                        }

                    </div>
                </div>
            </div>

            <form onSubmit={submitForm}>
                <div className=' load-form'>
                    <div className=' load-input-wrapper'>
                        <div className=' load-input'>
                            <label>Bank Holder Name</label>
                            <input value={bankHolder} onChange={(e)=>{setBankHolder(e.target.value)}} required type={'text'} placeholder="Enter Bank Holder Name" className='form-input_ input' />
                        </div>
                        <div className=' load-input'>
                            <label>Bank Name</label>
                            <input value={bankName} onChange={(e)=>{setBankName(e.target.value)}} required type={'text'} placeholder="Enter Bank Name" className='form-input_ input'  />
                        </div>
                        <div className=' load-input'>
                            <label>{`IBAN Number`}</label>
                            <input value={iban} onChange={(e)=>{setIban(e.target.value)}} required type={'text'} placeholder="Enter IBAN Number" className='form-input_ input' />
                        </div>
                        <div className=' load-input'>
                            <label>Account Number</label>
                            <input value={account} onChange={(e)=>{setAccount(e.target.value)}} required type={'number'} placeholder="Enter Account Number" className='form-input_ input' />
                        </div>
                    </div>
                    <div className='form-buttons'>
                        <button type={'submit'} className='button-primary'>Save Changes</button>
                    </div>
                </div>
            </form>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={requestWithdraw}>
                    <Modal.Header closeButton>
                        <Modal.Title>Withdraw Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Enter Amount</label>
                        <InputGroup className="mb-3" required>
                            <Form.Control
                                onChange={(e)=>{setAmount(e.target.value)}}
                                required
                                type='number'
                                min='100'
                                max={JSON.parse(sessionStorage.getItem('auth'))?.total}
                                placeholder="Enter Amount"
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

export default WithdrawDetails