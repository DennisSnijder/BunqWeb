const axios = require("axios");
const Logger = require("../Helpers/Logger");
const store = require("store");

export function userSetInfo(user_info) {
    // return the action
    return {
        type: "USER_SET_INFO",
        payload: {
            user_info: user_info
        }
    };
}

export function userUpdate() {
    return dispatch => {
        dispatch(userLoading());
        axios
            .post(`/api/get_user`)
            .then(response => response.data)
            .then(json => {
                // update user info and stop loading state
                dispatch(userSetInfo(json));
                dispatch(userNotLoading());
                dispatch(userInitialCheck());
            })
            .catch(err => {
                // finish initial check
                dispatch(userInitialCheck());
                Logger.trace(err);
            });
    };
}

export function userLoadLocalstorage() {
    userSetInfo(store.get("user_info") || false);
    return { type: "USER_LOAD_LOCALSTORAGE" };
}

export function userLogout() {
    return dispatch => {
        dispatch({ type: "USER_LOGOUT_REQUEST" });
        axios
            .post("/logout")
            .then(() => {
                // remove local storage
                store.remove("user_info");

                // send user logout event
                dispatch({ type: "USER_LOGOUT" });
            })
            .catch(Logger.trace);
    };
}

export function userLoading() {
    return { type: "USER_IS_LOADING" };
}

export function userNotLoading() {
    return { type: "USER_IS_NOT_LOADING" };
}

export function userInitialCheck() {
    return { type: "USER_INITIAL_CHECK" };
}
