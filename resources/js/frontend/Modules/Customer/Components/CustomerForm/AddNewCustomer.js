import React, { Component } from "react";
import { REGEX_TEL } from "../../../../Constances/const";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";

class AddNewCustomer extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
            })
        };
    }

    onSubmitForm = () => {
        this.state.form["dirty"] = true;
        this._validateForm();
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                customer_name: form.name.value,
                customer_email: form.email.value,
                customer_phone: form.phone.value,
                customer_address: form.address.value,
            };
            this.props.onSubmitForm(data);
            this._fillForm({
                name: "",
                email: "",
                phone: "",
                address: "",
                dirty: false,
            });
        }
    };

    render() {
        const { name, email, phone, address, dirty } = this.state.form;
        return (
            <div>
                <div
                    className="modal fade"
                    id="addNewCustomer"
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
                                    Add new customer
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
                                            Customer Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="form-control"
                                            placeholder="Customer name"
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
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            required
                                            placeholder="Email"
                                            value={email.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "email")
                                            }
                                        />
                                        {email.err === "*" && dirty ? (
                                            <FormError errorMessage="Email cannot be empty" />
                                        ) : dirty ? (
                                            <FormError errorMessage={email.err} />
                                        ) : ""}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            pattern={REGEX_TEL}
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            rows={5}
                                            placeholder="Phone number"
                                            value={phone.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "phone")
                                            }
                                        />
                                         {phone.err === "*" && dirty ? (
                                            <FormError errorMessage="Phone cannot be empty" />
                                        ) : dirty ? (
                                            <FormError errorMessage={phone.err} />
                                        ) : ""}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Address
                                        </label>
                                        <textarea
                                            name="address"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            rows={5}
                                            placeholder="Address"
                                            value={address.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "address")
                                            }
                                        ></textarea>
                                         {address.err === "*" && dirty ? (
                                            <FormError errorMessage="Address cannot be empty" />
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
                                    data-dismiss={!this._isFormValid() ? "modal" : ""}
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

export default AddNewCustomer;
