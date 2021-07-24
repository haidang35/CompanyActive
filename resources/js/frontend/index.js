import React, { Component, Fragment, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Redirect, Route } from "react-router";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./Modules/Origin/Login/Login";
import AuthService from "./Shared/AuthService/AuthService";
import Register from "./Modules/Origin/Register/Register";

const LoggedIn = !!AuthService.userId;

export const Root = (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Suspense>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return LoggedIn ? (
                                <Redirect to="/app"></Redirect>
                            ) : (
                                <Redirect to="/login" />
                            );
                        }}
                    />
                    <Route
                        path="/app"
                        render={() => {
                            return LoggedIn ? (
                                <App />
                            ) : (
                                <Redirect to="/login"></Redirect>
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/login"
                        render={() => {
                            return !LoggedIn ? (
                                <Login />
                            ) : (
                                <Redirect to="/app"></Redirect>
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => {
                            return <Register />;
                        }}
                    />
                </Suspense>
            </Switch>
        </Fragment>
    </BrowserRouter>
);

ReactDOM.render(Root, document.getElementById("app"));
