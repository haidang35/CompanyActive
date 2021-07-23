import React, { Component } from "react";
import "./Header.scss";
class Header extends Component {
    constructor(props) {
        super(props);
    }

    showDropdownUserMenu = () => {
        console.log("hello");
        document
            .getElementById("dropdown-user-menu")
            .classList.toggle("active-dropdown");
    };

    logout = () => {
        localStorage.setItem("userId", null);
        this.goTo("login");
    };

    goTo(url = "") {
        url = window.location.origin + "/" + url;
        window.location.replace(url);
    }

    render() {
        document.onclick = function (event) {
            const dropdown = document.getElementById("dropdown-user-menu");
            if (
                event.target.id !== "dropdown-user-menu" &&
                event.target.id !== "user-menu"
            ) {
                console.log("hello");
                if (dropdown.classList.contains("active-dropdown")) {
                    dropdown.classList.remove("active-dropdown");
                }
            }
        };
        return (
            <div>
                <header className="main-header " id="header">
                    <nav className="navbar navbar-static-top navbar-expand-lg">
                        {/* Sidebar toggle button */}
                        <button id="sidebar-toggler" className="sidebar-toggle">
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                        {/* search form */}
                        <div className="search-form d-none d-lg-inline-block">
                            <div className="input-group">
                                <button
                                    type="button"
                                    name="search"
                                    id="search-btn"
                                    className="btn btn-flat"
                                >
                                    <i className="mdi mdi-magnify" />
                                </button>
                                <input
                                    type="text"
                                    name="query"
                                    id="search-input"
                                    className="form-control"
                                    placeholder="'button', 'chart' etc."
                                    autoFocus
                                    autoComplete="off"
                                />
                            </div>
                            <div id="search-results-container">
                                <ul id="search-results" />
                            </div>
                        </div>
                        <div className="navbar-right ">
                            <ul className="nav navbar-nav">
                                {/* Github Link Button */}
                                <li className="github-link mr-3"></li>
                                <li className="dropdown notifications-menu">
                                    <button
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                    >
                                        <i className="mdi mdi-bell-outline" />
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li className="dropdown-header">
                                            You have 5 notifications
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-account-plus" />{" "}
                                                New user registered
                                                <span className=" font-size-12 d-inline-block float-right">
                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                    10 AM
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-account-remove" />{" "}
                                                User deleted
                                                <span className=" font-size-12 d-inline-block float-right">
                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                    07 AM
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-chart-areaspline" />{" "}
                                                Sales report is ready
                                                <span className=" font-size-12 d-inline-block float-right">
                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                    12 PM
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-account-supervisor" />{" "}
                                                New client
                                                <span className=" font-size-12 d-inline-block float-right">
                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                    10 AM
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="mdi mdi-server-network-off" />{" "}
                                                Server overloaded
                                                <span className=" font-size-12 d-inline-block float-right">
                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                    05 AM
                                                </span>
                                            </a>
                                        </li>
                                        <li className="dropdown-footer">
                                            <a className="text-center" href="#">
                                                {" "}
                                                View All{" "}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                {/* User Account */}
                                <li className="dropdown user-menu">
                                    <button
                                        id="user-menu"
                                        onClick={this.showDropdownUserMenu}
                                        className="dropdown-toggle nav-link"
                                    >
                                        <img
                                            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                                            className="user-image"
                                            alt="User Image"
                                        />
                                        <span className="d-none d-lg-inline-block">
                                            Abdus Salam
                                        </span>
                                    </button>
                                    <ul
                                        id="dropdown-user-menu"
                                        className="dropdown-menu dropdown-menu-right"
                                    >
                                        <li className="dropdown-header">
                                            <img
                                                src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
                                                className="img-circle"
                                                alt="User Image"
                                            />
                                            <div className="d-inline-block">
                                                Abdus Salam{" "}
                                                <small className="pt-1">
                                                    abdus@gmail.com
                                                </small>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="profile.html">
                                                <i className="mdi mdi-account" />{" "}
                                                My Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="email-inbox.html">
                                                <i className="mdi mdi-email" />{" "}
                                                Message
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <i className="mdi mdi-diamond-stone" />{" "}
                                                Projects{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                {" "}
                                                <i className="mdi mdi-settings" />{" "}
                                                Account Setting{" "}
                                            </a>
                                        </li>
                                        <li className="dropdown-footer">
                                            <a
                                                onClick={this.logout}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {" "}
                                                <i className="mdi mdi-logout" />{" "}
                                                Log Out{" "}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;
