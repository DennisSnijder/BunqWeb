import React from "react";
import Avatar from "material-ui/Avatar";
import { LinearProgress } from "material-ui/Progress";
import { ListItem, ListItemText } from "material-ui/List";

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
            return <LinearProgress />;
        }

        if (!this.props.accounts) {
            return [];
        }

        return this.props.accounts.map(account => {
            return (
                <ListItem
                    button
                    onClick={this.fetchPaymentsHandler(account.id)}
                >
                    <Avatar>
                        <img
                            width={50}
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
    }
}
