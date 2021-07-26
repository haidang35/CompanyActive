import React, { Component } from "react";
import Pagination from "../../../Shared/Pagination/Pagination";
import { goTo } from "../../../Shared/Redirect/Redirect";
import AddNewDepartment from "../Components/DepartmentForm/AddNewDepartment";
import DepartmentService from "../Shared/DepartmentService";
import AlertSuccess from "../../../Shared/Alert/AlertSuccess";
import "./DepartmentList.scss";
import ModalNotice from "../../../Shared/Modal/ModalNotice";
import ModalConfirm from "../../../Shared/Modal/ModalConfirm";
import AlertDanger from "../../../Shared/Alert/AlertDanger";
import AuthServicce from "../../../Shared/AuthService/AuthService";
import StaffService from "../../../Modules/Staff/Shared/StaffService";

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentList: [],
            picList: [],
            message: "",
            errorMessage: "",
            page: 1,
            rowsPerPage: 20,
            onSearch: false,
            searchValue: "",
        };
    }

    componentDidMount() {
        this.getDepartmentList();
        this.getAllPic();
    }

    getDepartmentList = async () => {
        await DepartmentService.getAllDepartment()
            .then((res) => {
                this.setState({
                    departmentList: res.data.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getAllPic = () => {
        StaffService.getAllStaff().then((res) => {
            this.setState({
                picList: res.data,
            });
        });
    };

    addNewDepartment = (data) => {
        DepartmentService.addNewDepartment(data)
            .then((res) => {
                this.setState({
                    message: `Add new department ${res.data.department_name} succesfully !!`,
                });
            })
            .catch((err) => {});
    };

    viewDepartmentDetails = (departmentId) => {
        goTo(`app/departments/${departmentId}`);
    };

    onChangePage = (page) => {
        this.setState({
            page: page,
        });
    };

    deleteDepartment = (departmentId) => {
        DepartmentService.deleteDepartment(departmentId)
            .then((res) => {
                this.setState({
                    message: `Delete department ${res.data.department_name} successfully !!`,
                });
                this.getDepartmentList();
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMessage: `Delete department failed !!`,
                });
            });
    };

    handleSearchValue = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
            onSearch: false,
        });
    };

    onScopeSearch = () => {
        this.setState({
            onSearch: true,
            page: 0
        });
        // let { searchValue, departmentList } = this.state;
        // departmentList = departmentList.filter((item) => {
        //     return item.department_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
        // });
        // if(searchValue === "") {
        //     this.setState({
        //         departmentList: departmentListOrg
        //     });
        // }
        // this.setState({departmentList});
    };

    render() {
        let { departmentList, page, rowsPerPage, onSearch, searchValue } =
            this.state;
        let loop = 0;
        if (onSearch) {
            departmentList  = departmentList.filter((item) => {
                return (
                    item.department_name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                );
            });
        }

        const renderDepartmentList = departmentList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
                const staffs = item.staff;
                return (
                    <tr>
                        <td scope="row">{++loop}</td>
                        <td>{item.department_name}</td>
                        <td>{item.department_code}</td>
                        <td>{item.department_pic}</td>
                        <td>{staffs.length}</td>
                        <td>{item.department_desc}</td>
                        <td>
                            <div className="btn-control-department">
                                <button
                                    onClick={() =>
                                        this.viewDepartmentDetails(
                                            item.department_id
                                        )
                                    }
                                    className="btn btn-primary"
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-danger"
                                    data-toggle="modal"
                                    data-target={
                                        staffs.length > 0
                                            ? `#modalNoti${item.department_id}`
                                            : `#modalConfirm${item.department_id}`
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                            {staffs.length > 0 ? (
                                <ModalNotice
                                    title="Warning"
                                    idNotice={item.department_id}
                                    message={`Cannot delete department ${item.department_name}`}
                                />
                            ) : (
                                <ModalConfirm
                                    answer={this.deleteDepartment}
                                    confirmId={item.department_id}
                                    message={`Confirm delete department ${item.department_name}`}
                                />
                            )}
                        </td>
                    </tr>
                );
            });
        return (
            <div className="department-list">
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Department List</h2>
                    </div>

                    <div className="card-body">
                        <AlertSuccess message={this.state.message} />
                        <AlertDanger message={this.state.errorMessage} />
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label
                                            className="sr-only"
                                            htmlFor="inlineFormInputGroupUsername2"
                                        >
                                            Search
                                        </label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="mdi mdi-magnify"></i>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="searchValue"
                                                className="form-control"
                                                id="inlineFormInputGroupUsername2"
                                                placeholder="Search ..."
                                                value={this.state.searchValue}
                                                onChange={
                                                    this.handleSearchValue
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <select
                                            className="form-control"
                                            style={{ fontSize: "16px" }}
                                        >
                                            <option
                                                style={{ fontSize: "16px" }}
                                            >
                                                Select pic
                                            </option>
                                            {this.state.picList.map(
                                                (item) => {
                                                    return (
                                                        <option
                                                            value={item.id}
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                            }}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                    <button
                                        onClick={this.onScopeSearch}
                                        className="btn btn-primary mb-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>

                        {AuthServicce.roleId === "ADMIN" ? (
                            <div className="btn-group-list">
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalForm"
                                >
                                    Add new department
                                </button>
                            </div>
                        ) : (
                            ""
                        )}

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Department name</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">PIC</th>
                                    <th scope="col">Staffs</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>{renderDepartmentList}</tbody>
                        </table>
                        <div style={{ marginTop: "45px" }}>
                            <Pagination
                                data={departmentList}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={this.onChangePage}
                            />
                        </div>
                    </div>
                </div>
                <AddNewDepartment onSubmitForm={this.addNewDepartment} />
            </div>
        );
    }
}
export default DepartmentList;
