import React, { Component } from "react";
import "./StaffDetails.scss";
import StaffService from "../../Shared/StaffService";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";
import { REGEX_TEL } from "../../../../Constances/const";
import AuthService from "../../../../Shared/AuthService/AuthService";

class StaffDetails extends Form {
    constructor(props) {
        super(props);
        this.state = {
            onEdit: false,
            userId: "",
            form: this._getInitFormData({
                name: "",
                birthday: "",
                email: "",
                address: "",
                phone: "",
                departmentName: "",
            }),
        };
    }

    componentDidMount() {
        this.getStaffInfo();
    }

    getStaffInfo = () => {
        const { id } = this.props.match.params;
        StaffService.getOneStaff(id)
            .then((res) => {
                this.setState({
                    userId: res.data.id,
                });
                this._fillForm({
                    name: res.data.name,
                    birthday: res.data.birthday,
                    email: res.data.email,
                    phone: res.data.phone,
                    address: res.data.address,
                    departmentName: res.data.department.department_name,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onEditInfo = () => {
        this.setState({
            onEdit: !this.state.onEdit,
        });
    };

    onCancelEditInfo = () => {
        this.setState({
            onEdit: !this.state.onEdit,
        });
        this.getStaffInfo();
    };

    onSaveChangeInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        const { userId, form } = this.state;
        const userInfo = {
            name: form.name.value,
            birthday: form.birthday.value,
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
        };
        if (this._isFormValid()) {
            StaffService.updateStaffInfo(userId, userInfo)
                .then((res) => {
                    this.getStaffInfo();
                })
                .catch((err) => {});
        }
        this.setState({
            onEdit: !this.state.onEdit,
        });
    };

    render() {
        const { onEdit, form } = this.state;
        console.log(this.state.form);
        return (
            <div className="staff-details">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Staff Details</h2>
                    </div>
                    <div className="card-body detail-info">
                        <div className="col-sm-12">
                            {AuthService.roleId === "ADMIN" ? (
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
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="row"></div>

                        <div className="detail-content">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Staff name
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
                                            value={form.name.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "name")
                                            }
                                        />
                                    </div>
                                    <FormError
                                        errorMessage={
                                            form.name.err === "*" && form.dirty
                                                ? "Staff name cannot be empty"
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Birthday
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-currency-usd" />
                                            </span>
                                        </div>
                                        <input
                                            type="date"
                                            name="birthday"
                                            required
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={form.birthday.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "email")
                                            }
                                        />
                                    </div>
                                    <FormError
                                        errorMessage={
                                            form.birthday.err === "*" &&
                                            form.dirty
                                                ? "Birthday cannot be empty"
                                                : form.dirty
                                                ? form.birthday.err
                                                : ""
                                        }
                                    />
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
                                                <i className="mdi mdi-security-account-outline" />
                                            </span>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={form.email.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "email")
                                            }
                                        />
                                    </div>
                                    <FormError
                                        errorMessage={
                                            form.email.err === "*" && form.dirty
                                                ? "Email cannot be empty"
                                                : form.dirty
                                                ? form.email.err
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Phone
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            pattern={REGEX_TEL}
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={form.phone.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "phone")
                                            }
                                        />
                                        <FormError
                                            errorMessage={
                                                form.phone.err === "*" &&
                                                form.dirty
                                                    ? "Phone cannot be empty"
                                                    : form.dirty
                                                    ? form.phone.err
                                                    : ""
                                            }
                                        />
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
                                                <i className="mdi mdi-credit-card" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={form.address.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "address")
                                            }
                                        />
                                    </div>
                                    <FormError
                                        errorMessage={
                                            form.address.err === "*" &&
                                            form.dirty
                                                ? "Address cannot be empty"
                                                : form.dirty
                                                ? form.address.err
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Department
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-credit-card" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            disabled
                                            value={form.departmentName.value}
                                            className="form-control"
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
export default StaffDetails;
