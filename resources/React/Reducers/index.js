import { combineReducers } from "redux";

import modal from "./modal";
import snackbar from "./snackbar";
import user from "./user";
import users from "./users";
import payments from "./payments";
import accounts from "./accounts";

export default combineReducers({
    modal,
    snackbar,
    user,
    users,
    payments,
    accounts
});
