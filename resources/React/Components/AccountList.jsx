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

    componentDidMount() {
        const { accountsSelectedAccount, paymentsAccountId } = this.props;
        if (accountsSelectedAccount !== false) {
            // by default load payments for the selected account
            if (accountsSelectedAccount !== paymentsAccountId) {
                // fetch all payments for the account
                this.props.updatePayments(accountsSelectedAccount);
            }
        }
    }

    fetchPaymentsHandler(accountId) {
        return () => {
            if (!this.props.paymentsLoading) {
                // select this account
                this.props.selectAccount(accountId);
                // fetch all payments for the account
                this.props.updatePayments(accountId);
            }
        };
    }

    render() {
        let accounts = [];
        let loadingContent = this.props.accountsLoading ? (
            <LinearProgress />
        ) : (
            <Divider />
        );

        if (this.props.accounts !== false) {
            accounts = this.props.accounts.map(account => {
                if (account.status === "CANCELLED") {
                    return null;
                }
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
        }

        return (
            <List>
                <ListSubheader>Accounts - {accounts.length}</ListSubheader>
                {loadingContent}
                <List>{accounts}</List>
            </List>
        );
    }
}
