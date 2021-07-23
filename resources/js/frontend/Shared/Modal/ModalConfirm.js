
import React, { Component } from "react";

class ModalConfirm extends Component {
    constructor(props) {
        super(props);
        this.setState={
    
        }
    }

    onConfirm = () => {
        this.props.answer(this.props.confirmId);
    }

    render() {
        const { confirmId, message } = this.props;
        return (
            <div>
                <div
                    className="modal fade"
                    id={`modalConfirm${confirmId}`}
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Confirm
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
                            <div className="modal-body">
                                {message}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-pill"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-pill"
                                    onClick={this.onConfirm}
                                    data-dismiss="modal"

                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalConfirm;
