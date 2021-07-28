import React, { Component } from "react";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import Pagination from "../../Shared/Pagination/Pagination";
import AppointmentService from "./Shared/AppointmentService";
import { Link } from "react-router-dom";
import AddNewAppointment from "./Components/AppointmentForm/AddNewAppointment";
import AuthService from "../../Shared/AuthService/AuthService";
import LoadingEffect from "../../Shared/Loading/LoadingEffect";
class AppointmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentList: [],
            page: 1,
            rowsPerPage: 20,
            message: "",
            errorMessage: "",
            searchValue: "",
            onSearch: false,
            scopeStatus: "",
            totalData: "",
            onLoad: false
        };
    }

    componentWillMount() {
        if (AuthService.roleId === "ADMIN") {
            this.getAppointmentList();
        } else if(AuthService.roleId === "USER") {
            this.getAppointmentStaff();
        }
    }

    getAppointmentList = () => {
        AppointmentService.getAllAppointment().then((res) => {
            this.setState({
                appointmentList: res.data.data,
                totalData: res.data.total,
            });
        });
    };


    getAppointmentStaff = () => {
        AppointmentService.getAppointmentStaff(AuthService.userId).then(
            (res) => {
                if (res.data.length < 20) {
                    this.setState({
                        page: 0,
                        rowsPerPage: 20,
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
        const data = {
            page,
            search_value: this.state.searchValue,
            status: this.state.scopeStatus,
        };
        AppointmentService.changePageAppointment(data).then((res) => {
            this.setState({
                appointmentList: res.data.data,
            });
        });
    };

    addNewAppointment = (data) => {
        this.setState({
            onLoad: true
        });
        AppointmentService.createAppointment(data)
            .then((res) => {
                this.getAppointmentList();
                this.setState({
                    message: `Create a new appointment ${res.data.appointment_title} successful !!`,
                    onLoad: false
                });
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Create new appointment failed !!",
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
        const { searchValue, scopeStatus } = this.state;
        const data = {
            search_value: searchValue,
            status: scopeStatus,
        };
        AppointmentService.scopeAppointment(data).then((res) => {
            this.setState({
                appointmentList: res.data.data,
                totalData: res.data.total,
            });
        });
    };

    handleChangeStatus = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        let {
            appointmentList,
            page,
            rowsPerPage,
            searchValue,
            onSearch,
            scopeStatus,
        } = this.state;
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
                        <LoadingEffect onLoad={this.state.onLoad} title={"Creating appointment"} />
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
                                                placeholder="Search title, datetime ..."
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
                                            name="scopeStatus"
                                            style={{ fontSize: "16px" }}
                                            value={this.state.scopeStatus}
                                            onChange={this.handleChangeStatus}
                                        >
                                            <option
                                                style={{ fontSize: "16px" }}
                                                value=""
                                            >
                                                Select status
                                            </option>
                                            <option value={0}>Pending</option>
                                            <option value={1}>Done</option>
                                            <option value={2}>Rejected</option>
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
                                {appointmentList.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{loop++}</td>
                                            <td>{item.appointment_title}</td>
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
                                                {item.customer.customer_name}
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
                                data={this.state.totalData}
                                page={page}
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
