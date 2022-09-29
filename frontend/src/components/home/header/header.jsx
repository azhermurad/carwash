import './header.css'
import React,{useState,useEffect} from 'react'
import { useSetRecoilState } from 'recoil'
import { sidebarDisp_ } from '../../../data/atom'
import noti from '../../../assets/images/noti.png'
import logout from '../../../assets/images/logout.png'
import search from '../../../assets/images/search.png'
import add from '../../../assets/images/add.png'
import hamburger from '../../../assets/images/hamburger.png'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Api from "../../../apis/apis";
import Notifications from "../../../notifications/notifications";

function Header() {
    const history = useHistory();
    const location = useLocation();
    const setSidebarDisp = useSetRecoilState(sidebarDisp_)
    const logoutHandle = () => {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('token');
        history.push('/')
    }

    let [codStatus,setCodStatus]=useState(null)


    useEffect(async ()=>{

        let res=await Api.getCODStatus();

        if (res.status == '200')
        {
            setCodStatus(res.data)
        }

    },[])


    async function toogleCOD() {

        let res=await Api.tooggleCOD();

        if (res.status == '200')
        {
            await Notifications.successMsg(res.message);
        }

        let res1=await Api.getCODStatus();

        if (res1.status == '200')
        {
            setCodStatus(res1.data)
        }

    }


    return (
        <div className='header-admin'>
            <nav className='nav-bar'>
                <div className='nav-bar-child1'>
                    <div className='nav-bar-hamburger' onClick={() => setSidebarDisp("block")}>
                        <img src={hamburger} alt="" />
                    </div>
                    {/*<div className='input-header-admin' style={{position:'relative'}}>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder='Search' />*/}
                    {/*    <img src={search} alt="" />*/}
                    {/*</div>*/}
                </div>
                <div className='nav-child-2'>
                    {location.pathname === "/dashboard" ?
                        <div className='nav-buttons'>
                            {
                                (codStatus?.status == 'true')?
                                    <button onClick={() => toogleCOD()} style={{ background: 'green', marginRight: '15px' }}> Disable COD</button>
                                    :
                                    <button onClick={() => toogleCOD()} style={{ background: 'red', marginRight: '15px' }}> Enable COD</button>
                            }
                            {/*<button style={{ background: '#00446B' }}><img src={add} alt="" />  Create Invoive</button>*/}
                        </div> : ''
                    }
                    {/*<div className="noti-icon"> <img src={noti} alt="" /></div>*/}
                    <div className="noti-icon"> <img onClick={logoutHandle} src={logout} alt="" /></div>
                </div>
            </nav>
        </div>
    )
}

export default Header