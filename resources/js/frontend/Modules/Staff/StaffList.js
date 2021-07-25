import React, { Component } from "react";
import axios from "axios";
import { goTo } from "../../Shared/Redirect/Redirect";
import StaffService from "./Shared/StaffService";
import ModalConfirm from "../../Shared/Modal/ModalConfirm";
import { Modal } from "bootstrap";
import ModalNotice from "../../Shared/Modal/ModalNotice";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import Pagination from "../../Shared/Pagination/Pagination";
import { list } from "postcss";
import CreateUser from "./Components/StaffForm/CreateUser";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import AuthService from "../../Shared/AuthService/AuthService";

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStaff: [],
            message: "",
            errorMessage: "",
            page: 1,
            rowsPerPage: 20,
            loop: 1,
            totalPage: 1,
            lastFirstGroupPage: 3,
            firstLastGroupPage: 0,
        };
    }

    componentDidMount() {
        this.getListStaff();
    }

    getListStaff = () => {
        StaffService.getAllStaff()
            .then((res) => {
                this.setState({
                    listStaff: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    viewStaffDetails = (staffId) => {
        goTo(`app/staffs/${staffId}`);
    };

    onDeleteStaff = (staffId) => {
        StaffService.deleteStaff(staffId)
            .then((res) => {
                this.getListStaff();
                this.setState({
                    message: `Delete staff ${res.data.name} successfully !!`,
                });
            })
            .catch((err) => {});
    };

    onChangePage = (page) => {
        this.setState({
            page: page,
        });
    };

    onCreateNewUser = (data) => {
        StaffService.createNewStaff(data)
            .then((res) => {
                this.getListStaff();
                this.setState({
                    message: `Create a new staff : ${res.data.name} successfully !!`,
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Create new staff failed !!",
                });
            });
    };

    render() {
        const { listStaff, page, rowsPerPage } = this.state;
        let loop = 1;
        const elmStaff = listStaff
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
                let departmentName = item.department.department_name;
                return (
                    <tr key={item.id}>
                        <td scope="row">{loop++}</td>
                        <td>{item.name}</td>
                        <td>{item.birthday}</td>
                        <td>{item.department.department_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>
                            <div className="btn-control">
                                <button
                                    onClick={() =>
                                        this.viewStaffDetails(item.id)
                                    }
                                    className="btn btn-primary"
                                >
                                    View
                                </button>
                                {AuthService.roleId === "ADMIN" ? (
                                    <button
                                        className="btn btn-danger"
                                        data-toggle="modal"
                                        data-target={`#modalConfirm${item.id}`}
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <ModalConfirm
                                answer={this.onDeleteStaff}
                                confirmId={item.id}
                                userInfo={item}
                                message={`Confirm delete staff ${item.name} ?`}
                            />
                        </td>
                    </tr>
                );
            });
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>List staff</h2>
                    </div>

                    <div className="card-body">
                        <AlertSuccess message={this.state.message} />
                        <AlertDanger message={this.state.errorMessage} />
                        {AuthService.roleId === "ADMIN" ? (
                            <div className="btn-group-list">
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalForm"
                                >
                                    Create new user
                                </button>
                            </div>
                        ) : (
                            ""
                        )}

                        <CreateUser onSubmitForm={this.onCreateNewUser} />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Staff Name</th>
                                    <th scope="col">Birthday</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Address</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{elmStaff}</tbody>
                        </table>
                        <div>
                            <Pagination
                                data={this.state.listStaff}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onChangePage={this.onChangePage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Staff;
