import React,{Component} from "react";
import axios from "axios";

class Appointment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            appointments :[],
            appointment_id:'',
            appointment_staff:'',
            appointment_purpose:'',
            appointment_project:'',
            appointment_status:'',

        }
    }

    componentDidMount() {
        this.getAppointments();
    }

    getAppointments = async () => {
        await axios.get("http://127.0.0.1:8000/api/appointments")
            .then((res) => {
                this.setState({
                    appointments : res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onDeleteAppointment = async (appointmentId) => {
        await axios.delete("http://127.0.0.1:8000/api/appointments/"+appointmentId)
            .then((res) => {
                console.log("Delete appointment successfully")
                this.getAppointments()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onEditAppointment = (id) => {
        const appointments = this.state;
        this.setState({
            appointment_id : id
        })
        for (let i=0;i<appointments.length;i++){
            if(appointments[i].appointment_id === id){
                this.setState({
                    appointment_staff:appointments[i].appointment_staff,
                    appointment_purpose:appointments[i].appointment_purpose,
                    appointment_project:appointments[i].appointment_project,
                    appointment_status:appointments[i].appointment_status
                })
            }
        }
    }

    onUpdateAppointment = async () => {
        const appointmentId = this.state.appointment_id;
        data({
            appointment_staff: this.state.appointment_staff,
            appointment_purpose: this.state.appointment_purpose,
            appointment_project: this.state.appointment_project,
            appointment_status: this.state.appointment_status
        })
        await axios.put("http://127.0.0.1:8000/api/appointments/"+appointmentId,data)
            .then((res)=>{
                console.log("Edit appointment successfully")
                this.getAppointments()
                this.setState({
                    appointment_staff:'',
                    appointment_purpose:'',
                    appointment_project:'',
                    appointment_status:'',
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    handleChange = (ev) => {

    }

    render(){
        const appointments = this.state;
        let loop= 0;
        const appointment = appointments.map(item => {
            return (
                <tr key={item.appointment_id}>
                    <td>{++loop}</td>
                    <td>{item.appointment_staff}</td>
                    <td>{item.appointment_purpose}</td>
                    <td>{item.appointment_project}</td>
                    <td>{item.appointment_status}</td>
                </tr>
            )
        })
        return (
            <div>

            </div>
        )
    }

}

export default Appointment;
