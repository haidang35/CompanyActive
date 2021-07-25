import React, { Component } from "react";
import { REGEX_TEL } from "../../../../Constances/const";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";
import StaffService from "../../../Staff/Shared/StaffService";
import CustomerService from "../../../Customer/Shared/CustomerService";

class AddNewAppointment extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                title: "",
                datetime: "",
                desc: "",
                customer: "",
                staff: ""
            }),
            staffs: [],
            customers: [],
        };
    }

    componentDidMount() {
        this.getAllCustomer();
        this.getAllStaff();
    }

    getAllStaff = () => {
        StaffService.getAllStaff().then((res) => {
            this.setState({
                staffs: res.data,
            });
        });
    };

    getAllCustomer = () => {
        CustomerService.getAllCustomer().then((res) => {
            this.setState({
                customers: res.data,
            });
        });
    };

    onSubmitForm = () => {
        this.state.form["dirty"] = true;
        this._validateForm();
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                appointment_title: form.title.value,
                appointment_time: form.datetime.value,
                appointment_desc: form.desc.value,
                appointment_status: 0,
                customer_id: form.customer.value,
                staff_id: form.staff.value
            };
            this.props.onSubmitForm(data);
            this._fillForm({
                title: "",
                datetime: "",
                desc: "",
                dirty: false,
            });
        }
    };

    render() {
        const { title, datetime, desc, dirty, staff, customer } = this.state.form;
        const { customers, staffs } = this.state;
        return (
            <div>
                <div
                    className="modal fade"
                    id="addNewAppointment"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalFormTitle"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalFormTitle"
                                >
                                    Add new appointment
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
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Appointment Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            className="form-control"
                                            placeholder="Appointment tile"
                                            value={title.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "title")
                                            }
                                        />
                                        {title.err === "*" && dirty ? (
                                            <FormError errorMessage="Appointment title cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Date time
                                        </label>
                                        <input
                                            type="date"
                                            name="datetime"
                                            className="form-control"
                                            required
                                            placeholder="Date ..."
                                            value={datetime.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "datetime")
                                            }
                                        />
                                        {datetime.err === "*" && dirty ? (
                                            <FormError errorMessage="Date time cannot be empty" />
                                        ) : dirty ? (
                                            <FormError
                                                errorMessage={datetime.err}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Customer
                                        </label>
                                        <select
                                            className="form-control"
                                            name="customer"
                                            required
                                            onChange={(ev) => this._setValue(ev, "customer")}
                                        >
                                            <option value="0">Select customer</option>
                                            {customers.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.customer_name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {/* {customer.err === "*" && dirty ? (
                                            <FormError errorMessage="Customer cannot be empty" />
                                        ) : (
                                            ""
                                        )} */}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Staff
                                        </label>
                                        <select
                                            className="form-control"
                                            name="staff"
                                            required
                                            onChange={(ev) => this._setValue(ev, "staff")}
                                        >
                                            <option value="0">Select staff</option>
                                            {staffs.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {/* {staff.err === "*" && dirty ? (
                                            <FormError errorMessage="Staff cannot be empty" />
                                        ) : (
                                            ""
                                        )} */}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Description
                                        </label>
                                        <textarea
                                            name="desc"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            rows={5}
                                            placeholder="Description"
                                            value={desc.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "desc")
                                            }
                                        ></textarea>
                                        {desc.err === "*" && dirty ? (
                                            <FormError errorMessage="Description cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </form>
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
                                    onClick={this.onSubmitForm}
                                    data-dismiss={
                                        !this._isFormValid() ? "modal" : ""
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewAppointment;
