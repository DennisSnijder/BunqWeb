import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";
import Button from "material-ui/Button";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";
import DefaultThemeTheme from "../Themes/DefaultTheme";
const DefaultTheme = createMuiTheme(DefaultThemeTheme);

// redux actions
import {
    userLoadLocalstorage,
    userUpdate
} from "../Actions/user.js";
import {
    paymentsLoadLocalstorage,
    paymentsUpdate
} from "../Actions/payments.js";
import { closeModal, openModal } from "../Actions/modal.js";
import { closeSnackbar, openSnackbar } from "../Actions/snackbar.js";


class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        // initial localstorage check
        this.props.dispatch(paymentsLoadLocalstorage());
        this.props.dispatch(userLoadLocalstorage());

        // this.updateUser();
        this.updatePayments();
    }

    // =========== Static data =============

    // open the general modal
    openModalHelper = (message, title) => {
        this.props.dispatch(openModal(message, title));
    };
    closeModalHelper = () => {
        this.props.dispatch(closeModal());
    };

    // open/close the general snackbar
    openSnackbarHelper = (message, duration = 4000) => {
        this.props.dispatch(openSnackbar(message, duration));
    };
    closeSnackbarHelper = () => {
        this.props.dispatch(closeSnackbar());
    };

    updateUser = () => {
        this.props.dispatch(userUpdate());
    };
    updatePayments = () => {
        this.props.dispatch(paymentsUpdate());
    };

    render() {

        // generate a list of props we want to give to the children
        const childProps = {
            // uniqueness
            key: this.props.location.pathname,

            user_info: this.props.user_info,
            updateUser: this.updateUser,

            paymentsLoading: this.props.paymentsLoading,
            payments: this.props.payments,

            openModalHelper: this.openModalHelper,
            closeModalHelper: this.closeModalHelper,
            openSnackbarHelper: this.openSnackbarHelper,
            closeSnackbarHelper: this.closeSnackbarHelper
        };

        // get the component from the props
        const RouteComponent = this.props.routesComponent;

        return (
            <MuiThemeProvider muiTheme={DefaultTheme}>
                <div>
                    <Dialog
                        title={this.props.modalTitle}
                        actions={[
                            <Button
                                flat
                                label="Ok"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={this.closeModalHelper}
                            />
                        ]}
                        modal={false}
                        open={this.props.modalOpen}
                        onRequestClose={this.closeModalHelper}
                    >
                        {this.props.modalText}
                    </Dialog>
                    <Snackbar
                        open={this.props.snackbarOpen}
                        message={this.props.snackbarMessage}
                        autoHideDuration={this.props.snackbarDuration}
                        onRequestClose={this.closeSnackbarHelper}
                    />

                    <RouteComponent
                        user_info={this.props.user_info}
                        childProps={childProps}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}
export default withRouter(
    connect(store => {
        return {
            user_info: store.user.user_info,

            payments: store.payments.payments,
            paymentsLoading: store.payments.loading,

            modalText: store.modal.message,
            modalTitle: store.modal.title,
            modalOpen: store.modal.modalOpen,

            snackbarMessage: store.snackbar.message,
            snackbarDuration: store.snackbar.duration,
            snackbarOpen: store.snackbar.snackbarOpen
        };
    })(Main)
);
