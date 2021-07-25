import React, { Component } from "react";
import DepartmentService from "../../Shared/DepartmentService";
import "./DepartmentInfo.scss";
import FormError from "../../../../Shared/Form/FormError";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import AuthService from '../../../../Shared/AuthService/AuthService';

class DepartmentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentId: "",
            message: "",
            onEdit: false,
            departmentName: {
                value: "",
                err: "",
                isValid: true,
            },
            departmentCode: {
                value: "",
                err: "",
                isValid: true,
            },
            pic: {
                value: "",
                err: "",
                isValid: true,
            },
            departmentDesc: {
                value: "",
                err: "",
                isValid: true,
            },
            staffs: [],
            roleId: ""
        };
    }


    componentDidMount() {
        this.getDepartmentInfo();
    }


    getDepartmentInfo = async () => {
        const { departmentId } = this.props;
        let { departmentName, departmentCode, pic, departmentDesc, staffs } =
            this.state;
        await DepartmentService.getOneDepartment(departmentId)
            .then((res) => {
                departmentName.value = res.data.department_name;
                departmentCode.value = res.data.department_code;
                pic.value = res.data.department_pic;
                departmentDesc.value = res.data.department_desc;
                staffs = res.data.staff;
                this.setState({
                    departmentName,
                    departmentCode,
                    pic,
                    departmentDesc,
                    staffs,
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

    validateInput = (type, checkingText) => {
        if (type) {
            if (checkingText === "") {
                return {
                    isInputValid: false,
                    errorMessage: "Field must be required",
                };
            } else {
                return { isInputValid: true, errorMessage: "" };
            }
        } else {
            const regexp = /^\d{10,11}$/;
            const checkingResult = regexp.exec(checkingText);
            if (checkingResult !== null) {
                return { isInputValid: true, errorMessage: "" };
            } else {
                return {
                    isInputValid: false,
                    errorMessage: "Số điện thoại phải có 10 - 11 chữ số.",
                };
            }
        }
    };

    handleChangeInfo = (ev) => {
        const { name, value } = ev.target;
        const newState = { ...this.state[name] };
        newState.value = value;
        this.setState({ [name]: newState });
    };

    handleValidateInput = (ev) => {
        const { name } = ev.target;
        const { isInputValid, errorMessage } = this.validateInput(
            name,
            this.state[name].value
        );
        const newState = { ...this.state[name] };
        newState.isValid = isInputValid;
        newState.err = errorMessage;
        this.setState({ [name]: newState });
    };

    onSaveChange = () => {
        const {
            departmentId,
            departmentName,
            departmentCode,
            pic,
            departmentDesc,
        } = this.state;
        const data = {
            department_name: departmentName.value,
            department_code: departmentCode.value,
            department_pic: pic.value,
            department_desc: departmentDesc.value,
        };
        DepartmentService.updateDepartment(departmentId, data)
            .then((res) => {
                console.log("Update successfully !!");
                this.getDepartmentInfo();
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({
            onEdit: false,
        });
    };

    render() {
        const {
            onEdit,
            departmentName,
            departmentCode,
            pic,
            departmentDesc,
            staffs,
        } = this.state;
        return (
            <div className="department">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Department Info </h2>
                    </div>

                    <div className="card-body">
                        <div>
                            <AlertSuccess message={this.state.message}/>
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
                                        className="form-control"
                                        name="departmentName"
                                        value={departmentName.value}
                                        disabled={!onEdit}
                                        onChange={this.handleChangeInfo}
                                        onBlur={this.handleValidateInput}
                                    />
                                   
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
                                        name="departmentCode"
                                        className="form-control"
                                        disabled={!onEdit}
                                        value={departmentCode.value}
                                        onBlur={this.handleValidateInput}
                                        onChange={this.handleChangeInfo}
                                    />
                                    
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
                                        className="form-control"
                                        disabled={!onEdit}
                                        value={pic.value}
                                        onBlur={this.handleValidateInput}
                                        onChange={this.handleChangeInfo}
                                    />
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    className="text-dark font-weight-medium"
                                    htmlFor
                                >
                                    Staff
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
                                        value={staffs.length}
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
                                        name="departmentDesc"
                                        className="form-control"
                                        value={departmentDesc.value}
                                        onBlur={this.handleValidateInput}
                                        onChange={this.handleChangeInfo}
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
