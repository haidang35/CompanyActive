import React, {Component} from "react";
import axios from "axios";

class Customers extends Component{
    constructor(props) {
        super(props);
        this.state={
            customers:[],
            customer_id:'',
            customer_name:'',
            customer_phone:'',
            customer_address:'',
            customer_relationship:''
        }
    }

    getCustomers = async ()=>{
        await axios.get("http://127.0.0.1:8000/api/customers")
            .then((res)=>{
                this.setState({
                    customers:res.data.data
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    onDeleteCustomer = async (customerId)=>{
        await axios.delete("http://127.0.0.1:8000/api/customers/" + customerId)
            .then((res)=>{
                console.log("delete successfully");
                this.getCustomers();

            })
            .catch((err)=>{
                console.log(err);
            })
    }



    render() {
        return(
            <div>

            </div>
        )
    }
}
