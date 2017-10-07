export const defaultState = {
    payment: false,
    account_id: 0,
    payment_id: 0,
    loading: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "PAYMENT_SET_INFO":
            return {
                ...state,
                payment: action.payload.payment,
                account_id: action.payload.account_id,
                payment_id: action.payload.payment_id,
            };

        case "PAYMENT_IS_LOADING":
            return {
                ...state,
                loading: true
            };

        case "PAYMENT_IS_NOT_LOADING":
            return {
                ...state,
                loading: false
            };
    }
    return state;
};
