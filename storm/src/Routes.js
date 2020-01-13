import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import AuthorizedRecruiterRoute from "./components/AuthorizedRecruiterRoute";
import AuthorizedCandidateRoute from "./components/AuthorizedCandidateRoute";
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
      <AuthorizedRecruiterRoute path="/admin" exact component={AdminView} appProps={appProps} />
      <AuthorizedRecruiterRoute path="/test/:id" exact component={Test} appProps={appProps}/>
      <AuthorizedRecruiterRoute path="/test/edit/:id" exact component={EditTest} appProps={appProps}/>
      <AuthorizedCandidateRoute path="/candidate" exact component={Candidate} appProps={appProps}/>
       {/* <AuthorizedRecruiterRoute path="/candidates" exact component={Candidates} appProps={appProps}/> */}
      <AuthorizedRecruiterRoute Route exact path="/admin/candidates" component={(props) => <Candidates {...props}/>}/>
      <AuthorizedCandidateRoute path="/candidate/solve/:id" exact component={SolveTest} appProps={appProps}/>
      <AuthorizedCandidateRoute path="/candidate/rate/:id" exact component={Rate} appProps={appProps}/>
      <AuthorizedRecruiterRoute path="/candidates/add" exact component={AddCandidate} appProps={appProps} />
      <AuthorizedRecruiterRoute Route exact path="/admin/createTest" component={(props) => <CreateTest {...props}/>} />
     <Route component={NotFound} /> { /* Finally, catch all unmatched routes */ }
    </Switch>
  );
}
