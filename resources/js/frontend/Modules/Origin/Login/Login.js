import React, { Component } from "react";
import AuthService from "../../../Shared/AuthService/AuthService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleLogin = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    onLogin = () => {
        const { username, password } = this.state;
        AuthService.login(username, password)
            .then((res) => {
                const userId = res.data.id;
                AuthService.getUserInfo(userId);
                localStorage.setItem("userId", JSON.stringify(userId));
                this.goTo("app");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    goTo(url = "") {
        url = window.location.origin + "/" + url;
        window.location.replace(url);
    }
    render() {
        return (
            <div>
                <div className="container d-flex flex-column justify-content-between vh-100">
                    <div className="row justify-content-center mt-5">
                        <div className="col-xl-5 col-lg-6 col-md-10">
                            <div className="card">
                                <div className="card-header bg-primary">
                                    <div className="app-brand">
                                        <a href="/index.html">
                                            <svg
                                                className="brand-icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                preserveAspectRatio="xMidYMid"
                                                width={30}
                                                height={33}
                                                viewBox="0 0 30 33"
                                            >
                                                <g
                                                    fill="none"
                                                    fillRule="evenodd"
                                                >
                                                    <path
                                                        className="logo-fill-blue"
                                                        fill="#7DBCFF"
                                                        d="M0 4v25l8 4V0zM22 4v25l8 4V0z"
                                                    />
                                                    <path
                                                        className="logo-fill-white"
                                                        fill="#FFF"
                                                        d="M11 4v25l8 4V0z"
                                                    />
                                                </g>
                                            </svg>
                                            <span className="brand-name">
                                                Company Active
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body p-5">
                                    <h4 className="text-dark mb-5">Sign In</h4>
                                    <div className="row">
                                        <div className="form-group col-md-12 mb-4">
                                            <input
                                                type="email"
                                                className="form-control input-lg"
                                                id="email"
                                                name="username"
                                                aria-describedby="emailHelp"
                                                placeholder="Username"
                                                onChange={this.handleLogin}
                                            />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control input-lg"
                                                id="password"
                                                placeholder="Password"
                                                onChange={this.handleLogin}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <div className="d-flex my-2 justify-content-between">
                                                <div className="d-inline-block mr-3">
                                                    <label className="control control-checkbox">
                                                        Remember me
                                                        <input type="checkbox" />
                                                        <div className="control-indicator" />
                                                    </label>
                                                </div>
                                                <p>
                                                    <a
                                                        className="text-blue"
                                                        href="#"
                                                    >
                                                        Forgot Your Password?
                                                    </a>
                                                </p>
                                            </div>
                                            <button
                                                className="btn btn-lg btn-primary btn-block mb-4"
                                                onClick={this.onLogin}
                                            >
                                                Sign In
                                            </button>
                                            <p>
                                                Don't have an account yet ?
                                                <a
                                                    className="text-blue"
                                                    href="/register"
                                                >
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright pl-0">
                        <p className="text-center">
                            © 2021 Company Active by Dang Jinner
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
