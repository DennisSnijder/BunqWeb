export const defaultState = {
    accounts: [],
    loading: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "ACCOUNTS_SET_INFO":
            // update local storage
            return {
                ...state,
                accounts: action.payload.accounts
            };

        case "ACCOUNTS_IS_LOADING":
            return {
                ...state,
                loading: true
            };

        case "ACCOUNTS_IS_NOT_LOADING":
            return {
                ...state,
                loading: false
            };
    }
    return state;
};
