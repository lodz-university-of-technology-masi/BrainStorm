import React from 'react';
import { Link } from "react-router-dom";
import {Auth} from "aws-amplify";
import {Button} from "react-bootstrap";
  
class CandidateTests extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignedTests: JSON.parse('{"tests":[]}'),
            username: "",
            ready: false,
            dane: "",
        }
        Auth.currentAuthenticatedUser().then(user => {
                console.log(user.username);
                this.setState({username: user.username});
                this.getAssignmentTable();
                console.log(this.state.dane);
            });
    }
    

    render(){
    return(
        <div>   
            <h1>Dostępne testy </h1>
                    <table class="table" style={{backgroundColor: "lightgray"}}>
                        <thead>
                        <tr>
                            <th>Id testu</th>
                            <th>Rodzaj testu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        Object.keys(this.state.dane).map((key) => {
                            return(
                                <tr>
                                </tr>
                            );
                        })
                     }
                   
                        </tbody>
    
                    </table>
    
        </div>
    )}
    
    getAssignmentTable = () => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + this.state.username, false);
        // xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + USERNAME, false);	
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.send(null);
        this.state.dane = JSON.parse(xmlHttp.response);
        // this.state.dane.map((test));
        // console.log(this.state.dane[Object.keys(this.state.dane)[0]]);
        };
}


export default CandidateTests;