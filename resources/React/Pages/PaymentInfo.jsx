import React from "react";
import Helmet from "react-helmet";
import Redirect from "react-router-dom/Redirect";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import ArrowBackIcon from "material-ui-icons/ArrowBack";
import CircularProgress from "material-ui/Progress/CircularProgress";
import NavLink from "../Components/Sub/NavLink";

const styles = {
    btn: {},
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
        const { paymentId } = this.props.match.params;
        this.props.updatePayment(this.props.accountsSelectedAccount, paymentId);
    }

    render() {
        // we require a selected account before we can display payment information
        if (this.props.accountsSelectedAccount === false) {
            // no account_id set
            return <Redirect to={"/"} />;
        }

        let content;
        if (this.props.payment === false) {
            content = (
                <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                </div>
            );
        } else {
            content = <Paper style={styles.paper}>payment info</Paper>;
        }

        return (
            <Grid container spacing={24}>
                <Helmet>
                    <title>{`BunqWeb - Payment Info`}</title>
                </Helmet>

                <Grid item xs={12} sm={3}>
                    <Button to={"/"} component={NavLink} style={styles.btn}>
                        <ArrowBackIcon />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {content}
                </Grid>
            </Grid>
        );
    }
}
