import React from "react";
import { Route, Switch } from "react-router-dom";

// import PrivateRoute from "./Components/Sub/PrivateRoute";
import PublicRoute from "./Components/Sub/PublicRoute";
import Dashboard from "./Pages/Dashboard";
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
                        {/* Normally we protect this route using a PrivateRoute. Disabled until the 'user' is implemented with redux */}
                        <PublicRoute
                            exact
                            user_info={this.props.user_info}
                            path="/"
                            render={props => {
                                return (
                                    <Dashboard
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
