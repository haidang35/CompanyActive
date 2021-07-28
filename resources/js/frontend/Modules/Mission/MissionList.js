import React, { Component } from "react";
import MissionService from "./Shared/MissionService";
import Pagination from "../../Shared/Pagination/Pagination";
import AddNewMission from "./Components/MissionForm/AddNewMission";
import Form from "../../Shared/Form/Form";
import StaffService from "../../Modules/Staff/Shared/StaffService";
import AuthService from "../../Shared/AuthService/AuthService";
import FormError from "../../Shared/Form/FormError";
import AlertSuccess from "../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../Shared/Alert/AlertDanger";
import { Link } from "react-router-dom";
import { convertDateTime, getDateNow } from "../../Helper/DateTime/ConvertDateTime";
import LoadingEffect from "../../Shared/Loading/LoadingEffect";

class MissionList extends Form {
    constructor(props) {
        super(props);
        this.state = {
            missionList: [],
            dataTotal: "",
            page: 1,
            rowPerPage: 20,
            onOpenForm: false,
            dataNewMisson: {},
            onSubmitForm: false,
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
            message: "",
            errorMessage: "",
            onLoad: false,
            searchValue: "",
            scopeStatus: "",
            scopeDate: "",
            datePicker: false,
            scopeDatePicker: getDateNow()
        };
    }

    componentWillMount() {
        if (AuthService.roleId == "ADMIN") {
            this.getMissionList();
        } else if (AuthService.roleId == "USER") {
            this.getMissionStaff();
        }

        this.getStaffList();
    }

    getMissionList = () => {
        MissionService.getAllMission().then((res) => {
            this.setState({
                missionList: res.data.data,
                dataTotal: res.data.total,
            });
        });
    };

    getMissionStaff = () => {
        MissionService.getMissionStaff(AuthService.userId).then((res) => {
            this.setState({
                missionList: res.data.data,
                dataTotal: res.data.total,
            });
        });
    };

    getStaffList = () => {
        StaffService.getAllStaffNotPaginate().then((res) => {
            this.setState({
                staffList: res.data,
            });
        });
    };

    onChangePage = (page) => {
        const changePage = {
            page: page,
            search_value: this.state.searchValue,
            status: this.state.scopeStatus,
            date_time: this.state.scopeDate,
            date_picker: this.state.datePicker ? this.state.scopeDatePicker : ""
        };
        MissionService.ChangePage(changePage).then((res) => {
            this.setState({
                missionList: res.data.data,
                page,
            });
        });
    };

    onOpenMissionForm = () => {
        this.setState({
            onOpenForm: !this.state.onOpenForm,
        });
    };

    onCancelMissionForm = () => {
        this.setState({
            onOpenForm: false,
        });
        this._fillForm({
            title: "",
            content: "",
            deadline: "",
            status: 0,
            note: "",
            staffId: "",
            picId: "",
            dirty: false,
        });
    };

    onSubmitForm = () => {
        let { form } = this.state;
        this._validateForm();
        this.state.form["dirty"] = true;
        const mission = {
            mission_title: form.title.value,
            mission_content: form.content.value,
            mission_deadline: form.deadline.value,
            mission_note: form.note.value,
            pic_id: AuthService.userId,
            staff_id: form.staffId.value,
        };

        if (this._isFormValid()) {
            this.setState({
                onLoad: true,
            });
            MissionService.createNewMission(mission)
                .then((res) => {
                    this.setState({
                        message: `Create new mission ${res.data.mission_title} successful !!`,
                        onLoad: false,
                    });
                    this._fillForm({
                        title: "",
                        content: "",
                        deadline: "",
                        status: 0,
                        note: "",
                        staffId: "",
                        picId: "",
                        dirty: false,
                    });
                })
                .catch((err) => {
                    this.setState({
                        onLoad: false,
                        errorMessage: "Create new mission failed !!",
                    });
                });
            this.setState({
                onOpenForm: false,
            });
        }
    };

    handleSearchValue = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    onScopeSearch = () => {
        const { searchValue, scopeStatus, scopeDate, scopeDatePicker, datePicker } = this.state;
        const data = {
            search_value: searchValue,
            status: scopeStatus,
            date_time: scopeDate,
            date_picker: datePicker ? scopeDatePicker : ""
        };
        MissionService.searchMission(data).then((res) => {
            this.setState({
                missionList: res.data.data,
                dataTotal: res.data.total,
            });
        });
    };

