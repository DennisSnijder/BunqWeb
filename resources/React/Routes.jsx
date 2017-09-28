import React from "react";
import { Route, Switch } from "react-router-dom";

// import PrivateRoute from "./Components/Sub/PrivateRoute";
import PublicRoute from "./Components/Sub/PublicRoute";

// load the pages
import Home from "./Pages/Home";
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
                        <PublicRoute
                            exact
                            path="/"
                            user_info={this.props.user_info}
                            render={props => (
                                <Home {...props} {...this.props.childProps} />
                            )}
                        />


                        {/* Normally we protect this route using a PrivateRoute. Disabled for testing */}
                        <PublicRoute
                            user_info={this.props.user_info}
                            path="/react"
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
