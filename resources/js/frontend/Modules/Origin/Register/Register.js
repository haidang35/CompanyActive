import React, {Component} from 'react';
import AuthService from "../../../Shared/AuthService/AuthService";
import { goTo } from '../../../Shared/Redirect/Redirect';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: '',
            username: '',
            password: '',
            repassword: ''
        }

    }

    handleRegister = (ev) => {
        const  { name, value } = ev.target;
        this.setState({
           [name]: value
        });
    }

    onSignUp = () => {
        const { name, username, password, repassword } = this.state;
        AuthService.register(name, username, password).then((res) => {
            goTo("login");
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return(
            <div>
                ;<div className="container d-flex flex-column justify-content-between vh-100">
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
                                            <g fill="none" fillRule="evenodd">
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
                                        <span className="brand-name">Company Active</span>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body p-5">
                                <h4 className="text-dark mb-5">Sign Up</h4>
                                    <div className="row">
                                        <div className="form-group col-md-12 mb-4">
                                            <input
                                                type="text"
                                                className="form-control input-lg"
                                                id="name"
                                                aria-describedby="nameHelp"
                                                placeholder="Name"
                                                name="name"
                                                onChange={this.handleRegister}
                                            />
                                        </div>
                                        <div className="form-group col-md-12 mb-4">
                                            <input
                                                type="email"
                                                className="form-control input-lg"
                                                id="email"
                                                aria-describedby="emailHelp"
                                                placeholder="Username"
                                                name="username"
                                                onChange={this.handleRegister}
                                            />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <input
                                                type="password"
                                                className="form-control input-lg"
                                                id="password"
                                                placeholder="Password"
                                                name="password"
                                                onChange={this.handleRegister}
                                            />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <input
                                                type="password"
                                                className="form-control input-lg"
                                                id="cpassword"
                                                placeholder="Confirm Password"
                                                name="repassword"
                                                onChange={this.handleRegister}
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <div className="d-inline-block mr-3">
                                                <label className="control control-checkbox">
                                                    <input type="checkbox" />
                                                    <div className="control-indicator" />I Agree the terms and
                                                    conditions
                                                </label>
                                            </div>
                                            <button
                                                className="btn btn-lg btn-primary btn-block mb-4"
                                                onClick={this.onSignUp}
                                            >
                                                Sign Up
                                            </button>
                                            <p>
                                                Already have an account?
                                                <a className="text-blue" href="/login">
                                                    Sign in
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

export default Register;
