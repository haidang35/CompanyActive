
import React, {Component} from 'react';
class HomePage extends Component {
    render() {
        return(
            <div>
                <div className="content">
                    {/* Top Statistics */}
                    <div className="row">
                        <div className="col-xl-3 col-sm-6">
                            <div className="card card-mini mb-4">
                                <div className="card-body">
                                    <h2 className="mb-1">71,503</h2>
                                    <p>Online Signups</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="barChart"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card card-mini  mb-4">
                                <div className="card-body">
                                    <h2 className="mb-1">9,503</h2>
                                    <p>New Visitors Today</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="dual-line"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card card-mini mb-4">
                                <div className="card-body">
                                    <h2 className="mb-1">71,503</h2>
                                    <p>Monthly Total Order</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="area-chart"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card card-mini mb-4">
                                <div className="card-body">
                                    <h2 className="mb-1">9,503</h2>
                                    <p>Total Revenue This Year</p>
                                    <div className="chartjs-wrapper">
                                        <canvas id="line"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-md-12">
                            {/* Sales Graph */}
                            <div className="card card-default" data-scroll-height={675}>
                                <div className="card-header">
                                    <h2>Sales Of The Year</h2>
                                </div>
                                <div className="card-body">
                                    <canvas id="linechart" className="chartjs"/>
                                </div>
                                <div className="card-footer d-flex flex-wrap bg-white p-0">
                                    <div className="col-6 px-0">
                                        <div className="text-center p-4">
                                            <h4>$6,308</h4>
                                            <p className="mt-2">Total orders of this year</p>
                                        </div>
                                    </div>
                                    <div className="col-6 px-0">
                                        <div className="text-center p-4 border-left">
                                            <h4>$70,506</h4>
                                            <p className="mt-2">Total revenue of this year</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-12">
                            {/* Doughnut Chart */}
                            <div className="card card-default" data-scroll-height={675}>
                                <div className="card-header justify-content-center">
                                    <h2>Orders Overview</h2>
                                </div>
                                <div className="card-body">
                                    <canvas id="doChart"/>
                                </div>
                                <a href="#" className="pb-5 d-block text-center text-muted">
                                    <i className="mdi mdi-download mr-2"/> Download overall report
                                </a>
                                <div className="card-footer d-flex flex-wrap bg-white p-0">
                                    <div className="col-6">
                                        <div className="py-4 px-4">
                                            <ul className="d-flex flex-column justify-content-between">
                                                <li className="mb-2">
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#4c84ff"}}
                                                    />
                                                    Order Completed
                                                </li>
                                                <li>
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#80e1c1"}}
                                                    />
                                                    Order Unpaid
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 border-left">
                                        <div className="py-4 px-4 ">
                                            <ul className="d-flex flex-column justify-content-between">
                                                <li className="mb-2">
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#8061ef"}}
                                                    />
                                                    Order Pending
                                                </li>
                                                <li>
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#ffa128"}}
                                                    />
                                                    Order Canceled
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-12">
                            {/* Polar and Radar Chart */}
                            <div className="card card-default">
                                <div className="card-header justify-content-center">
                                    <h2>Sales Overview</h2>
                                </div>
                                <div className="card-body pt-0">
                                    <ul
                                        className="nav nav-pills mb-5 mt-5 nav-style-fill nav-justified"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                id="pills-home-tab"
                                                data-toggle="pill"
                                                href="#pills-home"
                                                role="tab"
                                                aria-controls="pills-home"
                                                aria-selected="true"
                                            >
                                                Sales Status
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="pills-profile-tab"
                                                data-toggle="pill"
                                                href="#pills-profile"
                                                role="tab"
                                                aria-controls="pills-profile"
                                                aria-selected="false"
                                            >
                                                Monthly Sales
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-home"
                                            role="tabpanel"
                                            aria-labelledby="pills-home-tab"
                                        >
                                            <canvas id="polar"/>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="pills-profile-tab"
                                        >
                                            <canvas id="radar"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-12">
                            {/* Top Sell Table */}
                            <div
                                className="card card-table-border-none"
                                data-scroll-height={550}
                            >
                                <div className="card-header justify-content-between">
                                    <h2>Sold by Units</h2>
                                    <div>
                                        <button className="text-black-50 mr-2 font-size-20">
                                            <i className="mdi mdi-cached"/>
                                        </button>
                                        <div className="dropdown show d-inline-block widget-dropdown">
                                            <a
                                                className="dropdown-toggle icon-burger-mini"
                                                href="#"
                                                role="button"
                                                id="dropdown-units"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-display="static"
                                            />
                                            <ul
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="dropdown-units"
                                            >
                                                <li className="dropdown-item">
                                                    <a href="#">Action</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Another action</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Something else here</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body slim-scroll py-0">
                                    <table className="table ">
                                        <tbody>
                                        <tr>
                                            <td className="text-dark">Backpack</td>
                                            <td className="text-center">9</td>
                                            <td className="text-right">
                                                33%{" "}
                                                <i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-dark">T-Shirt</td>
                                            <td className="text-center">6</td>
                                            <td className="text-right">
                                                150%{" "}
                                                <i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-dark">Coat</td>
                                            <td className="text-center">3</td>
                                            <td className="text-right">
                                                50%{" "}
                                                <i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-dark">Necklace</td>
                                            <td className="text-center">7</td>
                                            <td className="text-right">
                                                150%{" "}
                                                <i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-dark">Jeans Pant</td>
                                            <td className="text-center">10</td>
                                            <td className="text-right">
                                                300%{" "}
                                                <i className="mdi mdi-arrow-down-bold text-danger pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-dark">Shoes</td>
                                            <td className="text-center">5</td>
                                            <td className="text-right">
                                                100%{" "}
                                                <i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-dark">T-Shirt</td>
                                            <td className="text-center">6</td>
                                            <td className="text-right">
                                                150%{" "}
                                                <i className="mdi mdi-arrow-up-bold text-success pl-1 font-size-12"/>{" "}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer bg-white py-4">
                                    <a href="#" className="btn-link py-3 text-uppercase">
                                        View Report
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-12">
                            {/* Notification Table */}
                            <div className="card card-default" data-scroll-height={550}>
                                <div className="card-header justify-content-between ">
                                    <h2>Latest Notifications</h2>
                                    <div>
                                        <button className="text-black-50 mr-2 font-size-20">
                                            <i className="mdi mdi-cached"/>
                                        </button>
                                        <div className="dropdown show d-inline-block widget-dropdown">
                                            <a
                                                className="dropdown-toggle icon-burger-mini"
                                                href="#"
                                                role="button"
                                                id="dropdown-notification"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-display="static"
                                            />
                                            <ul
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="dropdown-notification"
                                            >
                                                <li className="dropdown-item">
                                                    <a href="#">Action</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Another action</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Something else here</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body slim-scroll">
                                    <div className="media pb-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
                                            <i className="mdi mdi-cart-outline font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3 ">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href="#">
                                                New Order
                                            </a>
                                            <p>Selena has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 10 AM
                  </span>
                                    </div>
                                    <div className="media py-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                            <i className="mdi mdi-email-outline font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href="#">
                                                New Enquiry
                                            </a>
                                            <p>Phileine has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 9 AM
                  </span>
                                    </div>
                                    <div className="media py-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
                                            <i className="mdi mdi-stack-exchange font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href="#">
                                                Support Ticket
                                            </a>
                                            <p>Emma has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 10 AM
                  </span>
                                    </div>
                                    <div className="media py-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-primary text-white">
                                            <i className="mdi mdi-cart-outline font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href="#">
                                                New order
                                            </a>
                                            <p>Ryan has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 10 AM
                  </span>
                                    </div>
                                    <div className="media py-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-info text-white">
                                            <i className="mdi mdi-calendar-blank font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href>
                                                Comapny Meetup
                                            </a>
                                            <p>Phileine has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 10 AM
                  </span>
                                    </div>
                                    <div className="media py-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-warning text-white">
                                            <i className="mdi mdi-stack-exchange font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href="#">
                                                Support Ticket
                                            </a>
                                            <p>Emma has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 10 AM
                  </span>
                                    </div>
                                    <div className="media py-3 align-items-center justify-content-between">
                                        <div
                                            className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                            <i className="mdi mdi-email-outline font-size-20"/>
                                        </div>
                                        <div className="media-body pr-3">
                                            <a className="mt-0 mb-1 font-size-15 text-dark" href="#">
                                                New Enquiry
                                            </a>
                                            <p>Phileine has placed an new order</p>
                                        </div>
                                        <span className=" font-size-12 d-inline-block">
                    <i className="mdi mdi-clock-outline"/> 9 AM
                  </span>
                                    </div>
                                </div>
                                <div className="mt-3"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* Recent Order Table */}
                            <div className="card card-table-border-none" id="recent-orders">
                                <div className="card-header justify-content-between">
                                    <h2>Recent Orders</h2>
                                    <div className="date-range-report ">
                                        <span/>
                                    </div>
                                </div>
                                <div className="card-body pt-0 pb-5">
                                    <table
                                        className="table card-table table-responsive table-responsive-large"
                                        style={{width: "100%"}}
                                    >
                                        <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Product Name</th>
                                            <th className="d-none d-md-table-cell">Units</th>
                                            <th className="d-none d-md-table-cell">Order Date</th>
                                            <th className="d-none d-md-table-cell">Order Cost</th>
                                            <th>Status</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>24541</td>
                                            <td>
                                                <a className="text-dark" href>
                                                    {" "}
                                                    Coach Swagger
                                                </a>
                                            </td>
                                            <td className="d-none d-md-table-cell">1 Unit</td>
                                            <td className="d-none d-md-table-cell">Oct 20, 2018</td>
                                            <td className="d-none d-md-table-cell">$230</td>
                                            <td>
                                                <span className="badge badge-success">Completed</span>
                                            </td>
                                            <td className="text-right">
                                                <div className="dropdown show d-inline-block widget-dropdown">
                                                    <a
                                                        className="dropdown-toggle icon-burger-mini"
                                                        href
                                                        role="button"
                                                        id="dropdown-recent-order1"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-display="static"
                                                    />
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-right"
                                                        aria-labelledby="dropdown-recent-order1"
                                                    >
                                                        <li className="dropdown-item">
                                                            <a href="#">View</a>
                                                        </li>
                                                        <li className="dropdown-item">
                                                            <a href="#">Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>24541</td>
                                            <td>
                                                <a className="text-dark" href>
                                                    {" "}
                                                    Toddler Shoes, Gucci Watch
                                                </a>
                                            </td>
                                            <td className="d-none d-md-table-cell">2 Units</td>
                                            <td className="d-none d-md-table-cell">Nov 15, 2018</td>
                                            <td className="d-none d-md-table-cell">$550</td>
                                            <td>
                                                <span className="badge badge-warning">Delayed</span>
                                            </td>
                                            <td className="text-right">
                                                <div className="dropdown show d-inline-block widget-dropdown">
                                                    <a
                                                        className="dropdown-toggle icon-burger-mini"
                                                        href="#"
                                                        role="button"
                                                        id="dropdown-recent-order2"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-display="static"
                                                    />
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-right"
                                                        aria-labelledby="dropdown-recent-order2"
                                                    >
                                                        <li className="dropdown-item">
                                                            <a href="#">View</a>
                                                        </li>
                                                        <li className="dropdown-item">
                                                            <a href="#">Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>24541</td>
                                            <td>
                                                <a className="text-dark" href>
                                                    {" "}
                                                    Hat Black Suits
                                                </a>
                                            </td>
                                            <td className="d-none d-md-table-cell">1 Unit</td>
                                            <td className="d-none d-md-table-cell">Nov 18, 2018</td>
                                            <td className="d-none d-md-table-cell">$325</td>
                                            <td>
                                                <span className="badge badge-warning">On Hold</span>
                                            </td>
                                            <td className="text-right">
                                                <div className="dropdown show d-inline-block widget-dropdown">
                                                    <a
                                                        className="dropdown-toggle icon-burger-mini"
                                                        href="#"
                                                        role="button"
                                                        id="dropdown-recent-order3"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-display="static"
                                                    />
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-right"
                                                        aria-labelledby="dropdown-recent-order3"
                                                    >
                                                        <li className="dropdown-item">
                                                            <a href="#">View</a>
                                                        </li>
                                                        <li className="dropdown-item">
                                                            <a href="#">Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>24541</td>
                                            <td>
                                                <a className="text-dark" href>
                                                    {" "}
                                                    Backpack Gents, Swimming Cap Slin
                                                </a>
                                            </td>
                                            <td className="d-none d-md-table-cell">5 Units</td>
                                            <td className="d-none d-md-table-cell">Dec 13, 2018</td>
                                            <td className="d-none d-md-table-cell">$200</td>
                                            <td>
                                                <span className="badge badge-success">Completed</span>
                                            </td>
                                            <td className="text-right">
                                                <div className="dropdown show d-inline-block widget-dropdown">
                                                    <a
                                                        className="dropdown-toggle icon-burger-mini"
                                                        href="#"
                                                        role="button"
                                                        id="dropdown-recent-order4"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-display="static"
                                                    />
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-right"
                                                        aria-labelledby="dropdown-recent-order4"
                                                    >
                                                        <li className="dropdown-item">
                                                            <a href="#">View</a>
                                                        </li>
                                                        <li className="dropdown-item">
                                                            <a href="#">Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>24541</td>
                                            <td>
                                                <a className="text-dark" href>
                                                    {" "}
                                                    Speed 500 Ignite
                                                </a>
                                            </td>
                                            <td className="d-none d-md-table-cell">1 Unit</td>
                                            <td className="d-none d-md-table-cell">Dec 23, 2018</td>
                                            <td className="d-none d-md-table-cell">$150</td>
                                            <td>
                                                <span className="badge badge-danger">Cancelled</span>
                                            </td>
                                            <td className="text-right">
                                                <div className="dropdown show d-inline-block widget-dropdown">
                                                    <a
                                                        className="dropdown-toggle icon-burger-mini"
                                                        href="#"
                                                        role="button"
                                                        id="dropdown-recent-order5"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        data-display="static"
                                                    />
                                                    <ul
                                                        className="dropdown-menu dropdown-menu-right"
                                                        aria-labelledby="dropdown-recent-order5"
                                                    >
                                                        <li className="dropdown-item">
                                                            <a href="#">View</a>
                                                        </li>
                                                        <li className="dropdown-item">
                                                            <a href="#">Remove</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6">
                            {/* To Do list */}
                            <div
                                className="card card-default todo-table"
                                id="todo"
                                data-scroll-height={550}
                            >
                                <div className="card-header justify-content-between">
                                    <h2>To Do List</h2>
                                    <a
                                        className="btn btn-primary btn-pill"
                                        id="add-task"
                                        href="#"
                                        role="button"
                                    >
                                        {" "}
                                        Add task{" "}
                                    </a>
                                </div>
                                <div className="card-body slim-scroll">
                                    <div className="todo-single-item d-none" id="todo-input">
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Todo"
                                                    autoFocus
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="todo-list" id="todo-list">
                                        <div
                                            className="todo-single-item d-flex flex-row justify-content-between finished">
                                            <i className="mdi"/>
                                            <span>Finish Dashboard UI Kit update</span>
                                            <span className="badge badge-primary">Finished</span>
                                        </div>
                                        <div
                                            className="todo-single-item d-flex flex-row justify-content-between current">
                                            <i className="mdi"/>
                                            <span>Create new prototype for the landing page</span>
                                            <span className="badge badge-primary">Today</span>
                                        </div>
                                        <div className="todo-single-item d-flex flex-row justify-content-between ">
                                            <i className="mdi"/>
                                            <span>
                      {" "}
                                                Add new Google Analytics code to all main files{" "}
                    </span>
                                            <span className="badge badge-danger">Yesterday</span>
                                        </div>
                                        <div className="todo-single-item d-flex flex-row justify-content-between ">
                                            <i className="mdi"/>
                                            <span>Update parallax scroll on team page</span>
                                            <span className="badge badge-success">Dec 15, 2018</span>
                                        </div>
                                        <div className="todo-single-item d-flex flex-row justify-content-between ">
                                            <i className="mdi"/>
                                            <span>Update parallax scroll on team page</span>
                                            <span className="badge badge-success">Dec 15, 2018</span>
                                        </div>
                                        <div className="todo-single-item d-flex flex-row justify-content-between ">
                                            <i className="mdi"/>
                                            <span>Create online customer list book</span>
                                            <span className="badge badge-success">Dec 15, 2018</span>
                                        </div>
                                        <div className="todo-single-item d-flex flex-row justify-content-between ">
                                            <i className="mdi"/>
                                            <span>Lorem ipsum dolor sit amet, consectetur.</span>
                                            <span className="badge badge-success">Dec 15, 2018</span>
                                        </div>
                                        <div className="todo-single-item d-flex flex-row justify-content-between mb-1">
                                            <i className="mdi"/>
                                            <span>Update parallax scroll on team page</span>
                                            <span className="badge badge-success">Dec 15, 2018</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3"/>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            {/* area chart */}
                            <div className="card card-default">
                                <div className="card-header d-block d-md-flex justify-content-between">
                                    <h2>World Wide Customer </h2>
                                    <div className="dropdown show d-inline-block widget-dropdown ml-auto">
                                        <a
                                            className="dropdown-toggle"
                                            href="#"
                                            role="button"
                                            id="world-dropdown"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            data-display="static"
                                        >
                                            World Wide
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="world-dropdown"
                                        >
                                            <li className="dropdown-item">
                                                <a href="#">Continetal chart</a>
                                            </li>
                                            <li className="dropdown-item">
                                                <a href="#">Sub-continental</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-body vector-map-world">
                                    <div id="world" style={{height: "100%", width: "100%"}}/>
                                </div>
                                <div className="card-footer d-flex flex-wrap bg-white p-0">
                                    <div className="col-6">
                                        <div className="p-4">
                                            <ul className="d-flex flex-column justify-content-between">
                                                <li className="mb-2">
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#29cc97"}}
                                                    />
                                                    America <span className="float-right">5k</span>
                                                </li>
                                                <li>
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#4c84ff"}}
                                                    />
                                                    Australia <span className="float-right">3k</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="p-4 border-left">
                                            <ul className="d-flex flex-column justify-content-between">
                                                <li className="mb-2">
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#ffa128"}}
                                                    />
                                                    Europe <span className="float-right">4k</span>
                                                </li>
                                                <li>
                                                    <i
                                                        className="mdi mdi-checkbox-blank-circle-outline mr-2"
                                                        style={{color: "#fe5461"}}
                                                    />
                                                    Africa <span className="float-right">2k</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-5">
                            {/* New Customers */}
                            <div
                                className="card card-table-border-none"
                                data-scroll-height={580}
                            >
                                <div className="card-header justify-content-between ">
                                    <h2>New Customers</h2>
                                    <div>
                                        <button className="text-black-50 mr-2 font-size-20">
                                            <i className="mdi mdi-cached"/>
                                        </button>
                                        <div className="dropdown show d-inline-block widget-dropdown">
                                            <a
                                                className="dropdown-toggle icon-burger-mini"
                                                href="#"
                                                role="button"
                                                id="dropdown-customar"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-display="static"
                                            ></a>
                                            <ul
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="dropdown-customar"
                                            >
                                                <li className="dropdown-item">
                                                    <a href="#">Action</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Another action</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Something else here</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pt-0">
                                    <table className="table ">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="media-image mr-3 rounded-circle">
                                                        <a href="profile.html">
                                                            <img
                                                                className="rounded-circle w-45"
                                                                src="assets_user/img/user/u1.jpg"
                                                                alt="customer image"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <a href="profile.html">
                                                            <h6 className="mt-0 text-dark font-weight-medium">
                                                                Selena Wagner
                                                            </h6>
                                                        </a>
                                                        <small>@selena.oi</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>2 Orders</td>
                                            <td className="text-dark d-none d-md-block">$150</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="media-image mr-3 rounded-circle">
                                                        <a href="profile.html">
                                                            <img
                                                                className="rounded-circle w-45"
                                                                src="assets_user/img/user/u2.jpg"
                                                                alt="customer image"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <a href="profile.html">
                                                            <h6 className="mt-0 text-dark font-weight-medium">
                                                                Walter Reuter
                                                            </h6>
                                                        </a>
                                                        <small>@walter.me</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>5 Orders</td>
                                            <td className="text-dark d-none d-md-block">$200</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="media-image mr-3 rounded-circle">
                                                        <a href="profile.html">
                                                            <img
                                                                className="rounded-circle w-45"
                                                                src="assets_user/img/user/u3.jpg"
                                                                alt="customer image"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <a href="profile.html">
                                                            <h6 className="mt-0 text-dark font-weight-medium">
                                                                Larissa Gebhardt
                                                            </h6>
                                                        </a>
                                                        <small>@larissa.gb</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>1 Order</td>
                                            <td className="text-dark d-none d-md-block">$50</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="media-image mr-3 rounded-circle">
                                                        <a href="profile.html">
                                                            <img
                                                                className="rounded-circle w-45"
                                                                src="assets_user/img/user/u4.jpg"
                                                                alt="customer image"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <a href="profile.html">
                                                            <h6 className="mt-0 text-dark font-weight-medium">
                                                                Albrecht Straub
                                                            </h6>
                                                        </a>
                                                        <small>@albrech.as</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>2 Orders</td>
                                            <td className="text-dark d-none d-md-block">$100</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="media">
                                                    <div className="media-image mr-3 rounded-circle">
                                                        <a href="profile.html">
                                                            <img
                                                                className="rounded-circle w-45"
                                                                src="assets_user/img/user/u5.jpg"
                                                                alt="customer image"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <a href="profile.html">
                                                            <h6 className="mt-0 text-dark font-weight-medium">
                                                                Leopold Ebert
                                                            </h6>
                                                        </a>
                                                        <small>@leopold.et</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>1 Order</td>
                                            <td className="text-dark d-none d-md-block">$60</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            {/* Top Products */}
                            <div className="card card-default" data-scroll-height={580}>
                                <div className="card-header justify-content-between mb-4">
                                    <h2>Top Products</h2>
                                    <div>
                                        <button className="text-black-50 mr-2 font-size-20">
                                            <i className="mdi mdi-cached"/>
                                        </button>
                                        <div className="dropdown show d-inline-block widget-dropdown">
                                            <a
                                                className="dropdown-toggle icon-burger-mini"
                                                href="#"
                                                role="button"
                                                id="dropdown-product"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-display="static"
                                            ></a>
                                            <ul
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="dropdown-product"
                                            >
                                                <li className="dropdown-item">
                                                    <a href="#">Update Data</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Detailed Log</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Statistics</a>
                                                </li>
                                                <li className="dropdown-item">
                                                    <a href="#">Clear Data</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body py-0">
                                    <div className="media d-flex mb-5">
                                        <div className="media-image align-self-center mr-3 rounded">
                                            <a href="#">
                                                <img
                                                    src="assets_user/img/products/p1.jpg"
                                                    alt="customer image"
                                                />
                                            </a>
                                        </div>
                                        <div className="media-body align-self-center">
                                            <a href="#">
                                                <h6 className="mb-3 text-dark font-weight-medium">
                                                    {" "}
                                                    Coach Swagger
                                                </h6>
                                            </a>
                                            <p className="float-md-right">
                                                <span className="text-dark mr-2">20</span>Sales
                                            </p>
                                            <p className="d-none d-md-block">
                                                Statement belting with double-turnlock hardware adds
                                                “swagger” to a simple.
                                            </p>
                                            <p className="mb-0">
                                                <del>$300</del>
                                                <span className="text-dark ml-3">$250</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="media d-flex mb-5">
                                        <div className="media-image align-self-center mr-3 rounded">
                                            <a href="#">
                                                <img
                                                    src="assets_user/img/products/p2.jpg"
                                                    alt="customer image"
                                                />
                                            </a>
                                        </div>
                                        <div className="media-body align-self-center">
                                            <a href="#">
                                                <h6 className="mb-3 text-dark font-weight-medium">
                                                    {" "}
                                                    Coach Swagger
                                                </h6>
                                            </a>
                                            <p className="float-md-right">
                                                <span className="text-dark mr-2">20</span>Sales
                                            </p>
                                            <p className="d-none d-md-block">
                                                Statement belting with double-turnlock hardware adds
                                                “swagger” to a simple.
                                            </p>
                                            <p className="mb-0">
                                                <del>$300</del>
                                                <span className="text-dark ml-3">$250</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="media d-flex mb-5">
                                        <div className="media-image align-self-center mr-3 rounded">
                                            <a href="#">
                                                <img
                                                    src="assets_user/img/products/p3.jpg"
                                                    alt="customer image"
                                                />
                                            </a>
                                        </div>
                                        <div className="media-body align-self-center">
                                            <a href="#">
                                                <h6 className="mb-3 text-dark font-weight-medium">
                                                    {" "}
                                                    Gucci Watch
                                                </h6>
                                            </a>
                                            <p className="float-md-right">
                                                <span className="text-dark mr-2">10</span>Sales
                                            </p>
                                            <p className="d-none d-md-block">
                                                Statement belting with double-turnlock hardware adds
                                                “swagger” to a simple.
                                            </p>
                                            <p className="mb-0">
                                                <del>$300</del>
                                                <span className="text-dark ml-3">$50</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
