import React from "react";
import Helmet from "react-helmet";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import PaymentList from "../Components/PaymentList";
import AccountList from "../Components/AccountList";

const styles = {
    btn: {
        width: "100%"
    }
};

export default class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        this.props.updateAccounts();
    }

    render() {
        return (
            <Grid container spacing={16}>
                <Helmet>
                    <title>{`BunqWeb - Dashboard`}</title>
                </Helmet>

                <Grid item xs={8} sm={10}>
                    <h1>Welcome {this.props.user.displayName}</h1>
                </Grid>

                <Grid item xs={4} sm={2}>
                    <Button style={styles.btn} onClick={this.props.logoutUser}>
                        Switch User
                    </Button>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper>
                        <AccountList
                            accounts={this.props.accounts}
                            selectAccount={this.props.selectAccount}
                            accountsSelectedAccount={this.props.accountsSelectedAccount}
                            accountsLoading={this.props.accountsLoading}
                            updatePayments={this.props.updatePayments}
                            paymentsLoading={this.props.paymentsLoading}
                            paymentsAccountId={this.props.paymentsAccountId}
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
