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

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listStaff: [],
            message: "",
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


    render() {
        const {
            listStaff,
            page,
            rowsPerPage
        } = this.state;
        let loop = 1;
        const elmStaff = listStaff
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
                return (
                    <tr key={item.id}>
                        <td scope="row">{loop++}</td>
                        <td>{item.name}</td>
                        <td>{item.birthday}</td>
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
                                <button
                                    className="btn btn-danger"
                                    data-toggle="modal"
                                    data-target={`#modalConfirm${item.id}`}
                                >
                                    Delete
                                </button>
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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Staff Name</th>
                                    <th scope="col">Birthday</th>
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
