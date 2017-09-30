import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./Components/Sub/PrivateRoute";
import PublicRoute from "./Components/Sub/PublicRoute";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Pay from "./Pages/Pay";
import NotFound from "./Pages/NotFound";

// router react component
export default class Routes extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <Route
                render={wrapperProps => (
                    <Switch
                        key={wrapperProps.location.key}
                        location={wrapperProps.location}
                    >
                        <PrivateRoute
                            exact
                            path="/"
                            user={this.props.user}
                            render={props => {
                                return (
                                    <Dashboard
                                        {...props}
                                        {...this.props.childProps}
                                    />
                                );
                            }}
                        />

                        <PrivateRoute
                            path="/pay"
                            user={this.props.user}
                            render={props => {
                                return (
                                    <Pay
                                        {...props}
                                        {...this.props.childProps}
                                    />
                                );
                            }}
                        />

                        <PublicRoute
                            path="/login"
                            user={this.props.user}
                            render={props => {
                                return (
                                    <Login
                                        {...props}
                                        {...this.props.childProps}
                                    />
                                );
                            }}
                        />

                        <Route
                            render={props => (
                                <NotFound
                                    {...props}
                                    {...this.props.childProps}
                                />
                            )}
                        />
                    </Switch>
                )}
            />
        );
    }
}
