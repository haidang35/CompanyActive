import React, { Component } from "react";
import DepartmentService from "../../Shared/DepartmentService";
import "./DepartmentInfo.scss";
import FormError from "../../../../Shared/Form/FormError";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import AuthService from "../../../../Shared/AuthService/AuthService";
import Form from "../../../../Shared/Form/Form";

class DepartmentInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                id: "",
                name: "",
                code: "",
                pic: "",
                desc: "",
            }),
            staffList: [],
            manager: {},
            message: "",
            errorMessage: "",
            onEdit: false,
            staffs: [],
            roleId: "",
        };
    }

    componentDidMount() {
        this.getDepartmentInfo();
    }

    getDepartmentInfo = async () => {
        const { departmentId } = this.props;
        await DepartmentService.getOneDepartment(departmentId)
            .then((res) => {
                this.setState({
                    staffList: res.data.staff,
                    manager: res.data.manager
                });
                this._fillForm({
                    id: res.data.department_id,
                    name: res.data.department_name,
                    code: res.data.department_code,
                    pic: res.data.department_pic,
                    desc: res.data.department_desc,
                });
                this.props.getDepartmentInfo(res.data);
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

    onSaveChange = () => {
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
            DepartmentService.updateDepartment(form.id.value, data)
                .then((res) => {
                    this.getDepartmentInfo();
                    this.setState({
                        message: `Update department info successfull !!`,
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorMessage: `Update department info failed !!`,
                    });
                });
            this.setState({
                onEdit: false,
            });
        }
    };

    render() {
        const { onEdit } = this.state;
        const { name, code, pic, desc, dirty } = this.state.form;
        return (
            <div className="department">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Department Info </h2>
                    </div>

                    <div className="card-body">
                        <div>
                            <AlertSuccess message={this.state.message} />
                            <AlertDanger message={this.state.errorMessage} />
                        </div>
                        {AuthService.roleId === "ADMIN" ? (
                            <div className="btn-control-info">
                                {onEdit ? (
                                    <div>
                                        <button
                                            onClick={this.onSaveChange}
                                            className="mb-1 btn btn-warning"
                                        >
                                            <i className=" mdi mdi-star-outline mr-1" />{" "}
                                            Save
                                        </button>
                                        <button
                                            onClick={this.onEditInfo}
                                            className="mb-1 btn btn-danger"
                                            style={{ marginLeft: "10px" }}
                                        >
                                            <i className=" mdi mdi-star-outline mr-1" />{" "}
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={this.onEditInfo}
                                        className="mb-1 btn btn-primary"
                                    >
                                        <i className=" mdi mdi-star-outline mr-1" />{" "}
                                        Edit
                                    </button>
                                )}
                            </div>
                        ) : (
                            ""
                        )}

                        <form>
                            <div className="form-group">
                                <label
                                    className="text-dark font-weight-medium"
                                    htmlFor
                                >
                                    Department Name
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="mdi mdi-account" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="form-control"
                                        name="departmentName"
                                        value={name.value}
                                        disabled={!onEdit}
                                        onChange={(ev) =>
                                            this._setValue(ev, "name")
                                        }
                                    />
                                    {name.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Department name cannot be empty"
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="text-dark font-weight-medium"
                                    htmlFor
                                >
                                    Code
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="mdi mdi-account" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="code"
                                        required
                                        className="form-control"
                                        disabled={!onEdit}
                                        value={code.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "code")
                                        }
                                    />
                                    {code.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Department code cannot be empty"
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="text-dark font-weight-medium"
                                    htmlFor
                                >
                                    Manager
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="mdi mdi-account" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="pic"
                                        required
                                        className="form-control"
                                        disabled
                                        value={this.state.manager.name}
                                       
                                    />
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="text-dark font-weight-medium"
                                    htmlFor
                                >
                                    Number of staffs
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="mdi mdi-account" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="pic"
                                        disabled
                                        className="form-control"
                                        value={(this.state.staffList).length}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="text-dark font-weight-medium"
                                    htmlFor
                                >
                                    Description
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="mdi mdi-account" />
                                        </span>
                                    </div>
                                    <textarea
                                        disabled={!onEdit}
                                        name="desc"
                                        className="form-control"
                                        value={desc.value}
                                        onChange={(ev) =>
                                            this._setValue(ev, "desc")
                                        }
                                    />
                                     
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default DepartmentInfo;
