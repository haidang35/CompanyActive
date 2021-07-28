import React, { Component } from "react";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import Form from "../../../../Shared/Form/Form";
import { Link } from "react-router-dom";
import MissionService from "../../Shared/MissionService";
import MissionProgress from "./MissionProgress";
import AuthService from "../../../../Shared/AuthService/AuthService";
import FormError from "../../../../Shared/Form/FormError";

class MissionInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                title: "",
                content: "",
                deadline: "",
                note: "",
                status: "",
                progress: "",
                pic: "",
                staff: "",
            }),
            onEdit: false,
            message: "",
            errorMessage: "",
            messageUpdate: "",
        };
    }

    componentDidMount() {
        this.getMissionInfo();
    }

    getMissionInfo = () => {
        const { id } = this.props.match.params;
        MissionService.getOneMission(id).then((res) => {
            this._fillForm({
                title: res.data.mission_title,
                content: res.data.mission_content,
                deadline: res.data.mission_deadline,
                note: res.data.mission_note,
                status: res.data.mission_status,
                progress: res.data.progress,
                pic: res.data.pic,
                staff: res.data.staff,
            });
        });
    };

    onEditInfo = () => {
        this.setState({
            onEdit: true,
        });
    };

    onCancelEditInfo = () => {
        this.setState({
            onEdit: false,
        });
        this.getMissionInfo();
    };

    onSaveChangeInfo = () => {
        this._validateForm();
        this.state.form["dirty"] = true;
        const { id } = this.props.match.params;
        const { form } = this.state;
        const data = {
            mission_title: form.title.value,
            mission_content: form.content.value,
            mission_deadline: form.deadline.value,
            mission_note: form.note.value,
        };
        if (this._isFormValid()) {
            MissionService.updateMissionAll(id, data)
                .then((res) => {
                    this.setState({
                        messageUpdate: `Update mission ${res.data.mission_title} successfull !!`,
                        onEdit: false
                    });
                })
                .catch((err) => {
                    this.setState({
                        errorMessage: "Update mission failed !!",
                    });
                });
            this.getMissionInfo();
        }
    };

    render() {
        const { id } = this.props.match.params;
        const { onEdit } = this.state;
        const {
            title,
            content,
            deadline,
            note,
            status,
            pic,
            staff,
            dirty,
            progress,
        } = this.state.form;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Mission Details</h2>
                    </div>
                    <div className="card-body detail-info">
                        <div>
                            <AlertSuccess message={this.state.messageUpdate} />
                            <AlertDanger message={this.state.errorMessage} />
                        </div>
                        <div
                            className="col-sm-12"
                            style={{ marginBottom: "35px" }}
                        >
                            <div className="btn-control-right">
                                {!onEdit && AuthService.roleId  == "ADMIN" && status.value == 0 ? (
                                    <button
                                        onClick={this.onEditInfo}
                                        className=" btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                ) : AuthService.roleId == "ADMIN" && status.value == 0 ? (
                                    <div>
                                        <button
                                            className=" btn btn-success"
                                            onClick={this.onSaveChangeInfo}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={this.onCancelEditInfo}
                                            className=" btn btn-warning"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className="detail-content">
                            <div className="row">
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Mission Title
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-phone" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            name="title"
                                            className="form-control"
                                            disabled={!onEdit}
                                            value={title.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "title")
                                            }
                                        />
                                    </div>
                                    {title.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Mission title cannot be empty"
                                            }
                                        />
                                    ) : dirty ? (
                                        <FormError errorMessage={title.err} />
                                    ) : ""}
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Deadline
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-currency-usd" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="deadline"
                                            required
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={deadline.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "deaddline")
                                            }
                                        />
                                    </div>
                                    {deadline.err == "*" && dirty? (
                                        <FormError
                                            errorMessage={
                                                "Mission deadline cannot be empty"
                                            }
                                        />
                                    ) : dirty ? (
                                        <FormError errorMessage={deadline.err} />
                                    ) : ""}
                                </div>
                                <div className="col-sm-8">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Content
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-security-account-outline" />
                                            </span>
                                        </div>
                                        <textarea
                                            name="content"
                                            required
                                            rows={5}
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={content.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "content")
                                            }
                                        ></textarea>
                                    </div>
                                    {content.err == "*" && dirty ? (
                                        <FormError
                                            errorMessage={
                                                "Mission content cannot be empty"
                                            }
                                        />
                                    ) : dirty ? (
                                        <FormError errorMessage={content.err} />
                                    ) : ""}
                                </div>
                                <div className="col-sm-4">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Note
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <textarea
                                            name="note"
                                            rows={5}
                                            disabled={!onEdit}
                                            className="form-control"
                                            value={note.value}
                                            onChange={(ev) =>
                                                this._setValue(ev, "note")
                                            }
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Manager
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mb-2">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="pic"
                                            required
                                            disabled
                                            className="form-control"
                                            value={
                                                pic.value.name
                                                    ? pic.value.name
                                                    : ""
                                            }
                                        />
                                        <Link
                                            to={`/app/staffs/${pic.value.id}`}
                                        >
                                            <button className="btn btn-primary mb-2">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label
                                        className="text-dark mt-4 font-weight-medium"
                                        htmlFor
                                    >
                                        Staff
                                    </label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text mb-2">
                                                <i className="mdi mdi-eye" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="staff"
                                            required
                                            disabled
                                            className="form-control"
                                            value={
                                                staff.value.name
                                                    ? staff.value.name
                                                    : ""
                                            }
                                        />
                                        <Link
                                            to={`/app/staffs/${staff.value.id}`}
                                        >
                                            <button className="btn btn-primary mb-2">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MissionProgress
                    status={status.value}
                    progress={progress.value}
                    missionId={id}
                />
            </div>
        );
    }
}

export default MissionInfo;
