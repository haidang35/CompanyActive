import axios from "axios";
import { BASE_URL } from "../../Constances/const";


const API_ENPOINT = {
    GET_NOTIFICATIONS_USER: "notifications/"
}

class NotificationService {

    constructor() {
        if(NotificationService._instance) {
            return NotificationService._instance
        }
        NotificationService._instance = this;
    }

    async getNotificationUser(userId) {
        return await axios.get(BASE_URL + API_ENPOINT.GET_NOTIFICATIONS_USER + userId); 
    }
}

const instance = new NotificationService();
export default instance;