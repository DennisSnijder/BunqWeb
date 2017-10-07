import React from "react";
import Helmet from "react-helmet";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import axios from "axios";

const styles = {
    payButton: {
        width: "100%"
    },
    paper: {
        padding: 24
    },
    inputs: {}
};

export default class PaymentInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            amount: 0,
            description: "",
            target: ""
        };
    }

    componentDidMount() {
        const { accountId, paymentId } = this.props.match.params;
        this.props.updatePayment(accountId, paymentId);
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Helmet>
                    <title>{`BunqWeb - Payment Info`}</title>
                </Helmet>

                <Grid item xs={12} sm={3} md={4} />
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={styles.paper}>payment info</Paper>
                </Grid>
            </Grid>
        );
    }
}
