import { atom } from "recoil";

export const sidebarDisp_ = atom({
    key: "sidebar",
    default: "none"
});


export const _authData = atom({
    key: "authData",
    default: null
});

export const _brokerEditIndex = atom({
    key: "brokerEditIndex",
    default: null
});

export const _driverEditIndex = atom({
    key: "driverEditIndex",
    default: null
});

export const _laodEditIndex = atom({
    key: "loadEditIndex",
    default: null
});

export const _selectedInvoiceData = atom({
    key: "selectedInvoiceData",
    default: null
});

export const _selectedInvoiceIndex = atom({
    key: "selectedInvoiceDataIndex",
    default: null
});


