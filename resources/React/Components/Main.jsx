import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createMuiTheme from "material-ui/styles/createMuiTheme";

import DefaultThemeConfig from "../Themes/DefaultTheme";
const DefaultTheme = createMuiTheme(DefaultThemeConfig);

// redux actions
import { userLogin, userLogout } from "../Actions/user.js";
import { usersUpdate } from "../Actions/users.js";
import { paymentsUpdate } from "../Actions/payments.js";
import { paymentInfoUpdate } from "../Actions/payment_info.js";
import { accountsUpdate, accountsSelectAccount } from "../Actions/accounts.js";
import { closeModal, openModal } from "../Actions/modal.js";
import { closeSnackbar, openSnackbar } from "../Actions/snackbar.js";

class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.user !== false) {
            // refresh user to make sure it is still available
            this.props.loginUser(this.props.user.id, this.props.user.type);
        }

        // make this global to allow service worker to access it :^)
        window.showSnackbar = this.props.openSnackbar;
    }

    render() {
        const childProps = {
            // uniqueness to help with triggering route change animations
            key: this.props.location.pathname,

            user: this.props.user,
            userLoading: this.props.userLoading,
            loginUser: this.props.loginUser,
            logoutUser: this.props.logoutUser,

            users: this.props.users,
            usersLoading: this.props.usersLoading,
            updateUsers: this.props.updateUsers,

            paymentsLoading: this.props.paymentsLoading,
            paymentsAccountId: this.props.paymentsAccountId,
            payments: this.props.payments,
            updatePayments: this.props.updatePayments,

            paymentLoading: this.props.paymentLoading,
            paymentAccountId: this.props.paymentAccountId,
            paymentId: this.props.paymentId,
            payment: this.props.payment,
            updatePayment: this.props.updatePayment,

            accountsLoading: this.props.accountsLoading,
            accounts: this.props.accounts,
            updateAccounts: this.props.updateAccounts,
            selectAccount: this.props.selectAccount,
            accountsSelectedAccount: this.props.accountsSelectedAccount,

            openModal: this.props.openModal,
            closeModal: this.props.closeModal,
            openSnackbar: this.props.openSnackbar,
            closeSnackbar: this.props.closeSnackbar
        };

        // get the component from the props
        const RouteComponent = this.props.routesComponent;

        return (
            <MuiThemeProvider muiTheme={DefaultTheme}>
                <Grid container spacing={24} justify={"center"}>
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

                    <Grid item xs={12} md={10} lg={8} xl={6}>
                        <RouteComponent
                            user={this.props.user}
                            childProps={childProps}
                        />
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}
export default withRouter(
    connect(
        store => {
            return {
                user: store.user.user,
                userInitialCheck: store.user.initialCheck,
                userLoading: store.user.loading,

                users: store.users.users,
                usersInitialCheck: store.users.initialCheck,
                usersLoading: store.users.loading,

                payments: store.payments.payments,
                paymentsLoading: store.payments.loading,
                paymentsAccountId: store.payments.account_id,

                payment: store.payment_info.payment,
                paymentLoading: store.payment_info.loading,
                paymentAccountId: store.payment_info.account_id,
                paymentId: store.payment_info.payment_id,

                accounts: store.accounts.accounts,
                accountsSelectedAccount: store.accounts.selectedAccount,
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

                updatePayments: accountId =>
                    dispatch(paymentsUpdate(accountId)),

                updatePayment: (accountId, paymentId) =>
                    dispatch(paymentInfoUpdate(accountId, paymentId)),

                updateAccounts: () => dispatch(accountsUpdate()),
                selectAccount: acountId =>
                    dispatch(accountsSelectAccount(acountId)),

                updateUsers: () => dispatch(usersUpdate()),

                loginUser: (id, type) => dispatch(userLogin(id, type)),
                logoutUser: () => dispatch(userLogout())
            };
        }
    )(Main)
);
