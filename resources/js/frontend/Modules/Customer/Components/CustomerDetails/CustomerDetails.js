
import React, { Component } from "react";
import Form from "../../../../Shared/Form/Form";
import CustomerAppointment from "../Appointment/CustomerAppointment";
import CustomerInfo from "../CustomerInfo/CustomerInfo";

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: []
        };
    }

    getAppointment = (data) => {
        this.setState({
            appointments: data
        });
    }
    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                <CustomerInfo customerId={id} getAppointment={this.getAppointment}/>
                <CustomerAppointment customerId={id} appointments={this.state.appointments}/>
            </div>
        );
    }
}

export default CustomerDetails;
