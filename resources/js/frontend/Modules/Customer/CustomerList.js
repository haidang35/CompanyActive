import React, { Component } from "react";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import Pagination from "../../Shared/Pagination/Pagination";
import CustomerService from "./Shared/CustomerService";
import { Link } from "react-router-dom";
import AddNewCustomer from "./Components/CustomerForm/AddNewCustomer";
import AuthService from "../../Shared/AuthService/AuthService";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            page: 1,
            rowsPerPage: 20,
            message: "",
            errorMessage: "",
            searchValue: "",
            onSearch: false,
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

    addNewCustomer = (data) => {
        CustomerService.addNewCustomer(data)
            .then((res) => {
                this.setState({
                    message: `Add new customer ${res.data.customer_name} successfully !!`,
                });
                this.getCustomerList();
            })
            .catch((err) => {
                this.setState({
                    errorMessage: "Add new customer failed !!",
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
        this.setState({
            onSearch: true,
            page: 0,
        });
    };

    render() {
        let { customerList, page, rowsPerPage, searchValue, onSearch } =
            this.state;
        if (onSearch) {
            customerList = customerList.filter((item) => {
                return (
                    item.customer_name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.customer_email
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1 ||
                    item.customer_phone
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                );
            });
        }
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
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-5">
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
                                                placeholder="Search name, email, phone ..."
                                                value={this.state.searchValue}
                                                onChange={
                                                    this.handleSearchValue
                                                }
                                            />
                                        </div>
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
                                    data-target="#addNewCustomer"
                                >
                                    Add new customer
                                </button>
                            </div>
                        ) : (
                            ""
                        )}

                        <AddNewCustomer onSubmitForm={this.addNewCustomer} />
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
                                                        <Link
                                                            to={`/app/customers/${item.id}`}
                                                        >
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
                                data={customerList}
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

export default CustomerList;
