import React, {Component} from 'react';
import DepartmentService from "../../Shared/DepartmentService";
import "./DepartmentInfo.scss";
import FormError from "../../../../Shared/Form/FormError";

class DepartmentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentId: "",
            onEdit: false,
            departmentName: {
                value: "",
                err: "",
                isValid: true
            },
            departmentCode: {
                value: "",
                err: "",
                isValid: true
            },
            pic: {
                value: "",
                err: "",
                isValid: true
            },
            departmentDesc: {
                value: "",
                err: "",
                isValid: true
            },
            staffs: []

        }
    }

    componentDidMount() {
        this.getDepartmentInfo();
    }

    getDepartmentInfo = async () => {
        let { departmentId, departmentName, departmentCode, pic, departmentDesc, staffs } =this.state;
        await DepartmentService.getOneDepartment(1)
            .then((res) => {
                departmentId = res.data.department_id;
                departmentName.value = res.data.department_name;
                departmentCode.value = res.data.department_code;
                pic.value = res.data.department_pic;
                departmentDesc.value = res.data.department_desc;
                staffs = res.data.staff;
                this.setState({
                  departmentId, departmentName, departmentCode, pic, departmentDesc, staffs
                });
                this.props.getDepartmentId(departmentId);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onEditInfo = () => {
        this.setState({
            onEdit: !this.state.onEdit
        })
    }

     validateInput = (type, checkingText) => {
        if(type) {
            if(checkingText === "") {
                return {isInputValid: false, errorMessage: "Field must be required"}
            }else {
                return {isInputValid: true, errorMessage: ""}

            }
        }
        else {
            const regexp = /^\d{10,11}$/;
            const checkingResult = regexp.exec(checkingText);
            if (checkingResult !== null) {
                return { isInputValid: true,
                    errorMessage: ''};
            } else {
                return { isInputValid: false,
                    errorMessage: 'Số điện thoại phải có 10 - 11 chữ số.'};
            }
        }

    }

    handleChangeInfo = (ev) => {
        const {name, value} = ev.target;
        const newState = {...this.state[name]}
        newState.value = value;
        this.setState({[name]: newState});
    }

    handleValidateInput = (ev) => {
        const { name } = ev.target;
        const { isInputValid, errorMessage } = this.validateInput(name, this.state[name].value);
        const newState = {...this.state[name]};
        newState.isValid = isInputValid;
        newState.err = errorMessage;
        this.setState({[name]: newState});
    }

    onSaveChange = () => {
        const { departmentId, departmentName, departmentCode, pic, departmentDesc } = this.state;
        const data = {
            department_name: departmentName.value,
            department_code: departmentCode.value,
            department_pic: pic.value,
            department_desc: departmentDesc.value,
        }
        DepartmentService.updateDepartment(departmentId, data)
            .then((res) => {
                console.log("Update successfully !!");
                this.getDepartmentInfo();
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({
            onEdit: false
        });
    }

    render() {
        const {  onEdit, departmentName, departmentCode, pic, departmentDesc, staffs } = this.state;
        return (
            <div className="department">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Department Info </h2>
                    </div>

                    <div className="card-body">
                        <div className="btn-control-info">
                            {
                                onEdit
                                    ? (
                                        <div>
                                            <button onClick={this.onSaveChange} className="mb-1 btn btn-warning">
                                                <i className=" mdi mdi-star-outline mr-1" /> Save
                                            </button>
                                            <button onClick={this.onEditInfo} className="mb-1 btn btn-danger" style={{marginLeft: "10px"}}>
                                                <i className=" mdi mdi-star-outline mr-1" /> Cancel
                                            </button>
                                        </div>

                                    )
                                    : (<button onClick={this.onEditInfo} className="mb-1 btn btn-primary">
                                         <i className=" mdi mdi-star-outline mr-1" /> Edit
                                        </button>)
                            }

                        </div>
                        <form>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Department Name
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
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
                                    <FormError isHidden={this.state.departmentName.isValid} errorMessage={this.state.departmentName.err}  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Code
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
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
                                    <FormError isHidden={this.state.departmentCode.isValid} errorMessage={this.state.departmentCode.err}  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Manager
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
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
                                    <FormError isHidden={this.state.pic.isValid} errorMessage={this.state.pic.err}  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Staff
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
                                  </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="pic"
                                        className="form-control"
                                        disabled={!onEdit}
                                        value={staffs.length}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Description
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
                                  </span>
                                    </div>
                                    <textarea
                                        disabled={!onEdit}
                                        name="departmentDesc"
                                        className="form-control"
                                        value= {departmentDesc.value}
                                        onBlur={this.handleValidateInput}
                                        onChange={this.handleChangeInfo}
                                    />
                                    <FormError isHidden={this.state.departmentDesc.isValid} errorMessage={this.state.departmentDesc.err}  />
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
