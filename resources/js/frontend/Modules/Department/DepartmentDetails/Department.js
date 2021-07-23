import React, { Component } from "react";
import axios from "axios";
import DepartmentInfo from "../Components/DepartmentInfo/DepartmentInfo";
import Member from "../Components/Members/Member";
import { useParams } from "react-router";
import AuthService from "../../../Shared/AuthService/AuthService";

class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentInfo: {},
            roleId: "",
        };
    }

    getDepartmentInfo = (data) => {
        this.setState({
            departmentInfo: data,
        });
    };

    getRoleUser =  () => {
         AuthService.userInfo
            .then((res) => {
                this.setState({
                    roleId: res.data.role,
                });
            })
            .catch((err) => {});
    };

    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <DepartmentInfo
                    departmentId={id}
                    getDepartmentInfo={this.getDepartmentInfo}
                />
                <Member
                    departmentInfo={this.state.departmentInfo}
                />
            </div>
        );
    }
}

export default Department;
