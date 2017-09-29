import React from "react";
import List, {
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import { LinearProgress } from "material-ui/Progress";

const styles = {
    smallAvatar: {
        width: 50,
        height: 50
    }
};

export default class PaymentList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        if (this.props.paymentsLoading) {
            return (
                <List>
                    <ListSubheader>Payments</ListSubheader>
                    <LinearProgress />
                </List>
            );
        }

        if (!this.props.payments) {
            return (
                <List>
                    <ListSubheader>Payments</ListSubheader>
                </List>
            );
        }

        const payments = this.props.payments.map(payment => {
            let icon_uri =
                "https://static.useresponse.com/public/bunq/avatars/default-avatar.svg";
            let avatar = payment.counterparty_alias.avatar;
            if (avatar) {
                icon_uri = `/api/attachment/${avatar.image[0]
                    .attachment_public_uuid}`;
            }
            const displayName = payment.counterparty_alias.display_name;
            const paymentDate = new Date(payment.created).toLocaleString();
            const paymentAmount = payment.amount.value;
            const paymentColor = paymentAmount < 0 ? "red" : "green";

            return [
                <ListItem>
                    <Avatar style={styles.smallAvatar}>
                        <img width={50} src={icon_uri} />
                    </Avatar>
                    <ListItemText
                        primary={displayName}
                        secondary={paymentDate}
                    />
                    <ListItemSecondaryAction>
                        <p style={{ marginRight: 20, color: paymentColor }}>
                            € {paymentAmount}
                        </p>
                    </ListItemSecondaryAction>
                </ListItem>,
                <Divider />
            ];
        });

        return (
            <List>
                <ListSubheader>Payments - {payments.length}</ListSubheader>
                <Divider />
                {payments}
            </List>
        );
    }
}
