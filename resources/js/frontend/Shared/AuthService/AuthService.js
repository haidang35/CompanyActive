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
    roleId = ''; 
    userInfo = {};  

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

    async getUserInfo() {
        let userInfo = (await axios.get(BASE_URL + API_ENDPOINT.GET_USER_INFO + this.userId)).data;
        this.roleId = userInfo.role;
        this.userInfo = userInfo;
        // let userInfo = null;
        // axios
        //     .get(BASE_URL + API_ENDPOINT.GET_USER_INFO + userId)
        //     .then((res) => {
        //         userInfo = res.data;
        //         this.roleId = userInfo.role;
        //     });

        return await axios.get(BASE_URL + API_ENDPOINT.GET_USER_INFO + this.userId);
    }
}

const instance = new AuthService();
export default instance;
