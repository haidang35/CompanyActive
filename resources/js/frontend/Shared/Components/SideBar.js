
import React, {Component} from 'react';
import {BrowserRouter, HashRouter, Link} from "react-router-dom";

class SideBar extends Component {

    render() {
        return(
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
                                    <span className="brand-name">Sleek Dashboard</span>
                                </a>
                            </div>
                            {/* begin sidebar scrollbar */}

                            <div className="sidebar-scrollbar">
                                {/* sidebar menu */}
                                <ul className="nav sidebar-inner" id="sidebar-menu">

                                    <li >
                                        <Link to={'/departments'}>
                                            <i className="mdi mdi-chart-pie" />
                                            <span className="nav-text">Departments</span> <b className="caret" />
                                        </Link>

                                    </li>
                                    <li className="has-sub">
                                        <a
                                            className="sidenav-item-link"
                                            href="javascript:void(0)"
                                            data-toggle="collapse"
                                            data-target="#pages"
                                            aria-expanded="false"
                                            aria-controls="pages"
                                        >
                                            <i className="mdi mdi-image-filter-none" />
                                            <span className="nav-text">Pages</span> <b className="caret" />
                                        </a>
                                        <ul className="collapse" id="pages" data-parent="#sidebar-menu">
                                            <div className="sub-menu">
                                                <li>
                                                    <a className="sidenav-item-link" href="user-profile.html">
                                                        <span className="nav-text">User Profile</span>
                                                    </a>
                                                </li>
                                                <li className="has-sub">
                                                    <a
                                                        className="sidenav-item-link"
                                                        href="javascript:void(0)"
                                                        data-toggle="collapse"
                                                        data-target="#authentication"
                                                        aria-expanded="false"
                                                        aria-controls="authentication"
                                                    >
                                                        <span className="nav-text">Authentication</span>{" "}
                                                        <b className="caret" />
                                                    </a>
                                                    <ul className="collapse" id="authentication">
                                                        <div className="sub-menu">
                                                            <li>
                                                                <a href="sign-in.html">Sign In</a>
                                                            </li>
                                                            <li>
                                                                <a href="sign-up.html">Sign Up</a>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </li>
                                                <li className="has-sub">
                                                    <a
                                                        className="sidenav-item-link"
                                                        href="javascript:void(0)"
                                                        data-toggle="collapse"
                                                        data-target="#others"
                                                        aria-expanded="false"
                                                        aria-controls="others"
                                                    >
                                                        <span className="nav-text">Others</span>{" "}
                                                        <b className="caret" />
                                                    </a>
                                                    <ul className="collapse" id="others">
                                                        <div className="sub-menu">
                                                            <li>
                                                                <a href="invoice.html">invoice</a>
                                                            </li>
                                                            <li>
                                                                <a href="error.html">Error</a>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </li>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="has-sub">
                                        <a
                                            className="sidenav-item-link"
                                            href="javascript:void(0)"
                                            data-toggle="collapse"
                                            data-target="#documentation"
                                            aria-expanded="false"
                                            aria-controls="documentation"
                                        >
                                            <i className="mdi mdi-book-open-page-variant" />
                                            <span className="nav-text">Documentation</span>{" "}
                                            <b className="caret" />
                                        </a>
                                        <ul
                                            className="collapse"
                                            id="documentation"
                                            data-parent="#sidebar-menu"
                                        >
                                            <div className="sub-menu">
                                                <li className="section-title">Getting Started</li>
                                                <li>
                                                    <a className="sidenav-item-link" href="introduction.html">
                                                        <span className="nav-text">Introduction</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="sidenav-item-link" href="setup.html">
                                                        <span className="nav-text">Setup</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="sidenav-item-link" href="customization.html">
                                                        <span className="nav-text">Customization</span>
                                                    </a>
                                                </li>
                                                <li className="section-title">Layouts</li>
                                                <li className="has-sub">
                                                    <a
                                                        className="sidenav-item-link"
                                                        href="javascript:void(0)"
                                                        data-toggle="collapse"
                                                        data-target="#headers"
                                                        aria-expanded="false"
                                                        aria-controls="headers"
                                                    >
                                                        <span className="nav-text">Layout Headers</span>{" "}
                                                        <b className="caret" />
                                                    </a>
                                                    <ul className="collapse" id="headers">
                                                        <div className="sub-menu">
                                                            <li>
                                                                <a href="header-fixed.html">Header Fixed</a>
                                                            </li>
                                                            <li>
                                                                <a href="header-static.html">Header Static</a>
                                                            </li>
                                                            <li>
                                                                <a href="header-light.html">Header Light</a>
                                                            </li>
                                                            <li>
                                                                <a href="header-dark.html">Header Dark</a>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </li>
                                                <li className="has-sub">
                                                    <a
                                                        className="sidenav-item-link"
                                                        href="javascript:void(0)"
                                                        data-toggle="collapse"
                                                        data-target="#sidebar-navs"
                                                        aria-expanded="false"
                                                        aria-controls="sidebar-navs"
                                                    >
                                                        <span className="nav-text">layout Sidebars</span>{" "}
                                                        <b className="caret" />
                                                    </a>
                                                    <ul className="collapse" id="sidebar-navs">
                                                        <div className="sub-menu">
                                                            <li>
                                                                <a href="sidebar-open.html">Sidebar Open</a>
                                                            </li>
                                                            <li>
                                                                <a href="sidebar-minimized.html">Sidebar Minimized</a>
                                                            </li>
                                                            <li>
                                                                <a href="sidebar-offcanvas.html">Sidebar Offcanvas</a>
                                                            </li>
                                                            <li>
                                                                <a href="sidebar-with-footer.html">
                                                                    Sidebar With Footer
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="sidebar-without-footer.html">
                                                                    Sidebar Without Footer
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="right-sidebar.html">Right Sidebar</a>
                                                            </li>
                                                        </div>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a className="sidenav-item-link" href="rtl.html">
                                                        <span className="nav-text">RTL Direction</span>
                                                    </a>
                                                </li>
                                            </div>
                                        </ul>
                                    </li>

                                </ul>
                            </div>

                            <hr className="separator" />
                            <div className="sidebar-footer">
                                <div className="sidebar-footer-content">
                                    <h6 className="text-uppercase">
                                        Cpu Uses <span className="float-right">40%</span>
                                    </h6>

                                    <div className="progress progress-xs">
                                        <div
                                            className="progress-bar active"
                                            style={{ width: "40%" }}
                                            role="progressbar"
                                        />
                                    </div>
                                    <h6 className="text-uppercase">
                                        Memory Uses <span className="float-right">65%</span>
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

