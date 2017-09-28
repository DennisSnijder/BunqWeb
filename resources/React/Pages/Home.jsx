import React from "react";
import Helmet from "react-helmet";

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{`BunqWeb - Home`}</title>
                </Helmet>
                <div className="row center-xs">
                    <div className="col-xs-12 col-sm-6">
                        <div className="box">
                            This is the home page react item
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
