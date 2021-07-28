import React, { Component } from "react";
import Form from "../../../../Shared/Form/Form";
import { REGEX_TEL } from "../../../../Constances/const";
import FormError from "../../../../Shared/Form/FormError";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import AppointmentService from "../../Shared/AppointmentService";
import { Link } from "react-router-dom";

class AppointmentDetails extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                title: "",
                datetime: "",
                desc: "",
                status: "",
                customer: {},
                staffs: [],
            }),
            onEdit: false,
            message: "",
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.getAppointmentInfo();
    }

    getAppointmentInfo() {
        const { id } = this.props.match.params;
        AppointmentService.getOneAppointment(id)
            .then((res) => {
                this._fillForm({
                    title: res.data.appointment_title,
                    datetime: res.data.appointment_time,
                    desc: res.data.appointment_desc,
                    status: res.data.appointment_status,
                    customer: res.data.customer,
                    staffs: res.data.staff,
                });
            })
            .catch((err) => {});
    }

    onEditInfo = () => {
        this.setState({
            onEdit: true,
        });
    };

    onCancelEditInfo = () => {
        this.setState({
            onEdit: false,
        });
    };

    onSaveChangeInfo = () => {
        const { id } = this.props.match.params;
        const { form } = this.state;
        const data = {
            appointment_title: form.title.value,
            appointment_time: form.datetime.value,
            appointment_desc: form.desc.value,
            appointment_status: form.status.value,
        };
        AppointmentService.updateAppointment(id, data)
            .then((res) => {
                this.setState({
                    message: `Update appointment ${res.data.appointment_title} successful !!`,
                    onEdit: false
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: `Update appointment ${form.title.value} failed !!`
                });
            });
            this.getAppointmentInfo();
    };

    render() {
        const { id } = this.props.match.params;
        const { onEdit } = this.state;
        const { title, datetime, desc, status, staffs, customer } =
            this.state.form;
        let loop = 1;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Appointment Details</h2>
                    </div>
                    <div className="card-body detail-info">
                        <div>
                            <AlertSuccess message={this.state.message} />
                            <AlertDanger message={this.state.errorMessage} />
                        </div>
                        <div
                            className="col-sm-12"
                            style={{ marginBottom: "35px" }}
                        >
                            <div className="btn-control-right">
                                {!onEdit ? (
                                    <button
                                        onClick={this.onEditInfo}
                                        className=" btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <div>
                                        <button
                                            className=" btn btn-success"
                                            onClick={this.onSaveChangeInfo}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={this.onCancelEditInfo}
                                            className=" btn btn-warning"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="detail-content">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Appointment Title
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-phone" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            name="title"
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={title.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "title")
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Date time
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-currency-usd" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="email"
                                            required
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={datetime.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "datetime")
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Description
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-security-account-outline" />
                                            </span>
                                        </div>
                                        <textarea
                                            name="desc"
                                            required
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={desc.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "desc")
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Status
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <select
                                            name="status"
                                            required
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={status.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "status")
                                            }
                                        >
                                            <option value={1}>DONE</option>
                                            <option value={0}>PENDING</option>
                                            <option value={2}>REJECTED</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Customer
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mb-2">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="status"
                                            required
                                            disabled
                                            className="form-control"
                                            value={customer.value.customer_name}
                                        />
                                        <Link
                                            to={`/app/customers/${customer.value.id}`}
                                        >
                                            <button className="btn btn-primary mb-2">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Staff</h2>
                    </div>

                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Staff Name</th>
                                    <th scope="col">Birthday</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs.value.map((item) => {
                                    return (
                                        <tr>
                                            <td>{loop++}</td>
                                            <td>{item.name}</td>
                                            <td>{item.birthday}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <div className="btn-control">
                                                    <Link
                                                        to={`/app/staffs/${item.id}`}
                                                    >
                                                        <button className="btn btn-warning">
                                                            View
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentDetails;
