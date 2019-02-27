import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import WTB_Card from "./containers/WTB";
import ProfileCard from "./containers/Profile"


export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/wtb" exact component={WTB_Card} />
    <Route path="/profile" exact component={ProfileCard} />
  </Switch>;