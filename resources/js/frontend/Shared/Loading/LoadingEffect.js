import React, { Component } from "react";

class LoadingEffect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { onLoad, title } = this.props;
        return (
            <div>
                {onLoad ? (
                    <div style={{ display: "flex", marginBottom: "15px" }}>
                        <div
                            style={{
                                marginRight: "15px",
                                paddingTop: "7px",
                            }}
                        >
                            <h5>{title} ...</h5>
                        </div>
                        <div className="sk-wave">
                            <div
                                className="rect1"
                                style={{
                                    marginRight: "5px",
                                    backgroundColor: "#4c84ff",
                                }}
                            />
                            <div
                                className="rect2"
                                style={{
                                    marginRight: "5px",
                                    backgroundColor: "#4c84ff",
                                }}
                            />
                            <div
                                className="rect3"
                                style={{
                                    marginRight: "5px",
                                    backgroundColor: "#4c84ff",
                                }}
                            />
                            <div
                                className="rect4"
                                style={{
                                    marginRight: "5px",
                                    backgroundColor: "#4c84ff",
                                }}
                            />
                            <div
                                className="rect5"
                                style={{ backgroundColor: "#4c84ff" }}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default LoadingEffect;
