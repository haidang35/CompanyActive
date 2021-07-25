import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { appointments } = this.props;
        return (
            <div>
                <div
                    className="card card-default todo-table"
                    id="todo"
                    data-scroll-height={500}
                >
                    <div className="card-header justify-content-between align-items-center card-header-border-bottom">
                        <h2 className="d-inline-block">
                            Appointments of customer
                        </h2>
                        <a
                            className="btn btn-primary btn-pill"
                            id="add-task"
                            href="#"
                            role="button"
                        >
                            {" "}
                            Add task{" "}
                        </a>
                    </div>
                    <div className="card-body slim-scroll">
                        <div
                            className="todo-single-item d-none"
                            id="todo-input"
                        >
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Todo"
                                        autofocus
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="todo-list" id="todo-list">
                            {appointments.map((item) => {
                                return (
                                    <Link to={`/app/appointments/${item.id}`}>
                                        <div className="todo-single-item d-flex flex-row justify-content-between current alert alert-primary">
                                            <i className="mdi" />
                                            <span>
                                                {item.appointment_title}
                                            </span>
                                            {item.appointment_status ? (
                                                <span className="badge badge-success">
                                                    Done
                                                </span>
                                            ) : (
                                                <span className="badge badge-warning">
                                                    Pending
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-3" />
                </div>
            </div>
        );
    }
}

export default CustomerAppointment;
