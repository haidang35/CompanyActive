import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from "./Shared/Components/Header/Header";
import SideBar from "./Shared/Components/SideBar/SideBar";
import {BrowserRouter} from "react-router-dom";
import {Route, Router, Switch, useLocation, useRouteMatch} from "react-router";
import HomePage from "./Shared/Components/Home";
import Department from "./Modules/Department/Department";
import Staff from "./Modules/Staff/Staff";
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <BrowserRouter>
                <div className="wrapper">
                    <SideBar/>
                    <Header/>
                    <div className="page-wrapper">
                        <div className="content-wrapper">
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/departments" component={Department} />
                            </Switch>
                            <footer className="footer mt-auto">
                                <div className="copyright bg-white">
                                    <p>
                                        © <span id="copy-year">2019</span> Copyright Sleek Dashboard Bootstrap
                                        Template by
                                        Company Active
                                        .
                                    </p>
                                </div>
                            </footer>
                        </div>

                    </div>
                </div>
            </BrowserRouter>


    );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
