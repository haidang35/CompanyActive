import React, { Component } from "react";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import Pagination from "../../Shared/Pagination/Pagination";
import AppointmentService from "./Shared/AppointmentService";

class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentList: [],
            page: 1,
            rowsPerPage: 20,
            message: "",
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.getAppointmentList();
    }

    getAppointmentList = () => {
        AppointmentService.getAllAppointment()
            .then((res) => {
                this.setState({
                    appointmentList: res.data,
                });
            })
            .catch((err) => {});
    };

    onChangePage = (page) => {
        this.setState({ page });
    };

    render() {
        const { appointmentList, page, rowsPerPage } = this.state;
        let loop = 1;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Appointment List</h2>
                    </div>

                    <div className="card-body">
                        <AlertSuccess message={this.state.message} />
                        <AlertDanger message={this.state.errorMessage} />
                        <div className="btn-group-list">
                            <button
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#exampleModalForm"
                            >
                                Add new appointment
                            </button>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Appointment Title</th>
                                    <th scope="col">Date Time</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Customers</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentList
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((item) => {
                                        return (
                                            <tr>
                                                <td>{loop++}</td>
                                                <td>
                                                    {item.appointment_title}
                                                </td>
                                                <td>{item.appointment_time}</td>
                                                <td>{item.appointment_desc}</td>
                                                <td>
                                                    <div class="btn-control">
                                                        {item.appointment_status ===
                                                        1 ? (
                                                            <button className="btn btn-sm btn-success">
                                                                Done
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-warning">
                                                                Pending
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td>
                                                    <div className="btn-control">
                                                        <button className="btn btn-primary">
                                                            View
                                                        </button>
                                                        <button className="btn btn-danger">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <div style={{ marginTop: "45px" }}>
                            <Pagination
                                data={this.state.appointmentList}
                                page={this.state.page}
                                rowsPerPage={this.state.rowsPerPage}
                                onChangePage={this.onChangePage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentList;
