const axios = require("axios");
const Logger = require("../Helpers/Logger");

export function paymentInfoSetInfo(payment, account_id) {
    // return the action
    return {
        type: "PAYMENT_INFO_SET_INFO",
        payload: {
            payment: payment,
            account_id: account_id
        }
    };
}

export function paymentInfoUpdate(account_id, payment_id) {
    return dispatch => {
        dispatch(paymentInfoLoading());
        axios
            .get(`/api/payment/${account_id}/${payment_id}`)
            .then(response => response.data)
            .then(json => {
                // update payment info and stop loading state
                dispatch(paymentInfoSetInfo(json, account_id, payment_id));
                dispatch(paymentInfoNotLoading());
            })
            .catch(err => {
                // finish initial check
                Logger.trace(err);
            });
    };
}

export function paymentInfoLoading() {
    return { type: "PAYMENT_INFO_IS_LOADING" };
}

export function paymentInfoNotLoading() {
    return { type: "PAYMENT_INFO_IS_NOT_LOADING" };
}

export function paymentInfoClear() {
    return { type: "PAYMENT_INFO_CLEAR" };
}
