import React, {Component} from 'react';
import axios from "axios";
import DepartmentService from "../../Shared/DepartmentService";

class Member extends Component {
    constructor(props) {
        super(props);
        this.state={
            departments: []
        }
    }

    componentDidMount =  () => {
        this.getData();
    }

    getData = async () => {
        await DepartmentService.getAllDepartment()
            .then((res) => {
                this.setState({
                    departments: res.data.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        const { departments } = this.state;
        let loop = 0;
        const listDepartment = departments.map((item) => {
            return(
                <tr key={item.department_id}>
                    <td scope="row">{++loop}</td>
                    <td>{item.department_name}</td>
                    <td>{item.department_code}</td>
                    <td>{item.department_pic}</td>
                    <td>{item.department_desc}</td>
                    <td>{item.created_at}</td>
                    <td>{item.updated_at}</td>
                    <td>
                        <button className="mb-1 btn btn-primary">View</button>
                    </td>
                </tr>
            );
        });
        return(
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Departments</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Department Name</th>
                                <th scope="col">Code</th>
                                <th scope="col">Manager</th>
                                <th scope="col">Description</th>
                                <th scope="col">Created at</th>
                                <th scope="col">Updated at</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                                {listDepartment}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Member;
