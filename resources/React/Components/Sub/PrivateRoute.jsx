import React from "react";
import { Redirect, Route } from "react-router-dom";

export default ({ component: Component, ...rest }) => {
    // if we have a render function, use it
    // else return a new function which returns the component
    const componentHandler = rest.render ? rest.render : props => Component;

    return (
        <Route
            {...rest}
            render={props =>
                !!rest.user_info
                    ? componentHandler(props)
                    : <Redirect
                          to={{
                              pathname: "/",
                              state: { from: props.location }
                          }}
                      />}
        />
    );
};
