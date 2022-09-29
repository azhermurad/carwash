import React,{useState,useEffect} from 'react'
import $ from 'jquery';

function AffiliateDashboard() {

    useEffect(async ()=>{

    },[])

    return (
        <>
            <div style={{ padding: '13px 0' }}></div>
            <div style={{marginBottom:"3%"}} className='dashboard-table-wrapper_ p-3'>
                <div className={'dashboardDiv'}>
                    <div className={'dashboardDivCounter'}>
                        <h4>Total <span><span style={{visibility: "hidden"}}>d</span> ${JSON.parse(sessionStorage.getItem('auth'))?.total}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Paid <span><span style={{visibility: "hidden"}}>d</span> ${JSON.parse(sessionStorage.getItem('auth'))?.paid}</span></h4>
                    </div>
                    <div className={'dashboardDivCounter'}>
                        <h4>Non Paid <span><span style={{visibility: "hidden"}}>d</span> ${JSON.parse(sessionStorage.getItem('auth'))?.nonpaid}</span></h4>
                    </div>
                </div>

            </div>
            <div style={{ padding: '13px 0' }}></div>
        </>
    )
}

export default AffiliateDashboard