import React, { Component } from "react";
import Form from "../../../../Shared/Form/Form";
import CustomerService from "../../Shared/CustomerService";
import { REGEX_TEL } from "../../../../Constances/const";
import FormError from "../../../../Shared/Form/FormError";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import AuthService from "../../../../Shared/AuthService/AuthService";

class CustomerInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                appointments: "",
            }),
            message: "",
            errorMessage: "",
            onEdit: false,
        };
    }

    componentDidMount = () => {
        this.getCustomerDetails();
    };

    getCustomerDetails = () => {
        const { customerId } = this.props;
        CustomerService.getOneCustomer(customerId)
            .then((res) => {
                this._fillForm({
                    name: res.data.customer_name,
                    email: res.data.customer_email,
                    phone: res.data.customer_phone,
                    address: res.data.customer_address,
                    appointments: res.data.appointment,
                });
                this.props.getAppointment(res.data.appointment);
            })
            .catch((err) => {});
    };

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
        const { customerId } = this.props;
        const { form } = this.state;
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const customerInfo = {
                customer_name: form.name.value,
                customer_email: form.email.value,
                customer_phone: form.phone.value,
                customer_address: form.address.value,
            };
            CustomerService.updateCustomerInfo(customerId, customerInfo)
                .then((res) => {
                    this.setState({
                        onEdit: false,
                        message: `Update customer ${res.data.customer_name} successfully !! `,
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorMessage: "Updated customer failed !!",
                    });
                });
        }
    };

    render() {
        const { name, email, phone, address, dirty, appointments } =
            this.state.form;
        const { onEdit } = this.state;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Customer Details</h2>
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
                                        Customer Name
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
                                            name="name"
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={name.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "name")
                                            }
                                        />
                                        {name.err === "*" && dirty ? (
                                            <FormError errorMessage="Customer name cannot be empty" />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Email
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-currency-usd" />
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={email.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "email")
                                            }
                                        />
                                        {email.err === "*" && dirty ? (
                                            <FormError errorMessage="Email cannot be empty" />
                                        ) : dirty ? (
                                            <FormError
                                                errorMessage={email.err}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Phone number
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-security-account-outline" />
                                            </span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            pattern={REGEX_TEL}
                                            required
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={phone.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "phone")
                                            }
                                        />
                                        {phone.err === "*" && dirty ? (
                                            <FormError errorMessage="Phone cannot be empty" />
                                        ) : dirty ? (
                                            <FormError
                                                errorMessage={phone.err}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Address
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <textarea
                                            name="address"
                                            required
                                            disabled={!onEdit}
                                            value={address.value}
                                            className="form-control"
                                            onChange={(ev) =>
                                                this._setValue(ev, "address")
                                            }
                                        ></textarea>
                                    </div>
                                    {address.err === "*" && dirty ? (
                                        <FormError errorMessage="Address cannot be empty" />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Number of appointment
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-credit-card" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="appointment"
                                            required
                                            disabled
                                            className="form-control"
                                            value={appointments.value.length}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerInfo;
