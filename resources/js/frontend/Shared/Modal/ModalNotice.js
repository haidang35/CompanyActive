import React, { Component } from "react";

class ModalNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { message, idNotice, title } = this.props;
        return (
            <div className="modal-notice">
                <div
                    className="modal fade show"
                    id={`modalNoti${idNotice}`}
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog"
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    {title}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">{message}</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-pill"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        this.setState({ message: "" });
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalNotice;
