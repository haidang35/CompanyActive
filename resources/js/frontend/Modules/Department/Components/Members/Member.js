import React, {Component} from 'react';
import DepartmentService from "../../Shared/DepartmentService";

class Member extends Component {
    constructor(props) {
        super(props);
        this.state={
            staffs: []
        }
    }

    componentDidMount =  () => {
    }

    componentWillReceiveProps = (nextProps) => {
        this.getData(nextProps.departmentId)
    }

    getData = async (departmentId) => {
        await DepartmentService.getOneDepartment(departmentId)
            .then((res) => {
                this.setState({
                    staffs: res.data.staff
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        const { staffs } = this.state;
        let loop = 0;
        const listStaff = staffs.map((item) => {
            return(
                <tr key={item.staff_id}>
                    <td scope="row">{++loop}</td>
                    <td>{item.staff_name}</td>
                    <td>{item.staff_birthday}</td>
                    <td>{item.staff_email}</td>
                    <td>{item.staff_phone}</td>
                    <td>{item.staff_address}</td>
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
                        <h2>Staffs of department</h2>
                    </div>
                    <div className="card-body">
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
                                {listStaff}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Member;
