import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// the client route polyfill which renders the app shell
import Routes from "./Routes.jsx";
// main app wrapper
import Main from "./Components/Main.jsx";
// the store
import Store from "./Store.jsx";

export default class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <Provider store={Store()}>
                <BrowserRouter>
                    <Main routesComponent={Routes} />
                </BrowserRouter>
            </Provider>
        );
    }
}
