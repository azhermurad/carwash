import './sidebar.css'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { sidebarDisp_} from '../../../data/atom'
import { useLocation, useHistory } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import avatar from '../../../assets/images/avatar_admin.png'
import dashboard1 from '../../../assets/images/dashboard1.png'
import dashboard2 from '../../../assets/images/dashboard2.png'
import broker1 from '../../../assets/images/broker1.png'
import broker2 from '../../../assets/images/broker2.png'
import faq1 from '../../../assets/images/faq1.png'
import faq2 from '../../../assets/images/faq2.png'
import driver1 from '../../../assets/images/driver1.png'
import driver2 from '../../../assets/images/driver2.png'
import load1 from '../../../assets/images/load1.png'
import load2 from '../../../assets/images/load2.png'
import payroll1 from '../../../assets/images/payroll1.png'
import Quote from '../../../assets/images/Quote.png'
import close from '../../../assets/images/Close.png'


function Sidebar() {
    const location = useLocation()
    const history = useHistory()

    let authData=JSON.parse(sessionStorage.getItem('auth'))

    const [sidebarDisp, setSidebarDisp] = useRecoilState(sidebarDisp_)
    const [dispBar, setDispBar] = useState({
        color1: true, color2: false, color3: false,
        color4: false, color5: false, color6: false, color7: false,
    })
    const [color, setColor] = useState({
        color1: "#FF7B00", color2: "#00446B", color3: "#00446B",
        color4: "#00446B", color5: "#00446B", color6: "#00446B", color7: "#00446B",
    })
    const [image, setImage] = useState({
        image1: dashboard2, image2: driver1, image3: load1,
        image4: broker1, image5: payroll1, image6: faq1, image7: broker1
    })

    useEffect(() => {

        if (location.pathname === "/dashboard") {
            linkHandle1()
        } else if (location.pathname === "/drivers") {
            linkHandle2()
        } else if (location.pathname === "/loads" || location.pathname === "/add-load") {
            linkHandle3()
        } else if (location.pathname === "/brokers") {
            linkHandle4()
        } else if (location.pathname === "/payroll") {
            linkHandle5()
        } else if (location.pathname === "/faq") {
            linkHandle6()
        } else if (location.pathname === "/permit-book") {
            linkHandle7()
        } else if (location.pathname.slice(0, 8) === '/profile' || location.pathname === "/account-plans") {
            profileRedirectColor()
        }
    }, [location.pathname])

    const linkHandle1 = () => {
        setColor({
            color1: "#FF7B00", color2: "#00446B", color3: "#00446B",
            color4: "#00446B", color5: "#00446B", color6: "#00446B", color7: "#00446B"
        })
        setImage({
            image1: dashboard2, image2: driver1, image3: load1,
            image4: broker1, image5: payroll1, image6: faq1, image7: broker1
        })
        setDispBar({
            color1: true, color2: false, color3: false,
            color4: false, color5: false, color6: false, color7: false
        })
    }
    const linkHandle2 = () => {
        setColor({
            color1: "#00446B", color2: "#FF7B00", color3: "#00446B",
            color4: "#00446B", color5: "#00446B", color6: "#00446B", color7: "#00446B"
        })
        setImage({
            image1: dashboard1, image2: driver2, image3: load1,
            image4: broker1, image5: payroll1, image6: faq1, image7: broker1
        })
        setDispBar({
            color1: false, color2: true, color3: false,
            color4: false, color5: false, color6: false, color7: false
        })
    }
    const linkHandle3 = () => {
        setColor({
            color1: "#00446B", color2: "#00446B", color3: "#FF7B00",
            color4: "#00446B", color5: "#00446B", color6: "#00446B", color7: "#00446B"
        })
        setImage({
            image1: dashboard1, image2: driver1, image3: load2,
            image4: broker1, image5: payroll1, image6: faq1, image7: broker1
        })
        setDispBar({
            color1: false, color2: false, color3: true,
            color4: false, color5: false, color6: false, color7: false
        })
    }
    const linkHandle4 = () => {
        setColor({
            color1: "#00446B", color2: "#00446B", color3: "#00446B",
            color4: "#FF7B00", color5: "#00446B", color6: "#00446B", color7: "#00446B"
        })
        setImage({
            image1: dashboard1, image2: driver1, image3: load1,
            image4: broker2, image5: payroll1, image6: faq1, image7: broker1
        })
        setDispBar({
            color1: false, color2: false, color3: false,
            color4: true, color5: false, color6: false, color7: false
        })
    }
    const linkHandle5 = () => {
        setColor({
            color1: "#00446B", color2: "#00446B", color3: "#00446B",
            color4: "#00446B", color5: "#FF7B00", color6: "#00446B", color7: "#00446B"
        })
        setImage({
            image1: dashboard1, image2: driver1, image3: load1,
            image4: broker1, image5: payroll1, image6: faq1, image7: broker1
        })
        setDispBar({
            color1: false, color2: false, color3: false,
            color4: false, color5: true, color6: false, color7: false
        })
    }
    const linkHandle6 = () => {
        setColor({
            color1: "#00446B", color2: "#00446B", color3: "#00446B",
            color4: "#00446B", color5: "#00446B", color6: "#FF7B00", color7: "#00446B"
        })
        setImage({
            image1: dashboard1, image2: driver1, image3: load1,
            image4: broker1, image5: payroll1, image6: faq2, image7: broker1
        })
        setDispBar({
            color1: false, color2: false, color3: false,
            color4: false, color5: false, color6: true, color7: false
        })
    }
    const linkHandle7 = () => {
        setColor({
            color1: "#00446B", color2: "#00446B", color3: "#00446B",
            color4: "#00446B", color5: "#00446B", color6: "#00446B", color7: "#FF7B00"
        })
        setImage({
            image1: dashboard1, image2: driver1, image3: load1,
            image4: broker1, image5: payroll1, image6: faq1, image7: broker2
        })
        setDispBar({
            color1: false, color2: false, color3: false,
            color4: false, color5: false, color6: false, color7: true,
        })
    }

    const redirectProfile = () => {
        history.push('/profile')
        profileRedirectColor()
    }
    const profileRedirectColor = () => {
        setColor({
            color1: "#00446B", color2: "#00446B", color3: "#00446B",
            color4: "#00446B", color5: "#00446B", color6: "#00446B", color7: "#00446B"
        })
        setImage({
            image1: dashboard1, image2: driver1, image3: load1,
            image4: broker1, image5: payroll1, image6: faq1, image7: broker1
        })
        setDispBar({
            color1: false, color2: false, color3: false,
            color4: false, color5: false, color6: false, color7: false,
        })
    }
    const style = {
        color: location.pathname.slice(0, 8) === '/profile' ? "#FF7B00" : location.pathname === "/account-plans" ? "#FF7B00" : "#00446B"
    }
    return (
        <div className='sidebar-wrapper' style={{ display: sidebarDisp }}>
            <div className={`sidebar animate__animated ${sidebarDisp === "block" ? 'animate__fadeInLeft' : ''}`}>
                <div className='sidebar-cont'>
                    <p id='pc'>
                        <Link to={"/dashboard"} />
                    </p>
                    <div onClick={() => setSidebarDisp("none")} className='close-sidebar'>
                        <img src={close} alt="" />
                    </div>
                    <div  className='sidebar-top'>
                        <div className='brand-logo'>
                            <Link to={"/dashboard"} >
                                <img src={logo} alt="" />
                            </Link>
                        </div>
                        <div className='avatar-admin'>
                            {/*<img src={authData?authData.profile_pic_url:avatar} alt="" />*/}
                        </div>
                        <p className='admin-name' style={style}>{authData?authData.name: ""}</p>
                        <p className='admin-role'>{authData?authData.email: ""}</p>
                    </div>
                    <div className='sidebar-separator'></div>
                    <div className='sidebar-bottom'>
                        {
                            authData?
                                (authData.type == 'admin')?
                                    <>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color1 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image1} alt="" />*/}
                                            <Link to={"/dashboard"} style={{ color: "rgb(255, 123, 0)" }}>Dashboard</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link to={"/cleaner"} style={{ color: "rgb(255, 123, 0)" }}>Cleaners</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color3 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image3} alt="" />*/}
                                            <Link to={"/affiliate"} style={{ color: "rgb(255, 123, 0)" }}>Affiliates</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color4 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image4} alt="" />*/}
                                            <Link to={"/booking"} style={{ color: "rgb(255, 123, 0)" }}>Bookings</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color4 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image4} alt="" />*/}
                                            <Link to={"/all-placed-booking"} style={{ color: "rgb(255, 123, 0)" }}>Placed Bookings</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color4 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image4} alt="" />*/}
                                            <Link to={"/all-assigned-booking"} style={{ color: "rgb(255, 123, 0)" }}>Assigned Bookings</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color4 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image4} alt="" />*/}
                                            <Link to={"/all-completed-booking"} style={{ color: "rgb(255, 123, 0)" }}>Completed Bookings</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color5 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image5} alt="" />*/}
                                            <Link to={"/affiliate-links"} style={{ color: "rgb(255, 123, 0)" }}>Affiliate Links</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color6 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image6} alt="" />*/}
                                            <Link to={"/extra-features"} style={{ color: "rgb(255, 123, 0)" }}>Extra Features</Link>
                                        </div>
                                        <div className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color7 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image7} alt="" />*/}
                                            <Link to={"/plans"} style={{ color: "rgb(255, 123, 0)" }} >Plans</Link>
                                        </div>
                                        <div  className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color7 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image7} alt="" />*/}
                                            <Link to={"/slots"} style={{ color: "rgb(255, 123, 0)" }} >Slots</Link>
                                        </div>
                                        <div  className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color7 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image7} alt="" />*/}
                                            <Link to={"/approvals"} style={{ color: "rgb(255, 123, 0)" }} >Approvals</Link>
                                        </div>
                                    </>
                                    :
                                    ""
                                :
                                ""
                        }
                        {
                            authData?
                                (authData.type == 'affiliate')?
                                    <>
                                        <div onClick={''} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color1 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image1} alt="" />*/}
                                            <Link to={"/affiliate-dashboard"} style={{ color: "rgb(255, 123, 0)" }}>Dashboard</Link>
                                        </div>
                                        <div onClick={''} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link to={"/aff-links"} style={{ color: "rgb(255, 123, 0)" }}>Links</Link>
                                        </div>
                                        <div onClick={''} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link to={"/aff-link-desc"} style={{ color: "rgb(255, 123, 0)" }}>Links Detail</Link>
                                        </div>
                                        <div onClick={''} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link to={"/aff-bookings-details"} style={{ color: "rgb(255, 123, 0)" }}>Bookings Detail</Link>
                                        </div>
                                        <div onClick={''} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link to={"/withdraw-details"} style={{ color: "rgb(255, 123, 0)" }}>Withdraw</Link>
                                        </div>
                                        <div onClick={''} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link to={"/withdraw-history"} style={{ color: "rgb(255, 123, 0)" }}>Withdraw History</Link>
                                        </div>

                                    </>
                                    :
                                    ""
                                :
                                ""
                        }
                        {
                            authData?
                                (authData.type == 'cleaner')?
                                    <>
                                        <div onClick={linkHandle1} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color1 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image1} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/cleaner-dashboard"} style={{ color: "rgb(255, 123, 0)" }}>Dashboard</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/cleaner-tasks"} style={{ color: "rgb(255, 123, 0)" }}>Tasks</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/cleaner-plans"} style={{ color: "rgb(255, 123, 0)" }}>Plans</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/cleaner-extra"} style={{ color: "rgb(255, 123, 0)" }}>Extra Features</Link>
                                        </div>
                                    </>
                                    :
                                    ""
                                :
                                ""
                        }
                        {
                            authData?
                                (authData.type == 'user')?
                                    <>
                                        <div onClick={linkHandle1} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color1 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image1} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/user-dashboard"} style={{ color: "rgb(255, 123, 0)" }}>Dashboard</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/user-bookings"} style={{ color: "rgb(255, 123, 0)" }}>Bookings</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/recent-plans"} style={{ color: "rgb(255, 123, 0)" }}>Recent Plans</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/cleaner-plans"} style={{ color: "rgb(255, 123, 0)" }}>Plans</Link>
                                        </div>
                                        <div onClick={linkHandle2} className='sidebar-links'>
                                            {/*<p style={{ background: dispBar.color2 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                            <Link onClick={() => setSidebarDisp("none")} to={"/cleaner-extra"} style={{ color: "rgb(255, 123, 0)" }}>Extra Features</Link>
                                        </div>
                                        {/*<div onClick={linkHandle3} className='sidebar-links'>*/}
                                            {/*<p style={{ background: dispBar.color3 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                            {/*<img src={image.image2} alt="" />*/}
                                        {/*    <Link onClick={() => setSidebarDisp("none")} to={""} style={{ color: color.color3 }}>Reviews</Link>*/}
                                        {/*</div>*/}
                                        {/*<div onClick={linkHandle3} className='sidebar-links'>*/}
                                        {/*    <p style={{ background: dispBar.color3 ? "rgb(255, 123, 0)" : "transparent" }}></p>*/}
                                        {/*    /!*<img src={image.image2} alt="" />*!/*/}
                                        {/*    <Link onClick={() => setSidebarDisp("none")} to={""} style={{ color: color.color3 }}>Subscription Plan</Link>*/}
                                        {/*</div>*/}
                                    </>
                                    :
                                    ""
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Sidebar