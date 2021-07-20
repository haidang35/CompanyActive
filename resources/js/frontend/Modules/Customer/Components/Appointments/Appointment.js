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

    getAppointments = async ()=>{
        await axios.get("")
            .then((res)=>{
                this.appointments = res.data
                this.setState({
                    appointments: appointments
                })
            })
            .catch((err)=>{
                console.log(err)
        })
    }

    onDeleteAppointment =async (appointmentId)=>{
        await axios.delete(""+appointmentId)
            .then((res)=>{
                console.log("Delete appointment successfully")
                this.getAppointments();
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    onEditAppointment =(id)=>{
        const appointments = this.state.appointments;
        const appointment_id = this.state.appointment_id;
        // data({
        //     appointment_staff: this.state.appointment_staff,
        //     appointment_purpose: this.state.appointment_purpose,
        //     appointment_project: this.state.appointment_project,
        //     appointment_status: this.state.appointment_status
        // })
        for(let i=0;i<appointments.length;i++){
            if(appointments[i].appointment_id === id){
                this.setState({
                    appointment_staff:appointments.appointment_staff,
                    appointment_purpose:appointments.appointment_purpose,
                    appointment_project:appointments.appointment_project,
                    appointment_status:appointments.appointment_status
                })
            }
        }
    }

    onUpdateAppointment=async (appointmentId)=>{
        const appointment_id= this.state.appointment_id;
        data({
            appointment_staff:this.state.appointment_staff,
            appointment_purpose:this.state.appointment_purpose,
            appointment_project:this.state.appointment_project,
            appointment_status:this.state.appointment_status
        })
        if (appointment_id === appointmentId){
            await axios.put("http://127.0.0.1:8000/api/appointments/"+appointmentId,data)
                .then((res)=>{
                    this.setState({
                        appointment_staff:appointments.appointment_staff,
                        appointment_purpose:this.state.appointment_purpose,
                        appointment_project:this.state.appointment_project,
                        appointment_status:this.state.appointment_status
                    })
                })
        }

    }

    render(){
        return (
            <div>

            </div>
        )
    }



}
