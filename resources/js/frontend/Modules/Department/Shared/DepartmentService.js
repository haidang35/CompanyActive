import { BASE_URL } from "../../../Constances/const";
import axios from "axios";

const API_ENDPOINT = {
    GET_ALL_DEPARTMENT: "departments",
    GET_ONE_DEPARTMENT: "departments/",
    UPDATE_DEPARTMENT: "departments/",
    ADD_NEW_DEPARTMENT: "departments",
    REMOVE_MEMBER: "departments/",
    GET_STAFF_PENDING: "staffs/pending",
    ADD_MEMBER: "departments/",
    DELETE_DEPARTMENT: "departments/",
    CHANGE_PAGE: "departments/page",
    SCOPE_DEPARTMENT: "departments/search",
    GET_ALL_PIC: "departments/pics"
};

class DepartmentService {
    constructor() {}

    async getAllDepartment(data) {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ALL_DEPARTMENT, data);
    }


    async getOneDepartment(departmentId) {
        return await axios.get(
            BASE_URL + API_ENDPOINT.GET_ONE_DEPARTMENT + departmentId
        );
    }

    async updateDepartment(departmentId, data) {
        return await axios.put(
            BASE_URL + API_ENDPOINT.UPDATE_DEPARTMENT + departmentId,
            data
        );
    }

    async addNewDepartment(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.ADD_NEW_DEPARTMENT, data);
    }

    async removeMember(departmentId, staffId) {
        return await axios.patch(BASE_URL + API_ENDPOINT.REMOVE_MEMBER + departmentId + "/" + staffId);
    }

    async getAllStaffPending() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_STAFF_PENDING);
    }

    async addMember(departmentId, staffData) {
        return await axios.put(BASE_URL + API_ENDPOINT.ADD_MEMBER + departmentId + "/" + "add-member", staffData);
    }

    async deleteDepartment(departmentId) {
        return await axios.delete(BASE_URL + API_ENDPOINT.DELETE_DEPARTMENT + departmentId );
    }

    async changePageDepartment(page) {
        return await axios.post(BASE_URL + API_ENDPOINT.CHANGE_PAGE, page);
    }
    
    async scopeDepartment(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.SCOPE_DEPARTMENT, data);
    }

    async getAllPic() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ALL_PIC);
    }
}

const instance = new DepartmentService();

export default instance;
