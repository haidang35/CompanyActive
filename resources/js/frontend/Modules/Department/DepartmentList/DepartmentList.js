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

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentList: [],
            message: "",
            errorMessage: "",
            page: 1,
            rowsPerPage: 20,
        };
    }

    componentDidMount() {
        this.getDepartmentList();
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

    render() {
        const { departmentList, page, rowsPerPage } = this.state;
        let loop = 0;
        console.log(
            "render",
            departmentList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            )
        );
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
