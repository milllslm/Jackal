import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import WTB_Card from "./containers/WTB";
import ProfileCard from "./containers/Profile"
import Signup from "./containers/Signup";
import AppliedRoute from "./containers/AppliedRoute";
import IconAvatars from "./containers/AppliedRoute";



export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
	<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
  </Switch>;

