import axios from 'axios';
import React from 'react';
import {BASE_URL} from "../../../Constances/const";

const API_ENPOINT = {
    GET_ALL_MISSION: "missions",
    ADD_NEW_MISSION: "missions/new",
    GET_ONE_MISSION: "missions/",
    UPDATE_MISSION: "missions/",
    UPDATE_PROGRESS: "missions/",
    SEARCH_MISSION: "missions/search"
}

class MissionService {
    constructor() {
        if(MissionService._instance) {
            return MissionService._instance
        }
        MissionService._instance = this;
    }

    async getAllMission() {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ALL_MISSION);
    }

    async ChangePage(page) {
        return await axios.post(BASE_URL + API_ENPOINT.GET_ALL_MISSION, page);
    }

    async createNewMission(data) {
        return await axios.post(BASE_URL + API_ENPOINT.ADD_NEW_MISSION, data);
    }

    async getOneMission(missionId) {
        return await axios.get(BASE_URL + API_ENPOINT.GET_ONE_MISSION + missionId);
    }

    async updateMission(missionId, data) {
        return await axios.patch(BASE_URL+ API_ENPOINT.UPDATE_MISSION + missionId, data);
    }
    
    async updateProgress(missonId, data) {
        return await axios.put(BASE_URL + API_ENPOINT.UPDATE_PROGRESS + missonId, data);
    } 

    async searchMission(data) {
        return await axios.post(BASE_URL + API_ENPOINT.SEARCH_MISSION, data);
    }



}

const instance = new MissionService();
export default instance;