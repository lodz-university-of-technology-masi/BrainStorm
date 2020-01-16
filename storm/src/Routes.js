import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import AdminView from "./containers/AdminView";
import CreateTest from "./containers/Test/CreateTest";
import Test from "./containers/Test";
import Candidate from "./containers/Candidate";
import Candidates from "./containers/Candidates";
import AddCandidate from "./containers/AddCandidate";
import SolveTest from "./containers/SolveTest";
import EditTest from "./containers/EditTest";
import Rate from "./containers/Rate";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/admin" exact component={AdminView} appProps={appProps} />
      <AppliedRoute path="/test/:id" exact component={Test} appProps={appProps}/>
      <AppliedRoute path="/test/edit/:id" exact component={EditTest} appProps={appProps}/>
      <AppliedRoute path="/candidate" exact component={Candidate} appProps={appProps}/>
      <AppliedRoute path="/candidates" exact component={Candidates} appProps={appProps}/>
      <AppliedRoute path="/candidate/solve/:id" exact component={SolveTest} appProps={appProps}/>
      <AppliedRoute path="/candidate/rate/:id" exact component={Rate} appProps={appProps}/>
      <AppliedRoute path="/candidates/add" exact component={AddCandidate} appProps={appProps} />
      <AppliedRoute Route exact path="/admin/createTest" component={(props) => <CreateTest {...props}/>} />
     <Route component={NotFound} /> { /* Finally, catch all unmatched routes */ }
    </Switch>
  );
}
