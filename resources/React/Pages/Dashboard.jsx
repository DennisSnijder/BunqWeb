import React from "react";
import Helmet from "react-helmet";
import List, {
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";

export default class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        let listItems = [];
        if (this.props.payments) {
            listItems = this.props.payments.map(payment => {
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

                return (
                    <ListItem button>
                        <Avatar>
                            <img width={50} src={icon_uri} />
                        </Avatar>
                        <ListItemText
                            primary={displayName}
                            secondary={paymentDate}
                        />
                        <ListItemSecondaryAction>
                            <p style={{marginRight: 20}}>€ {paymentAmount}</p>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            });
        }

        return (
            <div>
                <Helmet>
                    <title>{`BunqWeb - React Dashboard`}</title>
                </Helmet>
                <Paper>
                    <List>
                        <ListSubheader>Payments</ListSubheader>
                        {listItems}
                    </List>
                </Paper>
            </div>
        );
    }
}
