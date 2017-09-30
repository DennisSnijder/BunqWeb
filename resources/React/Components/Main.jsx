import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";
import Button from "material-ui/Button";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";

import DefaultThemeConfig from "../Themes/DefaultTheme";
const DefaultTheme = createMuiTheme(DefaultThemeConfig);

// redux actions
import { userLoadLocalstorage, userUpdate } from "../Actions/user.js";
import { paymentsUpdate } from "../Actions/payments.js";
import { accountsUpdate } from "../Actions/accounts.js";
import { closeModal, openModal } from "../Actions/modal.js";
import { closeSnackbar, openSnackbar } from "../Actions/snackbar.js";

class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.props.userLoadLocalstorage();

        this.props.updateAccounts();
    }

    render() {
        const childProps = {
            // uniqueness to help with triggering route change animations
            key: this.props.location.pathname,

            user_info: this.props.user_info,
            updateUser: this.props.updateUser,

            paymentsLoading: this.props.paymentsLoading,
            paymentsAccountId: this.props.paymentsAccountId,
            payments: this.props.payments,
            updatePayments: this.props.updatePayments,

            accountsLoading: this.props.accountsLoading,
            accounts: this.props.accounts,
            updateaccounts: this.props.updateaccounts,

            openModal: this.props.openModal,
            closeModal: this.props.closeModal,
            openSnackbar: this.props.openSnackbar,
            closeSnackbar: this.props.closeSnackbar
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
                                onTouchTap={this.props.closeModal}
                            />
                        ]}
                        modal={false}
                        open={this.props.modalOpen}
                        onRequestClose={this.props.closeModal}
                    >
                        {this.props.modalText}
                    </Dialog>

                    <Snackbar
                        open={this.props.snackbarOpen}
                        message={this.props.snackbarMessage}
                        autoHideDuration={this.props.snackbarDuration}
                        onRequestClose={this.props.closeSnackbar}
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
    connect(
        store => {
            return {
                user_info: store.user.user_info,

                payments: store.payments.payments,
                paymentsLoading: store.payments.loading,
                paymentsAccountId: store.payments.account_id,

                accounts: store.accounts.accounts,
                accountsLoading: store.accounts.loading,

                modalText: store.modal.message,
                modalTitle: store.modal.title,
                modalOpen: store.modal.modalOpen,

                snackbarMessage: store.snackbar.message,
                snackbarDuration: store.snackbar.duration,
                snackbarOpen: store.snackbar.snackbarOpen
            };
        },
        (dispatch, props) => {
            return {
                closeSnackbar: () => dispatch(closeSnackbar()),
                openSnackbar: (message, duration = 4000) =>
                    dispatch(openSnackbar(message, duration)),

                closeModal: () => dispatch(closeModal()),
                openModal: (message, title) =>
                    dispatch(openModal(message, title)),

                updatePayments: (accountId) => dispatch(paymentsUpdate(accountId)),

                updateAccounts: () => dispatch(accountsUpdate()),

                updateUser: () => dispatch(userUpdate()),
                userLoadLocalstorage: () => dispatch(userLoadLocalstorage())
            };
        }
    )(Main)
);
