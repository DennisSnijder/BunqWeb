const axios = require("axios");
const Logger = require("../Helpers/Logger");

export function userSetInfo(user) {
    return {
        type: "USER_SET_INFO",
        payload: {
            user: user
        }
    };
}

export function userLogin(id, type) {
    return dispatch => {
        dispatch(userLoading());
        axios
            .post("/api/login", {
                id: id,
                type: type
            })
            .then(response => response.data)
            .then(json => {
                dispatch(userSetInfo(json.user));
                dispatch(userNotLoading());
            })
            .catch(err => {
                Logger.trace(err);
            });
    };
}

export function userLogout() {
    return {
        type: "USER_SET_INFO",
        payload: {
            user: false
        }
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
