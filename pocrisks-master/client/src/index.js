import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import  App  from './App'
import LoginForm from './components/Login'

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/map" component={App} />
      <Route path="/" component={LoginForm} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

