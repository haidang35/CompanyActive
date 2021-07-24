import React, { Component } from "react";
import { BASE_URL } from "../../Constances/const";
import axios from "axios";

const API_ENDPOINT = {
    LOGIN: "login",
    REGISTER: "register",
    GET_USER_INFO: "users/",
};

class AuthService {
    constructor() {
        if (AuthService._instance) {
            return AuthService._instance;
        }
        AuthService._instance = this;
    }

    userId = JSON.parse(localStorage.getItem("userId") || "null");
    _roleId = 0;


    // set roleId() {
    //     this._roleId = 'USER';
    // }

    // get roleId() {
    //     return this._roleId;
    // }
    
    
    async login(username, password) {
        return await axios.post(BASE_URL + API_ENDPOINT.LOGIN, {
            username,
            password,
        });
    }

    async register(name, username, password) {
        return await axios.post(BASE_URL + API_ENDPOINT.REGISTER, {
            name,
            username,
            password,
        });
    }

    async getUserInfo(userId) {
        // let userInfo = (await axios.get(BASE_URL + API_ENDPOINT.GET_USER_INFO + userId)).data;
        // this.roleId = userInfo.role;
        let userInfo = null;
        axios.get(BASE_URL + API_ENDPOINT.GET_USER_INFO + userId).then((res) => {
            userInfo = res.data;
            this.roleId = userInfo.role;
        })
        
        return await axios.get(BASE_URL + API_ENDPOINT.GET_USER_INFO + userId);
    }
}

const instance = new AuthService();
export default instance;
