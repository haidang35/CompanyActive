import axios from "axios";
import { BASE_URL } from "../../../Constances/const";

const API_ENDPOINT = {
    GET_ALL_CUSTOMER: "customers",
    GET_ONE_CUSTOMER: "customers/",
    UPDATE_CUSTOMER: "customers/",
    ADD_NEW_CUSTOMER: "customers"
}

class CustomerService {
    constructor() {
        if(CustomerService._constance) {
            return CustomerService._constance;
        }
        CustomerService._constance = this;
    }

    async getAllCustomer() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ALL_CUSTOMER);
    }

    async getOneCustomer(customerId) {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ONE_CUSTOMER + customerId);
    }

    async updateCustomerInfo(customerId, data) {
        return await axios.patch(BASE_URL + API_ENDPOINT.UPDATE_CUSTOMER + customerId, data);
    }

    async addNewCustomer(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.ADD_NEW_CUSTOMER, data);
    }


}

const constance = new CustomerService();
export default constance;