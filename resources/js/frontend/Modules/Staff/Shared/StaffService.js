import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../../../Constances/const';

const API_ENDPOINT = {
    GET_ALL_STAFF: "users",
    GET_ONE_STAFF: "users/",
    UPDATE_STAFF_INFO: "users/",
    DELETE_STAFF: "users/"
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

}

const instance = new StaffService();
export default instance;