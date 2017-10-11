import React from "react";
import {connect} from "react-redux";
import Helmet from "react-helmet";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import Card, { CardHeader, CardContent } from "material-ui/Card";
import {userLogin,} from "../Actions/user";
import {usersUpdate} from "../Actions/users";

const styles = {
    loginButton: {
        width: "100%"
    },
    smallAvatar: {
        width: 50,
        height: 50
    }
};

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: [],
            attemptingLogin: false
        };
    }

    componentDidMount() {
        this.props.updateUsers();
    }

    login(id, type) {
        return () => {
            this.props.loginUser(id, type);
        };
    }

    render() {
        const userItems = this.props.users.map(user => {
            let avatar = `/api/attachment/${user.publicAttachmentUUID}`;

            return (
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    <img
                                        style={styles.smallAvatar}
                                        src={avatar}
                                    />
                                </Avatar>
                            }
                            title={user.displayName}
                        />
                        <CardContent>
                            <Button
                                disabled={this.props.userLoading}
                                onClick={this.login(user.id, user.type)}
                                raised
                                color={"primary"}
                                style={styles.loginButton}
                            >
                                Login
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            );
        });

        return (
            <Grid container spacing={24}>
                <Helmet>
                    <title>{`BunqWeb - Login`}</title>
                </Helmet>

                {userItems}
            </Grid>
        );
    }
}


const mapStateToProps = state => {
    return {
        users: state.users.users,
        user: state.user.user,
        userLoading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (id, type) => dispatch(userLogin(id, type)),
        updateUsers: () => dispatch(usersUpdate())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);