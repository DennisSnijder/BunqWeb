const store = require("store");

//get default value
const user_info = store.get("user_info");

export const defaultState = {
    user_info: user_info || false,
    loading: false,
    initialCheck: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "USER_SET_INFO":
            // update local storage
            store.set("user_info", action.payload.user_info);
            return {
                ...state,
                user_info: action.payload.user_info
            };

        case "USER_LOGOUT":
            return {
                ...state,
                user_info: false
            };

        case "USER_IS_LOADING":
            return {
                ...state,
                loading: true
            };

        case "USER_IS_NOT_LOADING":
            return {
                ...state,
                loading: false
            };

        case "USER_INITIAL_CHECK":
            return {
                ...state,
                initialCheck: true
            };
    }
    return state;
};
