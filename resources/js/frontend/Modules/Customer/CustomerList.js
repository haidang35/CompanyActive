import React, { Component } from "react";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import Pagination from "../../Shared/Pagination/Pagination";
import CustomerService from "./Shared/CustomerService";
import { Link } from "react-router-dom";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            page: 1,
            rowsPerPage: 20,
            message: "",
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.getCustomerList();
    }

    getCustomerList = () => {
        CustomerService.getAllCustomer()
            .then((res) => {
                this.setState({
                    customerList: res.data,
                });
            })
            .catch((err) => {});
    };

    onChangePage = (page) => {
        this.setState({ page });
    };

    render() {
        const { customerList, page, rowsPerPage } = this.state;
        console.log("CUS", customerList);
        let loop = 1;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Customer List</h2>
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
                                Add new customer
                            </button>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Customer name</th>
                                    <th scope="col">Number phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Appointments</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerList
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((item) => {
                                        return (
                                            <tr>
                                                <td>{loop++}</td>
                                                <td>{item.customer_name}</td>
                                                <td>{item.customer_phone}</td>
                                                <td>{item.customer_email}</td>
                                                <td>{item.customer_address}</td>
                                                <td>
                                                    {item.appointment.length}
                                                </td>
                                                <td>
                                                    <div className="btn-control">
                                                        <Link to={`/app/customers/${item.id}`}>
                                                            <button className="btn btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <div style={{ marginTop: "45px" }}>
                            <Pagination
                                data={this.state.customerList}
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

export default CustomerList;
