import React from "react";
import { connect } from "react-redux";
import List, { ListItem, ListItemSecondaryAction } from "material-ui/List";
import Divider from "material-ui/Divider";
import { LinearProgress } from "material-ui/Progress";

import PaymentListItem from "./PaymentListItem";
import ClearBtn from "./FilterIcons/ClearFilter";
import PaymentTypeBtn from "./FilterIcons/PaymentType";

class PaymentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        let payments = [];
        let loadingContent = this.props.paymentsLoading ? (
            <LinearProgress />
        ) : (
            <Divider />
        );

        if (this.props.payments !== false) {
            payments = this.props.payments
                .filter(payment => {
                    if (this.props.paymentType === false) {
                        return true;
                    } else if (
                        this.props.paymentType === "received" &&
                        payment.amount.value > 0
                    ) {
                        return true;
                    } else if (
                        this.props.paymentType === "sent" &&
                        payment.amount.value < 0
                    ) {
                        return true;
                    }

                    return false;
                })
                .map(payment => <PaymentListItem payment={payment} />);
        }

        return (
            <List>
                <ListItem>
                    Payments - {payments.length}
                    <ListItemSecondaryAction>
                        <ClearBtn />
                        {/*<DateRangeBtn />*/}
                        <PaymentTypeBtn />
                    </ListItemSecondaryAction>
                </ListItem>

                {loadingContent}
                <List>{payments}</List>
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        paymentType: state.payment_filter.type,
        payments: state.payments.payments,
        paymentsLoading: state.payments.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentList);
