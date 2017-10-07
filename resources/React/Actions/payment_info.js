const axios = require("axios");
const Logger = require("../Helpers/Logger");

export function paymentSetInfo(payment, account_id) {
    // return the action
    return {
        type: "PAYMENT_SET_INFO",
        payload: {
            payment: payment,
            account_id: account_id
        }
    };
}

export function paymentUpdate(account_id, payment_id) {
    return dispatch => {
        dispatch(paymentLoading());
        axios
            .get(`/api/payment/${account_id}/${payment_id}`)
            .then(response => response.data)
            .then(json => {
                // update payment info and stop loading state
                dispatch(paymentSetInfo(json, account_id, payment_id));
                dispatch(paymentNotLoading());
            })
            .catch(err => {
                // finish initial check
                Logger.trace(err);
            });
    };
}

export function paymentLoading() {
    return { type: "PAYMENT_IS_LOADING" };
}

export function paymentNotLoading() {
    return { type: "PAYMENT_IS_NOT_LOADING" };
}

