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
import Candidate from "./containers/Candidate";
import CandidateView from "./containers/CandidateView";
import SolveTest from "./containers/SolveTest";
//import addTest from "./containers/Test/addTest";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Route path="/" exact component={Home} appProps={appProps} />
      <Route path="/login" exact component={Login} appProps={appProps} />
      <Route path="/admin" exact component={AdminView} appProps={appProps} />
      <Route path="/test/:id" exact component={Test} appProps={appProps}/>
      <Route path="/candidate" exact component={CandidateView} appProps={appProps}/>
      <Route path="/ctest/:can" exact component={Candidate} appProps={appProps}/>
      <Route path="/candidate/solve/:id" exact component={SolveTest} appProps={appProps}/>
      <Route Route exact path="/admin/createTest" component={(props) => <CreateTest {...props}/>} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <Route component={NotFound} /> { /* Finally, catch all unmatched routes */ }
    </Switch>
  );
}