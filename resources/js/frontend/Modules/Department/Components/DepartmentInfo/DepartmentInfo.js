import React, {Component} from 'react';
import DepartmentService from "../../Shared/DepartmentService";

class DepartmentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentInfo: {}
        }
    }

    componentDidMount() {
        this.getDepartmentInfo();
    }

    getDepartmentInfo = async () => {
        await DepartmentService.getOneDepartment(1)
            .then((res) => {
                this.setState({
                    departmentInfo: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { departmentInfo } = this.state;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Department Info </h2>
                    </div>
                    <div className="float-right">
                        <button type="button" className="mb-1 btn btn-primary">
                            <i className=" mdi mdi-star-outline mr-1" /> Primary
                        </button>
                        <button type="button" className="mb-1 btn btn-secondary">
                            <i className=" mdi mdi-diamond-outline mr-1" /> Secondary
                        </button>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Department Name
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
                                  </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={departmentInfo.department_name}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Code
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
                                  </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={departmentInfo.department_code}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Manager
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
                                  </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={departmentInfo.department_pic}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-dark font-weight-medium" htmlFor>
                                    Description
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="mdi mdi-account"/>
                                  </span>
                                    </div>
                                    <textarea
                                        className="form-control"
                                        value= {departmentInfo.department_desc}
                                    />
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default DepartmentInfo;
