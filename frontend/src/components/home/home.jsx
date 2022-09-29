import './home.css'
import './dashboardpanel/global.css'
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar/sidebar'
import DashboardPanel from './dashboardpanel/dashboardpanel'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Home() {
    const history = useHistory();
    const location = useLocation();
    const [display, setDisplay] = useState(true)
    useEffect(() => {
        if (location.pathname === '/dashboard' || location.pathname === '/affiliate-dashboard') {
            setDisplay(true)
        }
        if (location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/reset-password" || location.pathname === '/change-password' || location.pathname === '/' || location.pathname === '/admin' || location.pathname === '/admin-signup' || location.pathname === '/verify-otp' || location.pathname === '/online-booking' || location.pathname === '/blog' || location.pathname === '/privacy-term' ) {
            setDisplay(false)
        }
    }, [history, location.pathname])

    return (
        <>
            {
                display ?
                    <div className='admin-panel'>
                        <div className='admin-cont'>
                            <Sidebar />
                            <DashboardPanel />
                        </div>
                    </div> : ''
            }
        </>
    )
}

export default Home