import React, { Component } from "react";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";
import DepartmentService from "../../Shared/DepartmentService";

class AddNewDepartment extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                name: "",
                code: "",
                pic: "",
                desc: "",
            }),
            picList: [],
        };
    }

    componentDidMount = () => {
        this.getAllPic();
        this._fillForm({
            name: "",
            code: "",
            pic: 0,
            desc: "",
        });
    };

    getAllPic = () => {
        DepartmentService.getAllPic().then((res) => {
            this.setState({
                picList: res.data,
            });
        });
    };

    onSubmitForm = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        if (this._isFormValid()) {
            const { form } = this.state;
            const data = {
                department_name: form.name.value,
                department_code: form.code.value,
                department_pic: form.pic.value,
                department_desc: form.desc.value,
            };
            this.props.onSubmitForm(data);
            this._fillForm({
                name: "",
                code: "",
                pic: "",
                desc: "",
                dirty: false,
            });
        }
    };

    render() {
        const { name, code, pic, desc, dirty } = this.state.form;
        const { picList } = this.state;
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
                                    Add new department
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
                                            Department Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={name.value}
                                            className="form-control"
                                            placeholder="Department name"
                                            onChange={(ev) =>
                                                this._setValue(ev, "name")
                                            }
                                        />
                                        {dirty && name.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Department name cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Code
                                        </label>
                                        <input
                                            type="text"
                                            name="code"
                                            className="form-control"
                                            required
                                            placeholder="Code"
                                            value={code.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "code")
                                            }
                                        />
                                        {dirty && code.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Code name cannot be empty"
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Pic
                                        </label>
                                        <select
                                            className="form-control"
                                            name="pic"
                                            required
                                            value={pic.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "pic")
                                            }
                                        >
                                            <option value={0}>
                                                Select pic
                                            </option>
                                            {picList.map((item) => {
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {dirty && pic.value === 0 ? (
                                            <FormError errorMessage="Please pick the pic" />
                                        ) : (
                                            ""
                                        )}
                                        {dirty && pic.err === "*" ? (
                                            <FormError errorMessage="Pic name cannot be empty" />
                                        ) : (
                                            ""
                                        )}
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
                                            value={desc.value}
                                            placeholder="Description"
                                            onChange={(ev) =>
                                                this._setValue(ev, "desc")
                                            }
                                        ></textarea>
                                        {dirty && desc.err === "*" ? (
                                            <FormError
                                                errorMessage={
                                                    "Desc cannot be empty"
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

export default AddNewDepartment;
