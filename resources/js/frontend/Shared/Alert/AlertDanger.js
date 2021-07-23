import React, { Component } from "react";

class AlertDanger extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { message } = this.props;
        return (
            <div>
                {message.length > 0 ? (
                    <div className="row">
                        <div className="col-sm-6">
                            <div
                                className="alert alert-danger alert-highlighted"
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default AlertDanger;
