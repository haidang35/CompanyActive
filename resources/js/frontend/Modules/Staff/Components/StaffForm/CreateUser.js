import React, { Component } from "react";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";

class CreateUser extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                birthday: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                department_id: "",
            }),
        };
    }

    componentDidMount = () => {
        this._fillForm({
            name: "",
            birthday: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            department_id: "",
        });
    };

    onSubmitForm = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                name: form.name.value,
                birthday: form.birthday.value,
                email: form.email.value,
                phone: form.phone.value,
                password: form.password.value,
                address: form.address.value,
            };
            this.props.onSubmitForm(data);
            this._fillForm({
                name: "",
                birthday: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                department_id: "",
                dirty: false,
            });
        }
    };

    render() {
        const {
            name,
            birthday,
            email,
            phone,
            address,
            password,
            department_id,
            dirty,
        } = this.state.form;
        return (
            <div>
                <div
                    className="modal fade"
                    id="exampleModalForm"
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
                                    Create a new user
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
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={name.value}
                                            className="form-control"
                                            placeholder="Full name"
                                            onChange={(ev) =>
                                                this._setValue(ev, "name")
                                            }
                                        />
                                        {dirty && name.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Full name cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Bithday
                                        </label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            className="form-control"
                                            required
                                            placeholder="birthday"
                                            value={birthday.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "birthday")
                                            }
                                        />
                                        {dirty && birthday.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Birthday cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            rows={5}
                                            value={email.value}
                                            placeholder="Email"
                                            onChange={(ev) =>
                                                this._setValue(ev, "email")
                                            }
                                        ></input>
                                        {dirty && email.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Email cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            rows={5}
                                            value={password.value}
                                            placeholder="Password"
                                            onChange={(ev) =>
                                                this._setValue(ev, "password")
                                            }
                                        ></input>
                                        {dirty && email.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Email cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            required
                                            id="exampleInputPassword1"
                                            rows={5}
                                            value={phone.value}
                                            placeholder="Phone"
                                            onChange={(ev) =>
                                                this._setValue(ev, "phone")
                                            }
                                        ></input>
                                        {dirty && phone.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Phone cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
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
                                            value={address.value}
                                            placeholder="Address"
                                            onChange={(ev) =>
                                                this._setValue(ev, "address")
                                            }
                                        ></textarea>
                                        {dirty && address.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Address cannot be empty"
                                                }
                                            />
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
                                    data-dismiss="modal"
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

export default CreateUser;
