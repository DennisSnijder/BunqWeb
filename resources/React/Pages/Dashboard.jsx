import React from "react";
import Helmet from "react-helmet";
import List, { ListSubheader } from "material-ui/List";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import PaymentList from "../Components/PaymentList";
import AccountList from "../Components/AccountList";

export default class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Helmet>
                    <title>{`BunqWeb - Dashboard`}</title>
                </Helmet>

                <Grid item xs={12} md={4}>
                    <Paper>
                        <AccountList
                            accounts={this.props.accounts}
                            accountsLoading={this.props.accountsLoading}
                            updatePayments={this.props.updatePayments}
                            paymentsLoading={this.props.paymentsLoading}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper>
                        <PaymentList
                            payments={this.props.payments}
                            paymentsLoading={this.props.paymentsLoading}
                            updatePayments={this.props.updatePayments}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}
