import {BASE_URL} from "../../../Constances/const";
import axios from "axios";

const API_ENDPOINT = {
    GET_ALL_DEPARTMENT: "departments",
    GET_ONE_DEPARTMENT: "departments/",
    UPDATE_DEPARTMENT: "departments/"
}

class DepartmentService {
    constructor() {
    }

    getAllDepartment() {
        return axios.get(BASE_URL + API_ENDPOINT.GET_ALL_DEPARTMENT);
    }

    getOneDepartment(departmentId) {
        return axios.get(BASE_URL + API_ENDPOINT.GET_ONE_DEPARTMENT + departmentId);
    }

    updateDepartment(departmentId, data) {
        return axios.put(BASE_URL + API_ENDPOINT.UPDATE_DEPARTMENT + departmentId, data);
    }
}

const instance = new DepartmentService();

export default instance;
