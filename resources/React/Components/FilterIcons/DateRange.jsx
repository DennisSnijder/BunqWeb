import React from "react";
import { findDOMNode } from "react-dom";
import Popover from "material-ui/Popover";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import DateRangeIcon from "material-ui-icons/DateRange";

const styles = {
    popover: {
        margin: 20
    }
};

export default class DateRange extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            anchorEl: null
        };
        this.button = null;
    }

    handleClickButton = () => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button)
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { open, anchorEl } = this.state;
        return [
            <Popover
                key={"popover"}
                open={open}
                style={styles.popover}
                anchorEl={anchorEl}
                onRequestClose={this.handleRequestClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <form noValidate>
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </form>
            </Popover>,
            <IconButton
                key={"popovasdfer"}
                ref={node => {
                    this.button = node;
                }}
                onClick={this.handleClickButton}
            >
                <DateRangeIcon />
            </IconButton>
        ];
    }
}
