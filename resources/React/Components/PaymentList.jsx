import React from "react";
import List, {
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import { LinearProgress } from "material-ui/Progress";
import NavLink from "../Components/Sub/NavLink";
import ArrowUpwardIcon from "material-ui-icons/ArrowUpward";
import ArrowDownwardIcon from "material-ui-icons/ArrowDownward";
import ListIcon from "material-ui-icons/List";
import IconButton from "material-ui/IconButton";

const styles = {
    smallAvatar: {
        width: 50,
        height: 50
    }
};

export default class PaymentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: false
        };
    }

    setFilter = type => {
        return () => this.setState({ filter: type });
    };

    render() {
        let payments = [];
        let loadingContent = this.props.paymentsLoading ? (
            <LinearProgress />
        ) : (
            <Divider />
        );

        let filterColor = "default";
        let nextFilter = "received";
        let filterIcon = <ListIcon />;
        switch (this.state.filter) {
            case "received":
                filterColor = "primary";
                nextFilter = "sent";
                filterIcon = <ArrowUpwardIcon />;
                break;
            case "sent":
                filterIcon = <ArrowDownwardIcon />;
                filterColor = "accent";
                nextFilter = false;
                break;
        }

        if (this.props.payments !== false) {
            payments = this.props.payments
                .filter(payment => {
                    if (this.state.filter === false) {
                        return true;
                    } else if (
                        this.state.filter === "received" &&
                        payment.amount.value > 0
                    ) {
                        return true;
                    } else if (
                        this.state.filter === "sent" &&
                        payment.amount.value < 0
                    ) {
                        return true;
                    }

                    return false;
                })
                .map(payment => {
                    let icon_uri =
                        "https://static.useresponse.com/public/bunq/avatars/default-avatar.svg";
                    let avatar = payment.counterparty_alias.avatar;
                    if (avatar) {
                        icon_uri = `/api/attachment/${avatar.image[0]
                            .attachment_public_uuid}`;
                    }
                    const displayName = payment.counterparty_alias.display_name;
                    const paymentDate = new Date(
                        payment.created
                    ).toLocaleString();
                    const paymentAmount = payment.amount.value;
                    const paymentColor = paymentAmount < 0 ? "red" : "green";

                    return [
                        <ListItem
                            button
                            to={`/payment/${payment.id}`}
                            component={NavLink}
                        >
                            <Avatar style={styles.smallAvatar}>
                                <img width={50} src={icon_uri} />
                            </Avatar>
                            <ListItemText
                                primary={displayName}
                                secondary={paymentDate}
                            />
                            <ListItemSecondaryAction>
                                <p
                                    style={{
                                        marginRight: 20,
                                        color: paymentColor
                                    }}
                                >
                                    € {paymentAmount}
                                </p>
                            </ListItemSecondaryAction>
                        </ListItem>,
                        <Divider />
                    ];
                });
        }

        return (
            <List>
                <ListItem>
                    Payments - {payments.length}
                    <ListItemSecondaryAction>
                        <IconButton
                            onClick={this.setFilter(nextFilter)}
                            color={filterColor}
                        >
                            {filterIcon}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                {loadingContent}
                <List>{payments}</List>
            </List>
        );
    }
}
