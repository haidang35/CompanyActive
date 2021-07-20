
import React, {Component} from 'react';
import axios from 'axios';

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state={
            listStaff: [],
            staff_id: '',
            staff_name: '',
            staff_birthday: '',
            staff_email: '',
            staff_phone: '',
            staff_address: ''
        }
    }

    componentDidMount() {
        this.getListStaff();
    }

    getListStaff = async () => {
        await axios.get("http://127.0.0.1:8000/api/staffs")
            .then((res) => {
                this.setState({
                    listStaff: res.data.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onDeleteStaff = async (staffId) => {
        await axios.delete("http://127.0.0.1:8000/api/staffs/" + staffId)
            .then((res) => {
                console.log("delete successful");
                this.getListStaff();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onEditStaff = (id) => {
        const { listStaff } = this.state;
        this.setState({
            staff_id: id
        })
        for(let i =0; i < listStaff.length; i++) {
            if(listStaff[i].staff_id === id) {
                this.setState({
                    staff_name: listStaff[i].staff_name,
                    staff_birthday: listStaff[i].staff_birthday,
                    staff_email: listStaff[i].staff_email,
                    staff_phone: listStaff[i].staff_phone,
                    staff_address: listStaff[i].staff_address
                });
            }
        }

    }

    handleChangeValue = (ev) => {
        const name = ev.target.name ;
        const value = ev.target.value;
        let { staff } = this.state;
        this.setState({
           [name]: value
        });
    }

    updateStaff = () => {
        const staffId = this.state.staff_id;
        const data = {
            staff_name: this.state.staff_name,
            staff_birthday: this.state.staff_birthday,
            staff_email: this.state.staff_email,
            staff_phone: this.state.staff_phone,
            staff_address: this.state.staff_address
        }
        axios.put("http://127.0.0.1:8000/api/staffs/" + staffId, data)
            .then((res) => {
                console.log("Update staff successfully");
                this.getListStaff();
                this.setState({
                    staff_name: "",
                    staff_birthday: "",
                    staff_email: "",
                    staff_phone: "",
                    staff_address: ""
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        const { listStaff } = this.state;
        let loop = 0
        const elmStaff = listStaff.map((item) => {
            return (
                <tr key={item.staff_id}>
                    <td scope="row">{++loop}</td>
                    <td>{item.staff_name}</td>
                    <td>{item.staff_birthday}</td>
                    <td>{item.staff_email}</td>
                    <td>{item.staff_phone}</td>
                    <td>{item.staff_address}</td>
                    <td>
                        <button onClick={() => this.onEditStaff(item.staff_id)} className="btn btn-primary">Edit</button>
                        <button onClick={() => this.onDeleteStaff(item.staff_id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
        return(
            <div>
                <div className="card card-default">
                <div className="card-header card-header-border-bottom">
                    <h2>List staff</h2>
                </div>
                ;<div className="card card-default">
                <div className="card-header card-header-border-bottom">
                    <h2>Edit</h2>
                </div>
                <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Staff name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="staff_name"
                                value={this.state.staff_name}
                                onChange={this.handleChangeValue}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Birthday</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="staff_birthday"
                                value={this.state.staff_birthday}
                                onChange={this.handleChangeValue}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="staff_email"
                                value={this.state.staff_email}
                                onChange={this.handleChangeValue}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Phone number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="exampleFormControlInput1"
                                name="staff_phone"
                                value={this.state.staff_phone}
                                onChange={this.handleChangeValue}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Address</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows={3}
                                name="staff_address"
                                value={this.state.staff_address}
                                onChange={this.handleChangeValue}
                            />
                        </div>

                        <div className="form-footer pt-4 pt-5 mt-4 border-top">
                            <button onClick={this.updateStaff} className="btn btn-primary btn-default">
                                Submit
                            </button>
                            <button type="submit" className="btn btn-secondary btn-default">
                                Cancel
                            </button>
                        </div>
                </div>
            </div>

                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Staff Name</th>
                            <th scope="col">Birthday</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Address</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {elmStaff}
                        </tbody>
                    </table>
                </div>
            </div>

            </div>
        );
    }
}
export default Staff;
