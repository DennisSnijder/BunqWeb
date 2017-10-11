import React from "react";
import { connect } from "react-redux";
import IconButton from "material-ui/IconButton";
import ClearIcon from "material-ui-icons/Clear";

import { clearPaymentFilterType } from "../../Actions/payment_filter";

class ClearFilter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        if (this.props.paymentFilterClear) {
            return null;
        }
        return (
            <IconButton onClick={this.props.clearPaymentFilterType}>
                <ClearIcon />
            </IconButton>
        );
    }
}

const mapStateToProps = state => {
    return {
        paymentFilterClear: state.payment_filter.filterClear
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearPaymentFilterType: () => dispatch(clearPaymentFilterType())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClearFilter);
