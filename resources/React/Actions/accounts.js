const axios = require("axios");
const Logger = require("../Helpers/Logger");

export function accountsSetInfo(accounts) {
    // return the action
    return {
        type: "ACCOUNTS_SET_INFO",
        payload: {
            accounts: accounts
        }
    };
}

export function accountsUpdate() {
    return dispatch => {
        dispatch(accountsLoading());
        axios
            .get(`/api/accounts`)
            .then(response => response.data)
            .then(json => {
                dispatch(accountsSetInfo(json));
                dispatch(accountsNotLoading());
            })
            .catch(err => {
                Logger.trace(err);
            });
    };
}

export function accountsLoading() {
    return { type: "ACCOUNTS_IS_LOADING" };
}

export function accountsNotLoading() {
    return { type: "ACCOUNTS_IS_NOT_LOADING" };
}

