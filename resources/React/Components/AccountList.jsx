import React from "react";
import Avatar from "material-ui/Avatar";
import { LinearProgress } from "material-ui/Progress";
import Divider from "material-ui/Divider";
import List, { ListSubheader, ListItem, ListItemText } from "material-ui/List";

const styles = {
    bigAvatar: {
        width: 60,
        height: 60
    }
};

export default class AccountList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    fetchPaymentsHandler(accountId) {
        return () => {
            if (!this.props.paymentsLoading) {
                this.props.updatePayments(accountId);
            }
        };
    }

    render() {
        if (this.props.accountsLoading) {
            return (
                <List>
                    <ListSubheader>Accounts</ListSubheader>
                    <LinearProgress />
                </List>
            );
        }

        if (!this.props.accounts) {
            return [];
            return (
                <List>
                    <ListSubheader>Accounts</ListSubheader>
                </List>
            );
        }

        let totalBalance = 0;

        const accounts = this.props.accounts.map(account => {
            if (account.status === "CANCELLED") {
                return null;
            }
            totalBalance += account.balance.value;
            return (
                <ListItem
                    button
                    divider
                    onClick={this.fetchPaymentsHandler(account.id)}
                >
                    <Avatar style={styles.bigAvatar}>
                        <img
                            width={60}
                            src={`/api/attachment/${account.avatar.image[0]
                                .attachment_public_uuid}`}
                        />
                    </Avatar>
                    <ListItemText
                        primary={account.description}
                        secondary={`€ ${account.balance.value}`}
                    />
                </ListItem>
            );
        });

        return (
            <List>
                <ListSubheader>Accounts - {accounts.length}</ListSubheader>
                <Divider />
                {accounts}
            </List>
        );
    }
}
