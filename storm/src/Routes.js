import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AdminView from "./containers/AdminView";
import CreateTest from "./containers/Test/CreateTest";
import Test from "./containers/Test";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/" exact component={Home} appProps={appProps} />
      <Route path="/login" exact component={Login} appProps={appProps} />
      <Route path="/admin" exact component={AdminView} appProps={appProps} />
      <Route path="/admin/:id" exact component={Test} />
      <Route Route exact path="/admin/createTest" component={(props) => <CreateTest {...props}/>} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <Route component={NotFound} /> { /* Finally, catch all unmatched routes */ }
    </Switch>
  );
}