    handleChangeStatus = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    handleScopeDate = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value
        });
    };

    refreshData = () => {
        if (AuthService.roleId == "ADMIN") {
            this.getMissionList();
        } else if (AuthService.roleId == "USER") {
            this.getMissionStaff();
        }
    };

    changeDatePicker = () => {
        if(this.state.datePicker) {
            this.setState({
                scopeDatePicker: ""
            });
        } 
        this.setState({
            datePicker: !this.state.datePicker,
            scopeDatePicker: getDateNow()
        });
        
    };

    handleChangeDatePicker = (ev) => {
        const { name, value } = ev.target;
        this.setState({[name]: value});
    }

    render() {
        let {
            missionList,
            page,
            rowPerPage,
            onOpenForm,
            staffList,
            message,
            errorMessage,
        } = this.state;
        const { title, content, deadline, note, staffId, dirty } =
            this.state.form;
        if (message.length > 0 || errorMessage.length > 0) {
            const timer = setTimeout(() => {
                this.setState({
                    message: "",
                    errorMessage: "",
                });
            }, 5000);
        }
        return (
            <div className="card card-default" data-scroll-height={1650}>
                <div className="card-header justify-content-between align-items-center card-header-border-bottom">
                    <h2>Mission List</h2>

                    <div className="btn-control">
                        <button
                            onClick={this.refreshData}
                            className="btn btn-success"
                            style={{ marginRight: "15px" }}
                        >
                            Refresh
                        </button>
                        {!onOpenForm && AuthService.roleId == "ADMIN" ? (
                            <button
                                onClick={this.onOpenMissionForm}
                                className="btn btn-primary"
                            >
                                Create new mission
                            </button>
                        ) : AuthService.roleId == "ADMIN" ? (
                            <div>
                                <button
                                    onClick={this.onSubmitForm}
                                    className="btn btn-info"
                                    style={{ marginRight: "15px" }}
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={this.onCancelMissionForm}
                                    className="btn btn-danger"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="card-body slim-scroll">
                    <LoadingEffect
                        onLoad={this.state.onLoad}
                        title={"Creating mission"}
                    />

                    <AlertSuccess message={this.state.message} />
                    <AlertDanger message={this.state.errorMessage} />
                    {!onOpenForm ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <label
                                            className="sr-only"
                                            htmlFor="inlineFormInputGroupUsername2"
                                        >
                                            Search
                                        </label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="mdi mdi-magnify"></i>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                name="searchValue"
                                                className="form-control"
                                                id="inlineFormInputGroupUsername2"
                                                placeholder="Search mission ..."
                                                onChange={
                                                    this.handleSearchValue
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <select
                                            className="form-control"
                                            name="scopeStatus"
                                            style={{ fontSize: "16px" }}
                                            onChange={this.handleChangeStatus}
                                        >
                                            <option
                                                style={{ fontSize: "16px" }}
                                                value=""
                                            >
                                                Select status
                                            </option>
                                            <option value={0}>Pending</option>
                                            <option value={1}>Finished</option>
                                            <option value={2}>Rejected</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-1">
                                        <button
                                            onClick={this.changeDatePicker}
                                            className="btn btn-info"
                                        >
                                            {
                                                this.state.datePicker ? "List View" : "Calendar"
                                            }
                                        </button>
                                    </div>
                                    <div className="col-sm-3">
                                        {this.state.datePicker ? (
                                            <input
                                                type="date"
                                                name="scopeDatePicker"
                                                className="form-control"
                                                value={this.state.scopeDatePicker}
                                                onChange={this.handleChangeDatePicker}
                                            />
                                        ) : (
                                            <select
                                                className="form-control"
                                                name="scopeDate"
                                                style={{ fontSize: "16px" }}
                                                onChange={this.handleScopeDate}
                                            >
                                                <option
                                                    style={{ fontSize: "16px" }}
                                                    value=""
                                                >
                                                    Select Deadline Time
                                                </option>
                                                <option value={1}>Today</option>
                                                <option value={2}>
                                                    Tomorrow
                                                </option>
                                                <option value={3}>
                                                    This week
                                                </option>
                                                <option value={4}>
                                                    This month
                                                </option>
                                            </select>
                                        )}
                                    </div>

                                    <button
                                        onClick={this.onScopeSearch}
                                        className="btn btn-primary mb-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    {onOpenForm ? (
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
                                            onChange={(ev) =>
                                                this._setValue(ev, "title")
                                            }
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
                                            onChange={(ev) =>
                                                this._setValue(ev, "staffId")
                                            }
                                        >
                                            <option>Select staff</option>
                                            {staffList.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
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
                                            onChange={(ev) =>
                                                this._setValue(ev, "content")
                                            }
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
                                            onChange={(ev) =>
                                                this._setValue(ev, "note")
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {missionList.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="media py-3 align-items-center justify-content-between"
                            >
                                <div className="d-flex rounded-circle align-items-center justify-content-center mr-3 media-icon iconbox-45 bg-success text-white">
                                    <i className="mdi mdi-email-outline font-size-20" />
                                </div>
                                <div className="media-body pr-3">
                                    <a
                                        className="mt-0 mb-1 font-size-15 text-dark"
                                        href="#"
                                    >
                                        {item.mission_title}
                                    </a>
                                </div>
                                <div style={{ marginRight: "150px" }}>
                                    {item.mission_status === 0 ? (
                                        <button
                                            className="btn btn-sm btn-warning"
                                            style={{ color: "white" }}
                                        >
                                            Pending
                                        </button>
                                    ) : item.mission_status === 1 ? (
                                        <button
                                            className="btn btn-sm btn-success"
                                            style={{ color: "white" }}
                                        >
                                            Finished
                                        </button>
                                    ) : item.mission_status === 2 ? (
                                        <button
                                            className="btn btn-sm btn-danger"
                                            style={{ color: "white" }}
                                        >
                                            Rejected
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div style={{ marginRight: "50px" }}>
                                    <span
                                        className=" font-size-12 d-inline-block"
                                        style={{ fontSize: "16px" }}
                                    >
                                        <span>Created at: </span>
                                        <i className="mdi mdi-clock-outline" />{" "}
                                        {convertDateTime(item.created_at)}
                                    </span>
                                </div>

                                <span
                                    className=" font-size-12 d-inline-block"
                                    style={{ fontSize: "16px" }}
                                >
                                    <span>Deadline : </span>
                                    <i className="mdi mdi-clock-outline" />{" "}
                                    {convertDateTime(item.mission_deadline)}
                                </span>
                                <div style={{ marginLeft: "45px" }}>
                                    <Link to={`/app/missions/${item.id}`}>
                                        <button className="btn btn-success">
                                            View details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    <div style={{ marginTop: "30px" }}>
                        <Pagination
                            data={this.state.dataTotal}
                            page={page}
                            rowsPerPage={rowPerPage}
                            onChangePage={this.onChangePage}
                        />
                    </div>
                </div>

                <div className="mt-3" />
            </div>
        );
    }
}

export default MissionList;
