import React, { Component } from "react";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import Pagination from "../../Shared/Pagination/Pagination";
import AppointmentService from "./Shared/AppointmentService";
import { Link } from "react-router-dom";
import AddNewAppointment from "./Components/AppointmentForm/AddNewAppointment";
import AuthService from "../../Shared/AuthService/AuthService";
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
        if (AuthService.roleId === "ADMIN") {
            this.getAppointmentList();
        } else {
            this.getAppointmentStaff();
        }
    }

    getAppointmentList = () => {
        AppointmentService.getAllAppointment().then((res) => {
            this.setState({
                appointmentList: res.data,
            });
        });
    };

    getAppointmentStaff = () => {
        AppointmentService.getAppointmentStaff(AuthService.userId).then(
            (res) => {
                if((res.data).length < 20) {
                    this.setState({
                        page: 0,
                        rowsPerPage: 20
                    });
                }
                this.setState({
                    appointmentList: res.data,
                });
            }
        );
    };

    onChangePage = (page) => {
        this.setState({ page });
    };

    addNewAppointment = (data) => {
        AppointmentService.createAppointment(data)
            .then((res) => {
                this.getAppointmentList();
                this.setState({
                    message: `Create a new appointment ${res.data.appointment_title} successful !!`,
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Create new appointment failed !!",
                });
            });
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
                        {AuthService.roleId === "ADMIN" ? (
                            <div className="btn-group-list">
                                <button
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#addNewAppointment"
                                >
                                    Add new appointment
                                </button>
                            </div>
                        ) : (
                            ""
                        )}

                        <AddNewAppointment
                            onSubmitForm={this.addNewAppointment}
                        />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Appointment Title</th>
                                    <th scope="col">Date Time</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Customer</th>
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
                                            <tr key={item.id}>
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
                                                        ) : item.appointment_status ===
                                                          0 ? (
                                                            <button className="btn btn-sm btn-warning">
                                                                Pending
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-danger">
                                                                Rejected
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    {
                                                        item.customer
                                                            .customer_name
                                                    }
                                                </td>
                                                <td>
                                                    <div className="btn-control">
                                                        <Link
                                                            to={`/app/appointments/${item.id}`}
                                                        >
                                                            <button className="btn btn-primary">
                                                                View
                                                            </button>
                                                        </Link>

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
