import React, { Component } from "react";
import StaffService from "../../../Staff/Shared/StaffService";
import Form from "../../../../Shared/Form/Form";
import FormError from "../../../../Shared/Form/FormError";
import AuthService from "../../../../Shared/AuthService/AuthService";


class AddNewMission extends Form {
    constructor(props) {
        super(props);
        this.state = {
            staffList: [],
            form: this._getInitFormData({
                title: "",
                content: "",
                deadline: "",
                status: 0,
                note: "",
                staffId: "",
                picId: "",
                dirty: false,
            }),
        };
    }

    componentDidMount() {
        this.getStaffList();
    }

    getStaffList = () => {
        StaffService.getAllStaff().then((res) => {
            this.setState({
                staffList: res.data.data,
            });
        });
    };


    onSubmitForm = () => {
        let { form } = this.state;
        // this._validateForm();
        // this.state.form["dirty"] = true;
        const mission = {
            mission_title: form.title.value,
            mission_content: form.content.value,
            mission_deadline: form.deadline.value,
            mission_note: form.note.value,
            pic_id: AuthService.userId,
            staff_id: form.staffId.value,
        };
        this.props.getDataForm(mission);
        // if (this._isFormValid()) {
        //     console.log(mission);
        // }
    };

    render() {
        const { staffList, form } = this.state;
        const { title, content, deadline, note, staffId, dirty } =
            this.state.form;

        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Mission Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="form-control"
                                id="exampleFormControlInput3"
                                placeholder="Mission title "
                                value={title.value}
                                onChange={(ev) => this._setValue(ev, "title")}
                            />
                            {dirty && title.err === "*" ? (
                                <FormError errorMessage="Title cannot be empty" />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                required
                                className="form-control"
                                id="exampleFormControlInput3"
                                placeholder="Mission Content "
                                value={deadline.value}
                                onChange={(ev) =>
                                    this._setValue(ev, "deadline")
                                }
                            />
                            {dirty && deadline.err === "*" ? (
                                <FormError errorMessage="Title cannot be empty" />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Staff</label>
                            <select
                                name="staffId"
                                required
                                className="form-control"
                                id="exampleFormControlInput3"
                                placeholder="Mission Content "
                                value={staffId.value}
                                onChange={(ev) => this._setValue(ev, "staffId")}
                            >
                                <option>Select staff</option>
                                {staffList.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {dirty && staffId.err === "*" ? (
                                <FormError errorMessage="Title cannot be empty" />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label>Content</label>
                            <textarea
                                name="content"
                                required
                                className="form-control"
                                id="exampleFormControlInput3"
                                cols="6"
                                rows="6"
                                placeholder="Content "
                                value={content.value}
                                onChange={(ev) => this._setValue(ev, "content")}
                            ></textarea>
                            {dirty && content.err === "*" ? (
                                <FormError errorMessage="Title cannot be empty" />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label>Note</label>
                            <textarea
                                name="note"
                                className="form-control"
                                id="exampleFormControlInput3"
                                cols="6"
                                rows="6"
                                placeholder="Note "
                                value={note.value}
                                onChange={(ev) => this._setValue(ev, "note")}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNewMission;
