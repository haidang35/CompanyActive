import React, { Component } from "react";
import AlertSuccess from "../../../../Shared/Alert/AlertSuccess";
import MissionService from "../../Shared/MissionService";

class MissionProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 10,
            message: "",
            missionId: "",
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            missionId: nextProps.missionId,
            progress: nextProps.progress,
        });
        if (nextProps.status === 1) {
            this.setState({
                progress: 100,
            });
        } else if (nextProps.status === 2) {
            this.setState({
                progress: -1,
            });
        }
    };

    increaseProgress = () => {
        let { progress, missionId } = this.state;
        if (progress + 10 === 100) {
            this.updateMissionStatus();
        }
        if (progress < 100) {
            progress += 10;
            this.setState({ progress });
            MissionService.updateProgress(missionId, { progress }).then(
                (res) => {}
            );
        }
    };

    decreaseProgress = () => {
        let { progress, missionId } = this.state;
        if (progress >= 10) {
            progress = progress - 10;
            this.setState({ progress });
            MissionService.updateProgress(missionId, { progress }).then(
                (res) => {console.log(progress)}
            );
        }
    };

    updateMissionStatus = () => {
        let { missionId } = this.state;
        let data = {
            mission_status: 1,
        };
        MissionService.updateMission(missionId, data)
            .then((res) => {
                this.setState({
                    message: `Mission ${res.data.mission_title} finished !!`,
                });
            })
            .catch((res) => {});
    };

    render() {
        let { progress } = this.state;
        console.log("pro", progress);
        return (
            <div>
                <div className="card card-default">
                    <div className="card-header card-header-border-bottom">
                        <h2>Mission Progress</h2>
                    </div>
                    <div className="card-body">
                        <AlertSuccess message={this.state.message} />
                        {progress === 100 || progress === -1 ? (
                            ""
                        ) : (
                            <div
                                className="btn-control-left"
                                style={{ marginBottom: "10px" }}
                            >
                                <button
                                    onClick={this.decreaseProgress}
                                    className="btn btn-danger"
                                    style={{
                                        fontSize: "20px",
                                        marginRight: "10px",
                                    }}
                                >
                                    -
                                </button>
                                <button
                                    onClick={this.increaseProgress}
                                    className="btn btn-info"
                                    style={{ fontSize: "20px" }}
                                >
                                    +
                                </button>
                            </div>
                        )}

                        <div
                            className="progress mb-3"
                            style={{ height: "60px" }}
                        >
                            <div
                                className={
                                    progress === 100
                                        ? "progress-bar progress-bar-striped progress-bar-animated bg-success"
                                        : progress >= 0
                                        ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                        : "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                                }
                                role="progressbar"
                                style={{
                                    width: `${
                                        this.state.progress >= 0
                                            ? progress
                                            : 100
                                    }%`,
                                    height: "100%",
                                    fontSize: "20px",
                                }}
                                aria-valuenow={progress >= 0 ? progress : 100}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                {progress >= 0 ? `${progress}%` : "Rejected"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MissionProgress;
