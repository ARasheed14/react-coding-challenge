import React, { Component } from "react";
import { render } from "react-dom";

import { Router, Route, browserHistory, IndexRoute } from "react-router";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Root } from "./components/Root";
import { User } from "./components/User";

class App extends Component {

  render() {
    return (
        <Router history={browserHistory}>
            <Route path={"/"} component={Root} >
                <IndexRoute component={Home}/>
                <Route path={"user"} component={User} />
                <Route path={"home"} component={Home} />
            </Route>
            <Route path={"home-single"} component={Home}/>
        </Router>
    );
  }
}

render(<App/>, window.document.getElementById("app"));
