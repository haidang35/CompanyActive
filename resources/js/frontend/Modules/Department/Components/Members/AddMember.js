import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import DepartmentService from "../../Shared/DepartmentService";

class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberList: [],
            message: ""
        };
    }

    componentDidMount() {
        this.getMemberList();
    }

    getMemberList = () => {
        DepartmentService.getAllStaffPending()
            .then((res) => {
                this.setState({
                    memberList: res.data,
                });
            })
            .catch((err) => {});
    };

    addToDepartment = (staffData) => {
        const { departmentId } = this.props.match.params;
        DepartmentService.addMember(departmentId, staffData)
            .then((res) => {
                this.setState({
                    message: `Add staff ${res.data.name} to department successfully !!`
                });
                this.getMemberList();
                
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    render() {
        const { memberList } = this.state;
        const { departmentId } = this.props.match.params;
        let loop = 1;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Add member</h2>
                    </div>
                    <div className="card-body">
                        <div className="btn-group-left">
                            <Link to={`/app/departments/${departmentId}`}>
                                 <button className="btn btn-primary">Go to back</button>
                            </Link>
                           
                        </div>
                        <AlertSuccess message={this.state.message} />
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Staff Name</th>
                                    <th scope="col">Birthday</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Address</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberList.map((item) => {
                                    return (
                                        <tr>
                                            <td>{loop++}</td>
                                            <td>{item.name}</td>
                                            <td>{item.birthday}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <div className="btn-control">
                                                    <button
                                                        onClick={() =>
                                                            this.addToDepartment(
                                                                item
                                                            )
                                                        }
                                                        className="btn btn-warning"
                                                    >
                                                        Add to department
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMember;
