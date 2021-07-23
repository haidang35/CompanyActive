import React, { Component } from "react";
import { Link } from "react-router-dom";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import { goTo } from "../../../../Shared/Redirect/Redirect";
import DepartmentService from "../../Shared/DepartmentService";


class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: [],
            departmentInfo: '',
            message: ""
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            departmentInfo: nextProps.departmentInfo,
            staffs: nextProps.departmentInfo.staff,
        });
    };

    viewStaffDetails(staffId) {
        goTo(`app/staffs/${staffId}`);
    }

    removeMember(departmentId, staffId) {
        DepartmentService.removeMember(departmentId, staffId)
            .then((res) => {
                this.setState({
                    message: `Remove member ${res.data.name} successfully !!`
                });
            })
            .catch((err) => {});
    }

    render() {
        const { staffs, departmentInfo } = this.state;
        let loop = 0;
        const listStaff = staffs.map((item) => {
            return (
                <tr key={item.id}>
                    <td scope="row">{++loop}</td>
                    <td>{item.name}</td>
                    <td>{item.birthday}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>
                        <div className="btn-control">
                            <button
                                onClick={() => this.viewStaffDetails(item.id)}
                                className="mb-1 btn btn-primary"
                            >
                                View
                            </button>
                            <button
                                onClick={() =>
                                    this.removeMember(
                                        item.department_id,
                                        item.id
                                    )
                                }
                                className="mb-1 btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Staffs of department</h2>
                    </div>
                    <div className="card-body">
                        <AlertSuccess message={this.state.message}/>
                        <div className="btn-group-list">
                            <Link to={location => `${location.pathname}/add-member`}>
                              <button className="btn btn-primary">Add member</button>
                            </Link>
                              
                            </div>
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
                            <tbody>{listStaff}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Member;
