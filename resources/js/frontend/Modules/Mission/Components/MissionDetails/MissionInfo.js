import React, { Component } from "react";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import AlertDanger from "../../../../Shared/Alert/AlertDanger";
import Form from "../../../../Shared/Form/Form";
import { Link } from "react-router-dom";
import MissionService from "../../Shared/MissionService";
import MissionProgress from "./MissionProgress";

class MissionInfo extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                title: '',
                content: '',
                deadline: '',
                note: '',
                status: '',
                progress: '',
                pic: '',
                staff: ''
            }),
            onEdit: false,
            message: "",
            errorMessage: "",
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
                note: res.data.misson_note,
                status: res.data.mission_status,
                progress: res.data.progress,
                pic: res.data.pic,
                staff: res.data.staff
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
    };

    onSaveChangeInfo = () => {
        const { id } = this.props.match.params;
    };

    render() {
        const { id } = this.props.match.params;
        const { onEdit } = this.state;
        const { title, content, deadline, note, status, pic, staff, dirty, progress } = this.state.form;
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Mission Details</h2>
                    </div>
                    <div className="card-body detail-info">
                        <div>
                            <AlertSuccess message={this.state.message} />
                            <AlertDanger message={this.state.errorMessage} />
                        </div>
                        <div
                            className="col-sm-12"
                            style={{ marginBottom: "35px" }}
                        >
                            <div className="btn-control-right">
                                {!onEdit ? (
                                    <button
                                        onClick={this.onEditInfo}
                                        className=" btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                ) : (
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
                                            onChange={(ev) => this._setValue(ev, "title")}
                                        />
                                    </div>
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
                                            onChange={(ev) => this._setValue(ev, "deaddline")}
                                        />
                                    </div>
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
                                            onChange={(ev) => this._setValue(ev, "content")}
                                        ></textarea>
                                    </div>
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
                                            onChange={(ev) => this._setValue(ev, "note")}
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
                                            value={pic.value.name ? pic.value.name : ""}
                                        />
                                        <Link to={`/app/staffs/${pic.value.id}`}>
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
                                            value={staff.value.name ? staff.value.name : ""}
                                        />
                                        <Link to={`/app/staffs/${staff.value.id}`}>
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
                <MissionProgress status={status.value} progress={progress.value} missionId={id}/>
            </div>
        );
    }
}

export default MissionInfo;
