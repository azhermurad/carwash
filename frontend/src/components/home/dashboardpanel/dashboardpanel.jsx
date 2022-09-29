import './dashboardpanel.css'
import React from 'react'
import { Route } from 'react-router-dom'
import Protected from '../../protected'
import Header from '../header/header'
import Dashboard from './dashboard/dashboard'
import Cleaner from "./cleaner/cleaner";
import AddCleaner from "./cleaner/add/add_cleaner";
import EditCleaner from "./cleaner/edit/edit_cleaner";
import Affiliate from "./affilate/affiliate";
import AddAffiliate from "./affilate/add/add_affiliate";
import EditAffiliate from "./affilate/edit/edit_affiliate";
import Booking from "./bookings/boking";
import Links from "./links/links";
import ExtraFeatures from "./extra_feature/extra_feature";
import Plans from "./plans/plans";
import AddPlan from "./plans/add/add_plan";
import EditPlan from "./plans/edit/edit_plan";
import AffiliateDashboard from "./affiliate_dashboard/affiliate_dashboard";
import AffiliateLinks from "./affiliate_dashboard/links/links";
import CleanerDashboard from "./cleaner_dashboard/cleaner_dashboard";
import UserDashboard from "./user_dashboard/user_dashboard";
import Slot from "./slots/slots";
import CleanerTask from "./cleaner_dashboard/tasks/tasks";
import WithdrawDetails from "./affiliate_dashboard/withraw_details/withdraw";
import WithdrawHistory from "./affiliate_dashboard/withdraw_history/hsitory";
import CleanerPlans from "./cleaner_dashboard/plans/plans";
import CleanerExtraFeatures from "./cleaner_dashboard/extra_features/extra_features";
import UserBooking from "./user_dashboard/bookings/bookings";
import Approvals from "./approvals/approvals";
import PlacedBookings from "./placed_bookings/placedBookings";
import AssignedBookings from "./asigned_bokings/assigned_bookings";
import CompleteBookings from "./completed_bookings/complete_bookings";
import RecentPlans from "./user_dashboard/recent_plans/recent_plans";
import AffiliateLinksDesc from "./affiliate_dashboard/link_desc/link_desc";
import AffiliateBookings from "./affiliate_dashboard/bookings/bookings";

function DashboardPanel() {
    return (
        <div className='dashboard'>
            <Header />
            <div className='dashboard-wrapper'>
                <div className='dashboard-cont'>

                    {/* Admin Routes*/}
                    <Protected path="/dashboard" component={Dashboard} />
                    <Protected path="/affiliate-dashboard" component={AffiliateDashboard} />
                    <Protected path="/cleaner-dashboard" component={CleanerDashboard} />
                    <Protected path="/cleaner-tasks" component={CleanerTask} />
                    <Protected path="/cleaner-plans" component={CleanerPlans} />
                    <Protected path="/cleaner-extra" component={CleanerExtraFeatures} />
                    <Protected path="/withdraw-details" component={WithdrawDetails} />
                    <Protected path="/withdraw-history" component={WithdrawHistory} />
                    <Protected path="/user-dashboard" component={UserDashboard} />
                    <Protected path="/user-bookings" component={UserBooking} />
                    <Protected path="/cleaner" component={Cleaner} />
                    <Protected path="/slots" component={Slot} />
                    <Protected path="/affiliate" component={Affiliate} />
                    <Protected path="/affiliate-links" component={Links} />
                    <Protected path="/aff-links" component={AffiliateLinks} />
                    <Protected path="/extra-features" component={ExtraFeatures} />
                    <Protected path="/plans" component={Plans} />
                    <Protected path="/approvals" component={Approvals} />
                    <Protected path="/booking" component={Booking} />
                    <Protected path="/all-placed-booking" component={PlacedBookings} />
                    <Protected path="/all-assigned-booking" component={AssignedBookings} />
                    <Protected path="/all-completed-booking" component={CompleteBookings} />
                    <Protected path="/add-cleaner" component={AddCleaner} />
                    <Protected path="/add-affiliate" component={AddAffiliate} />
                    <Protected path="/add-plan" component={AddPlan} />
                    <Protected path="/edit-cleaner" component={EditCleaner} />
                    <Protected path="/edit-affiliate" component={EditAffiliate} />
                    <Protected path="/edit-plan" component={EditPlan} />
                    <Protected path="/recent-plans" component={RecentPlans} />
                    <Protected path="/aff-link-desc" component={AffiliateLinksDesc} />
                    <Protected path="/aff-bookings-details" component={AffiliateBookings} />
                </div>
            </div>
        </div>
    )
}

export default DashboardPanel