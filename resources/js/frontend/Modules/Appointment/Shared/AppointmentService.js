import axios from "axios";
import { BASE_URL } from "../../../Constances/const";

const API_ENDPOINT = {
    GET_ALL_APPOINTMENT: "appointments",
    GET_ONE_APPOINTMENT: "appointments/",
    CREATE_APPOINTMENT:  "appointments",
    UPDATE_APPOINTMENT: "appointments/",
    GET_APPOINTMENT_STAFF: "appointments/staff/",
    CHANGE_PAGE: "appointments/page",
    SCOPE_APPOINTMENT: "appointments/search"
}

class AppointmentService {
    constructor() {
        if(AppointmentService._constance) {
            return AppointmentService._constance;
        }
        AppointmentService._constance = this;
    }

    async getAllAppointment() {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ALL_APPOINTMENT);
    }

    async getOneAppointment($appointmentId) {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_ONE_APPOINTMENT + $appointmentId);
    }

    async createAppointment(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.CREATE_APPOINTMENT, data);
    }

    async updateAppointment(appointmentId, data) {
        return await axios.patch(BASE_URL + API_ENDPOINT.UPDATE_APPOINTMENT + appointmentId, data);
    }

    async getAppointmentStaff(staffId) {
        return await axios.get(BASE_URL + API_ENDPOINT.GET_APPOINTMENT_STAFF + staffId);
    }

    async changePageAppointment(page) {
        return await axios.post(BASE_URL + API_ENDPOINT.CHANGE_PAGE, page);
    }

    async scopeAppointment(data) {
        return await axios.post(BASE_URL + API_ENDPOINT.SCOPE_APPOINTMENT, data);
    }
}

const constance = new AppointmentService();
export default constance;