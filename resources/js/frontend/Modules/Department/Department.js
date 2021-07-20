import React, {Component} from 'react';
import axios from 'axios';
import DepartmentInfo from "./Components/DepartmentInfo/DepartmentInfo";
import Member from "./Components/Members/Member";

class Department extends Component {
    constructor(props) {
        super(props);
        this.state={
            departmentId: ''
        }
    }

    getDepartmentId = (id) => {
        this.setState({
            departmentId: id
        });
    }

    render() {
        const { departmentId } = this.state;
        return(
            <div>
                <DepartmentInfo getDepartmentId={this.getDepartmentId} />
                <Member departmentId={departmentId} />
            </div>
        );
    }
}

export default Department;
