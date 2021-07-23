import React, {Component} from "react";
import axios from "axios";

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customer_id: '',
            customer_name: '',
            customer_phone: '',
            customer_address: '',
            customer_relationship: '',
            search:'',
        }
    }
    componentDidMount() {
        this.getCustomers();
    }

    getCustomers = async () => {
        await axios.get("http://127.0.0.1:8000/api/customers")
            .then((res) => {
                this.setState({
                    customers : res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onDeleteCustomer = async (customerId) => {
        await axios.delete("http://127.0.0.1:8000/api/customers" + customerId)
            .then((res) => {
                console.log("Delete customer successfully")
                this.getCustomers();
            })
            .catch((err)=>{
                console.log(err)
            })

    }

    // handleChange=(ev)=>{
    //     const name:ev.target.name;
    //     const value:ev.target.value;
    //     const customer = this.state;
    //     this.setState({
    //         [name]:value
    //     })
    // }

    onEditCustomer = (id) => {
        const customers = this.state;
        this.setState({
            customer_id : id
        })
        for (let i=0;i<customers.length;i++){
            if (customers[i].customer_id === id){
                this.setState({
                    customer_name:customers[i].customer_name,
                    customer_phone:customers[i].customer_phone,
                    customers_address:customers[i].customers_address,
                    customer_relationship:customers[i].customer_relationship
                })
            }
        }
    }

    onUpdateCustomer = async () => {
        const customerId = this.state.customer_id;
        data({
            customer_name:this.state.customer_name,
            customer_phone:this.state.customer_phone,
            customer_address:this.state.customer_address,
            customer_relationship: this.state.customer_relationship
        })
        await axios.put("http://127.0.0.1:8000/api/customers/"+customerId,data)
            .then((res)=>{
                console.log("Edit customer successfully")
                this.setState({
                    customer_name:'',
                    customer_phone:'',
                    customer_address:'',
                    customer_relationship:''
                })
                this.getCustomers()
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    searchCustomer=()=>{

    }
    render() {
        const customers = this.state;
        let loop = 0;
        const customer = customers.map(item =>{
            return (
                <tr key={item.customer_id}>
                    <td>{++loop}</td>
                    <td>{item.customer_name}</td>
                    <td>{item.customer_phone}</td>
                    <td>{item.customer_address}</td>
                    <td>{item.customer_relationship}</td>
                </tr>
            )
        }
    );
        return(
            <div>
                <input type="text"
                       onChange={this.handleSearch}
                       value={this.state.text}/>
            </div>
        )
    }
}

export default Customers;
