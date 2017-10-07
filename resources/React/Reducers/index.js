import { combineReducers } from "redux";

import modal from "./modal";
import snackbar from "./snackbar";
import user from "./user";
import users from "./users";
import payments from "./payments";
import payment_info from "./payment_info";
import accounts from "./accounts";

export default combineReducers({
    modal,
    snackbar,
    user,
    users,
    payments,
    payment_info,
    accounts
});
