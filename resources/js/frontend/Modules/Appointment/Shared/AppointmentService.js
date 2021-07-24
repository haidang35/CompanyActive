import axios from "axios";
import { BASE_URL } from "../../../Constances/const";

const API_ENDPOINT = {
    GET_ALL_APPOINTMENT: "appointments"
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


}

const constance = new AppointmentService();
export default constance;