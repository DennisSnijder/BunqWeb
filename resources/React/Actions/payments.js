const axios = require("axios");
const Logger = require("../Helpers/Logger");
const store = require("store");

export function paymentsSetInfo(payments) {
    // return the action
    return {
        type: "PAYMENTS_SET_INFO",
        payload: {
            payments: payments
        }
    };
}

export function paymentsUpdate(payment_id = 3580) {
    return dispatch => {
        dispatch(paymentsLoading());
        axios
            .get(`/api/payments/${payment_id}`)
            .then(response => response.data)
            .then(json => {
                // update payments info and stop loading state
                dispatch(paymentsSetInfo(json));
                dispatch(paymentsNotLoading());
            })
            .catch(err => {
                // finish initial check
                Logger.trace(err);
            });
    };
}

export function paymentsLoadLocalstorage() {
    paymentsSetInfo(store.get("payments") || false);
    return { type: "PAYMENTS_LOAD_LOCALSTORAGE" };
}

export function paymentsLoading() {
    return { type: "PAYMENTS_IS_LOADING" };
}

export function paymentsNotLoading() {
    return { type: "PAYMENTS_IS_NOT_LOADING" };
}

