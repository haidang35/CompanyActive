import React, {Component} from 'react';
import axios from 'axios';
import DepartmentInfo from "./Components/DepartmentInfo/DepartmentInfo";
import Member from "./Components/Members/Member";

class Department extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {

        return(
            <div>
                <DepartmentInfo/>
                <Member/>
            </div>
        );
    }
}

export default Department;
