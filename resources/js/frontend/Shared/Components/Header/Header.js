import React, { Component } from "react";
import "./Header.scss";
import NotificationService from "../../../Shared/NotificationService/NotificationService";
import AuthService from "../../../Shared/AuthService/AuthService";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationList: [],
            noticeRealtime: [],
        };
    }

    componentDidMount = () => {
        this.getNotifications();
    };

    getNotifications = () => {
        NotificationService.getNotificationUser(AuthService.userId).then(
            (res) => {
                this.setState({
                    notificationList: res.data,
                });
            }
        );
    };

    showDropdownUserMenu = () => {
        document
            .getElementById("dropdown-user-menu")
            .classList.toggle("active-dropdown");
    };

    showDropdownNotice = () => {
        document
            .getElementById("dropdown-notice")
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

    bindDataRealtime = (data) => {
        if (data.message.staff_id === AuthService.userId) {
            const { noticeRealtime } = this.state;
            let  notices  = [];
            notices.push(data);
            this.setState({noticeRealtime: notices });
        }
    };

    render() {
        const { notificationList } = this.state;
        const dropdown = document.getElementById("dropdown-user-menu");
        document.onclick = function (event) {
            if (
                event.target.id !== "dropdown-user-menu" &&
                event.target.id !== "user-menu"
            ) {
                if (dropdown.classList.contains("active-dropdown")) {
                    dropdown.classList.remove("active-dropdown");
                }
            }
        };
        const pusher = new Pusher("22c1e3e8a080c533ca41", {
            cluster: "ap1",
            encrypted: true,
        });
        const channel = pusher.subscribe("notify");
        channel.bind("receive-notify", this.bindDataRealtime);
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
                                        id="btn-dropdown-notice"
                                        onClick={this.showDropdownNotice}
                                        className="dropdown-toggle"
                                    >
                                        <i className="mdi mdi-bell-outline" />
                                    </button>
                                    <ul
                                        id="dropdown-notice"
                                        className="dropdown-menu dropdown-menu-right"
                                        style={{
                                            width: "500px",
                                        }}
                                    >
                                        <li className="dropdown-header">
                                            You have 5 notifications
                                        </li>
                                        {this.state.noticeRealtime.map(
                                            (item) => {
                                                return (
                                                    <li>
                                                        <Link>
                                                            <div className="row">
                                                                <div className="col-sm-1">
                                                                    <i
                                                                        style={{
                                                                            fontSize:
                                                                                "20px",
                                                                        }}
                                                                        className="mdi mdi-account-plus"
                                                                    />{" "}
                                                                </div>
                                                                <div className="col-sm-11">
                                                                    <span
                                                                        style={{
                                                                            fontSize:
                                                                                "16px",
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        {
                                                                           item.message.body
                                                                        }
                                                                    </span>

                                                                    <div
                                                                        style={{
                                                                            fontSize:
                                                                                "14px",
                                                                        }}
                                                                    >
                                                                        <i className="mdi mdi-clock-outline" />{" "}
                                                                       
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                        {notificationList.map((item) => {
                                            return (
                                                <li key={item.id}>
                                                    <Link>
                                                        <div className="row">
                                                            <div className="col-sm-1">
                                                                <i
                                                                    style={{
                                                                        fontSize:
                                                                            "20px",
                                                                    }}
                                                                    className="mdi mdi-account-plus"
                                                                />{" "}
                                                            </div>
                                                            <div className="col-sm-11">
                                                                <span
                                                                    style={{
                                                                        fontSize:
                                                                            "16px",
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    {
                                                                        item
                                                                            .data
                                                                            .appoint
                                                                            .body
                                                                    }
                                                                </span>

                                                                <div
                                                                    style={{
                                                                        fontSize:
                                                                            "14px",
                                                                    }}
                                                                >
                                                                    <i className="mdi mdi-clock-outline" />{" "}
                                                                    {
                                                                        item.created_at
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })}

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
                                            {AuthService.userInfo.name}
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
                                            {AuthService.userInfo.name}
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
