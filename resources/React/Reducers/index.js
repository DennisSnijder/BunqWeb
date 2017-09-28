import { combineReducers } from "redux";

import modal from "./modal";
import snackbar from "./snackbar";
import user from "./user";
import payments from "./payments";

export default combineReducers({
    modal,
    snackbar,
    user,
    payments
});
