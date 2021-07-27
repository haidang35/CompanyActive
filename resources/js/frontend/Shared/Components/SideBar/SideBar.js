import React, { Component } from "react";
import { BrowserRouter, HashRouter, Link } from "react-router-dom";
import "./SideBar.scss";
import AuthService, { roleId } from "../../AuthService/AuthService";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
        this.getRoleId();
    }

    getRoleId = () => {
        AuthService.getUserInfo().then((res) => {
            this.setState({
                role: res.data.role
            });
        })
    }

    render() {
        const { role } = this.state;
        const { userInfo, roleId } = AuthService;
        // const { department } = userInfo;
        // console.log(Object.keys(department));
        return (
            <div>
                <aside className="left-sidebar bg-sidebar">
                    <div id="sidebar" className="sidebar sidebar-with-footer">
                        <div className="app-brand">
                            <a href="/index.html">
                                <svg
                                    className="brand-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid"
                                    width={30}
                                    height={33}
                                    viewBox="0 0 30 33"
                                >
                                    <g fill="none" fillRule="evenodd">
                                        <path
                                            className="logo-fill-blue"
                                            fill="#7DBCFF"
                                            d="M0 4v25l8 4V0zM22 4v25l8 4V0z"
                                        />
                                        <path
                                            className="logo-fill-white"
                                            fill="#FFF"
                                            d="M11 4v25l8 4V0z"
                                        />
                                    </g>
                                </svg>
                                <span className="brand-name">
                                    Company Active
                                </span>
                            </a>
                        </div>
                        {/* begin sidebar scrollbar */}

                        <div className="sidebar-scrollbar">
                            {/* sidebar menu */}
                            <ul className="nav sidebar-inner" id="sidebar-menu">
                                {roleId === "ADMIN" ? (
                                    <li>
                                        <Link to="/app/departments">
                                            <i className="mdi mdi-chart-pie" />
                                            <span className="nav-text">
                                                Departments
                                            </span>{" "}
                                        </Link>
                                    </li>
                                ) : (
                                    ""
                                )}

                                <li>
                                    <Link to={`/app/departments/${userInfo.department_id}`}>
                                        <i className="mdi mdi-chart-pie" />
                                        <span className="nav-text">
                                            Department
                                        </span>{" "}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/app/staffs"}>
                                        <i className="mdi mdi-chart-pie" />
                                        <span className="nav-text">
                                            Staffs
                                        </span>{" "}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/app/customers"}>
                                        <i className="mdi mdi-chart-pie" />
                                        <span className="nav-text">
                                            Customers
                                        </span>{" "}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/app/appointments"}>
                                        <i className="mdi mdi-chart-pie" />
                                        <span className="nav-text">
                                            Appointments
                                        </span>{" "}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/app/missions"}>
                                        <i className="mdi mdi-chart-pie" />
                                        <span className="nav-text">
                                            Missions
                                        </span>{" "}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <hr className="separator" />
                        <div className="sidebar-footer">
                            <div className="sidebar-footer-content">
                                <h6 className="text-uppercase">
                                    Cpu Uses{" "}
                                    <span className="float-right">40%</span>
                                </h6>
                                <div className="progress progress-xs">
                                    <div
                                        className="progress-bar active"
                                        style={{ width: "40%" }}
                                        role="progressbar"
                                    />
                                </div>
                                <h6 className="text-uppercase">
                                    Memory Uses{" "}
                                    <span className="float-right">65%</span>
                                </h6>
                                <div className="progress progress-xs">
                                    <div
                                        className="progress-bar progress-bar-warning"
                                        style={{ width: "65%" }}
                                        role="progressbar"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}

export default SideBar;
