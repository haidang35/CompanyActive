import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";
import StaffService from "../../../Staff/Shared/StaffService";
import AppointmentService from "../../../Appointment/Shared/AppointmentService";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import LoadingEffect from "../../../../Shared/Loading/LoadingEffect";

class CustomerAppointment extends Form {
    constructor(props) {
        super(props);
        this.state = {
            staffList: [],
            form: this._getInitFormData({
                title: "",
                time: "",
                staffId: "",
                desc: "",
            }),
            openForm: false,
            message: "",
            errorMessage: "",
            onLoad: false
        };
    }

    componentDidMount() {
        this.getAllStaff();
    }

    getAllStaff = () => {
        StaffService.getAllStaffNotPaginate().then((res) => {
            this.setState({
                staffList: res.data,
            });
        });
    };

    onOpenForm = () => {
        this.setState({
            openForm: true,
        });
    };

    onCancelMissionForm = () => {
        this.setState({
            openForm: false,
        });
        this._fillForm({
            title: "",
            time: "",
            staffId: "",
            desc: "",
        });
    };

    onSubmitForm = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        const { form } = this.state;
        const { customerId } = this.props;
        const data = {
            appointment_title: form.title.value,
            appointment_time: form.time.value,
            appointment_desc: form.desc.value,
            appointment_status: 0,
            staff_id: form.staffId.value,
            customer_id: customerId,
        };
        if(this._isFormValid()) {
            this.setState({
                onLoad: true,
                openForm: false
            });
              AppointmentService.createAppointment(data)
            .then((res) => {
                this.setState({
                    message: `Create new appointment ${res.data.appointment_title} successfull !!`,
                    onLoad: false
                });
                this._fillForm({
                    title: "",
                    time: "",
                    staffId: "",
                    desc: "",
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Create new appointment failed, try again please !!",
                    onLoad: false
                });
            });
        }
      
    };

    render() {
        const { appointments } = this.props;
        const { staffList, openForm } = this.state;
        const { title, time, desc, staffId, dirty } = this.state.form;
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
                        {!this.state.openForm ? (
                            <button
                                onClick={this.onOpenForm}
                                className="btn btn-primary btn-pill"
                                id="add-task"
                                role="button"
                            >
                                {" "}
                                Add new appointment{" "}
                            </button>
                        ) : (
                            <div>
                                <button
                                    onClick={this.onSubmitForm}
                                    className="btn btn-info"
                                    style={{ marginRight: "15px" }}
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={this.onCancelMissionForm}
                                    className="btn btn-danger"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="card-body slim-scroll">
                        <LoadingEffect onLoad={this.state.onLoad} title="Creating new appointment" />
                        <AlertSuccess message={this.state.message}/>
                        <AlertDanger message={this.state.errorMessage}/>
                        {openForm ? (
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Appointment Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            className="form-control"
                                            id="exampleFormControlInput3"
                                            placeholder="Appointment title "
                                            value={title.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "title")
                                            }
                                        />
                                    </div>
                                    {title.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Appointment title cannot be empty"
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Time</label>
                                        <input
                                            type="date"
                                            name="time"
                                            required
                                            className="form-control"
                                            id="exampleFormControlInput3"
                                            placeholder="Appointment time "
                                            value={time.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "time")
                                            }
                                        />
                                    </div>
                                    {time.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Appointment time cannot be empty"
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <label>Staff</label>
                                        <select
                                            name="staffId"
                                            required
                                            className="form-control"
                                            id="exampleFormControlInput3"
                                            placeholder="Appointment Content "
                                            value={staffId.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "staffId")
                                            }
                                        >
                                            <option value="">
                                                Select staff
                                            </option>
                                            {staffList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {staffId.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Staff cannot be empty"
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Content</label>
                                        <textarea
                                            name="desc"
                                            required
                                            className="form-control"
                                            id="exampleFormControlInput3"
                                            cols="6"
                                            rows="6"
                                            placeholder="Description "
                                            value={desc.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "desc")
                                            }
                                        ></textarea>
                                    </div>
                                    {desc.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Description cannot be empty"
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}

                       
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
