import axios from "axios";
import Notifications from "../notifications/notifications";

let live_url='https://server.ecofriendlycarwash.ae:8443/';
let local_url='http://156.67.210.97/';

let api_url=local_url;

let token=null;

const config = {
    headers: { 'content-type': 'multipart/form-data' }
}



async function checkLogin() {
    let authToken=sessionStorage.getItem('token')
    if (authToken)
    {
        token = { headers: { 'Authorization': `Bearer ${authToken}` } }
    }
    else
    {
        window.location.href='/sign-in';
        await Notifications.errorMsg("You are not seem to be Login, Login First");
    }
}



export default class Api {

    // User SignIn
    static userSignIn = async (data) => {
        try {
            const res = await axios.post(api_url+`login`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // User SignIn
    static signInAdmin = async (data) => {
        try {
            const res = await axios.post(api_url+`admin-login`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // User Reset Password
    static resetPassword = async (data) => {
        try {
            const res = await axios.post(api_url+`reset-password`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // User Change Password
    static changePassword = async (data) => {
        try {
            const res = await axios.post(api_url+`change-password`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin add cleaner
    static adminAddCleaner = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`add-cleaner`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin delete cleaner
    static adminDeleteCleaner = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`delete-cleaner`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all cleaners
    static getAllCleaners = async () => {
        await checkLogin();
        try {
            const res = await axios.get(api_url+`all-cleaner`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // User by id
    static userByID = async (data) => {
        try {
            const res = await axios.post(api_url+`user-by-id`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin update cleaner
    static adminUpdateCleaner = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`update-cleaner`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all affiliate
    static getAllAffiliate = async () => {
        await checkLogin();
        try {
            const res = await axios.get(api_url+`all-affiliate`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin add affiliate
    static adminAddAffiliate = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`add-affiliate-person`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin delete affiliate
    static adminDeleteAffiliate = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`delete-affiliate`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin update affiliate
    static adminUpdateAffiliate = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`update-affiliate`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all affiliate
    static getAllPlans = async () => {
        // await checkLogin();
        try {
            const res = await axios.get(api_url+`all-plans`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin add plan
    static adminAddPlan = async (data) => {
        try {
            const res = await axios.post(api_url+`add-plan`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    // // Get all plan by car type
    static getAllPlansByCarType = async (data) => {
        // await checkLogin();
        try {
            const res = await axios.post(api_url+`plan-by-car-type`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // generate affiliate link
    static generateAffiliateLink = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`generate-affiliate-person-link`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all links
    static getAllLinks = async () => {
        await checkLogin();
        try {
            const res = await axios.get(api_url+`all-affiliate-links`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin delete link
    static adminDeleteLink = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`delete-affiliate-person-link`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // generate affiliate link
    static getAffiliateLinkByUser = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`all-affiliate-links-by-id`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin delete plan
    static adminDeletePlan = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`delete-plan`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin plan by id
    static planById = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`plan-by-id`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin update plan
    static adminUpdatePlan= async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`update-plan`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin add extra feature
    static adminAddExtraFeature= async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`add-extra-feature`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all extra features
    static getAllExtraFeatures = async () => {
        // await checkLogin();
        try {
            const res = await axios.get(api_url+`all-extra-features`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin add extra feature
    static adminDeleteExtraFeature= async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`delete-extra-feature`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // verify otp
    static verifyOtp = async (data) => {
        try {
            const res = await axios.post(api_url+`verify-otp`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all links
    static getAllSlots = async () => {
        try {
            const res = await axios.get(api_url+`all-slots`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin add slot
    static adminAddSlot= async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`add-slot`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin delete slot
    static adminDeleteSlot = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`delete-slot`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // slot by id
    static slotById = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`slot-by-id`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all bookings
    static getAllBookings = async () => {
        try {
            const res = await axios.get(api_url+`all-booking`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // slot by id
    static slotById = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`slot-by-id`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Admin assign booking
    static adminAssignBooking = async (data) => {
        await checkLogin();
        try {
            const res = await axios.post(api_url+`assign-cleaner-to-booking`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // get all bookings by cleaner id
    static allBookingsByCleanerId = async (data) => {
        try {
            const res = await axios.post(api_url+`cleaner-bookings-by-id`, data,token);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // complete cleaner task
    static completeCleanerTask = async (data) => {
        try {
            const res = await axios.post(api_url+`complete-task`, data,config);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // cleaner save image
    static saveCleanerImage1 = async (data) => {
        try {
            const res = await axios.post(api_url+`save-cleaner-images-1`, data,config);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // cleaner save image
    static saveCleanerImage2 = async (data) => {
        try {
            const res = await axios.post(api_url+`save-cleaner-images-2`, data,config);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }
    // // cleaner save image
    static saveCleanerImage3 = async (data) => {
        try {
            const res = await axios.post(api_url+`save-cleaner-images-3`, data,config);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // save withdrawal details
    static saveWithdrawDetails = async (data) => {
        try {
            const res = await axios.post(api_url+`add-withdraw-details`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // add booking
    static addBooking = async (data) => {
        try {
            const res = await axios.post(api_url+`user-add-booking`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // save withdrawal details
    static userSigninAndSignupByPhone = async (data) => {
        try {
            const res = await axios.post(api_url+`user-signin-signup-by-phone`, data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all admin counts
    static getAllAdminCounts = async () => {
        try {
            const res = await axios.get(api_url+`get-all-admin-dashboard-counts`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all cleaner counts
    static getAllCleanerCounts = async (data) => {
        try {
            const res = await axios.post(api_url+`get-all-cleaner-dashboard-counts`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all user counts
    static getAllUserCounts = async (data) => {
        try {
            const res = await axios.post(api_url+`get-all-user-dashboard-counts`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all user counts
    static getAllBokingsByUserId = async (data) => {
        try {
            const res = await axios.post(api_url+`bookings-by-user`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // Get all user counts
    static reviewAndUpdate = async (data) => {
        try {
            const res = await axios.post(api_url+`review-and-update`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static linkByCode = async (data) => {
        try {
            const res = await axios.post(api_url+`link-by-code`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static requestWithdrawal = async (data) => {
        try {
            const res = await axios.post(api_url+`add-approval-request`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static requestsByAffiliateId = async (data) => {
        try {
            const res = await axios.post(api_url+`all-approval-request-by-affiliate`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static allApprovals = async () => {
        try {
            const res = await axios.get(api_url+`all-approval-request`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static generateLinkDesc = async (data) => {
        try {
            const res = await axios.post(api_url+`generate-affiliate-person-link-desc`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static linkDescByPlanAndUser = async (data) => {
        try {
            const res = await axios.post(api_url+`link-desc-by-user-plan`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    // // link by code
    static allPlanByCarAndPlanType = async (data) => {
        try {
            const res = await axios.post(api_url+`plan-by-car-type-plan-type`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static assignTimeToBooking = async (data) => {
        try {
            const res = await axios.post(api_url+`assign-time-to-booking`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    static approveRequest = async (data) => {
        try {
            const res = await axios.post(api_url+`approve-request`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    // // link by code
    static allPlacedBookings = async () => {
        try {
            const res = await axios.get(api_url+`all-pending-booking`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static allAssignedBookings = async () => {
        try {
            const res = await axios.get(api_url+`all-assigned-booking`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    // // link by code
    static allCompletedBookings = async () => {
        try {
            const res = await axios.get(api_url+`all-completed-booking`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static allRecentPlans = async (data) => {
        try {
            const res = await axios.post(api_url+`all-recent-plans-by-user`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static checkReSub1 = async (data) => {
        try {
            const res = await axios.post(api_url+`check-for-resuscribe1`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static checkReSub2 = async (data) => {
        try {
            const res = await axios.post(api_url+`check-for-resuscribe2`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    // // link by code
    static getCODStatus = async () => {
        try {
            const res = await axios.get(api_url+`cod-button-status`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static tooggleCOD = async () => {
        try {
            const res = await axios.post(api_url+`tooggle-cod`);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static codPayment = async (data) => {
        try {
            const res = await axios.post(api_url+`cod-payment`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    static stripePayment = async (data) => {
        try {
            const res = await axios.post(api_url+`create-payment`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static linkDescByUser = async (data) => {
        try {
            const res = await axios.post(api_url+`get-link-desc-by-user`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    static codeByUserId = async (data) => {
        try {
            const res = await axios.post(api_url+`get-code-by-user`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }

    static getAffiliateBookings = async (data) => {
        try {
            const res = await axios.post(api_url+`get-affiliate-bookings`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }


    static updateSlot = async (data) => {
        try {
            const res = await axios.post(api_url+`update-slot`,data);
            return res.data;
        } catch (error) {
            return error.data;
        }
    }





    // // Admin Change Profile
    // static adminUpdateProfilePic = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`admin-update-profile-picture`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    // // Add Broker
    // static addBroker = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`add-broker`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //


    // // Add Driver
    // static addDriver = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`add-driver`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // Get all drivers
    // static getAllDrivers = async () => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.get(api_url+`get-all-driver`);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // Add Load
    // static addLoad = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`add-load`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // Get all loads
    // static getAllLoads = async () => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.get(api_url+`get-all-loads`);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    //
    // // Add Permit Book
    // static addPermitBook = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`add-permit-book`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    //
    // // Get all permits
    // static getAllPermits = async () => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.get(api_url+`get-all-permits`);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // contact us
    // static contactUs = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`contact-us`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    //
    // // get loads by selected date
    // static loadsBySelectedDate = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`get-selected-load-by-date`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // Get all company data
    // static getAllCompanyData = async () => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.get(api_url+`get-company-data`);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // delete broker
    // static deleteBroker = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`delete-broker`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    // // get broker by id
    // static getBrokerById = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`broker-by-id`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    // // edit broker
    // static editBroker = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`update-broker`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // delete driver
    // static deleteDriver = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`delete-driver`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // get driver by id
    // static getDriverById = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`driver-by-id`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // edit driver
    // static editDriver = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`update-driver`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // delete load
    // static deleteLoad = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`delete-load`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    // // get load by id
    // static getLoadById = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`load-by-id`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // edit load
    // static editLoad = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`update-load`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // get all cities
    // static getAllCities = async () => {
    //     await checkLogin();
    //     try {
    //         let data={}
    //         const res = await axios.get(api_url+`get-all-countries-data`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // get all not delivered loads
    // static getAllNotDeliveredLoads = async () => {
    //     await checkLogin();
    //     try {
    //         let data={}
    //         const res = await axios.post(api_url+`get-all-latest-undelivered-loads`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // get latest 10 loads
    // static getLatest10Loads = async () => {
    //     await checkLogin();
    //     try {
    //         let data={}
    //         const res = await axios.post(api_url+`get-10-latest-delivered-loads`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
    //
    //
    // // search driver
    // static searchDriver = async (data) => {
    //     await checkLogin();
    //     try {
    //         const res = await axios.post(api_url+`search-driver`, data,token);
    //         return res.data;
    //     } catch (error) {
    //         return error.data;
    //     }
    // }
}