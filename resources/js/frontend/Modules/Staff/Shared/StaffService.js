import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../../Constances/const';

const API_ENDPOINT = {
    GET_ALL_STAFF: "users",
    GET_ONE_STAFF: "users/",
    UPDATE_STAFF_INFO: "users/",
    DELETE_STAFF: "users/",
    CREATE_NEW_STAFF: "users",
    CHANGE_PAGE: "users/page",
    SCOPE_SEARCH_STAFF: "users/search"
}

class StaffService {
    constructor() {
        if(StaffService._instance) {
            return StaffService._instance;
        }
        StaffService._instance = this;
    }

    async getAllStaff() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ALL_STAFF);
    }

    async getOneStaff(staffId) {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ONE_STAFF + staffId);
    }

    async updateStaffInfo(staffId, data) {
        return await axios.patch(BASE_URL + API_ENDPOINT.UPDATE_STAFF_INFO + staffId, data);
    }

    async deleteStaff(staffId) {
        return await axios.delete(BASE_URL + API_ENDPOINT.DELETE_STAFF + staffId);
    }

    async createNewStaff(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.CREATE_NEW_STAFF, data);
    }

    async changePageUser(page) {
        return await axios.post(BASE_URL + API_ENDPOINT.CHANGE_PAGE, page);
    }

    async scopeStaff(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.SCOPE_SEARCH_STAFF, data);
    }

}

const instance = new StaffService();
export default instance;