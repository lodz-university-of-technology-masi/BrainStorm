import React from "react";
import {Link, Route} from "react-router-dom";
import NotAuthorized from "../containers/NotAuthorized";

export default function AuthorizedCandidateRoute({ component: C, appProps, ...rest }) {
    console.log("flagi " + appProps.isAuthenticated + " " + appProps.isRecruiter)
    return (
    <Route {...rest} 
        render = {
            props => {
                if(appProps.isAuthenticated && !appProps.isRecruiter) { //uwierzytelniony kandydat
                     return <C {...props} {...appProps}/>;
                } else {
                    return (
                        <Route component={NotAuthorized} />
                    )
                }
            }
               
        } 
    />
  );
}
