import React, {setState} from 'react';
import { Link } from "react-router-dom";
import {Auth} from "aws-amplify";
import {Button} from "react-bootstrap";
  
class CandidateTests extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            dane: "",
        }
        Auth.currentAuthenticatedUser().then(user => {
                //console.log(user.username);
                this.setState({username: user.username});
                this.getAssignmentTable();
                //console.log(this.state.dane);
            });
    }
    

    render(){
    return(
        <div>
            <h1>Dostępne testy </h1>
                <table className="table" style={{backgroundColor: "lightgray"}}>
                    <thead>
                    <tr>
                        <th>Id testu</th>
                        <th>Rodzaj testu</th>
                    </tr>
                    </thead>
                    <tbody>
                    { Object.keys(this.state.dane).map(iterator => {
                        if(this.state.dane[iterator].points === "-1"){
							return (
								<tr>
									<td>{ this.state.dane[iterator].id }</td>
									<td>{ this.state.dane[iterator].title }</td>
                                    <td><Link to={ "/candidate/solve/" + this.state.dane[iterator].id }>Rozwiaz</Link></td>
								</tr>
                            )
                        }
                        else if(this.state.dane[iterator].points !== "-2"){
                            return (
								<tr>
									<td>{ this.state.dane[iterator].id }</td>
									<td>{ this.state.dane[iterator].title }</td>
                                    <td><Link to={ "/candidate/rate/" + this.state.dane[iterator].id }>Sprawdź wynik</Link></td>
								</tr>
                            )
                        }
						}) }
                    </tbody>

                </table>
        </div>
        )
    }    
    
    getAssignmentTable = () => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + this.state.username, false);
        // xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + USERNAME, false);	
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.send(null);
        this.setState({dane: JSON.parse(xmlHttp.response)});
        Object.keys(this.state.dane).map(iterator => {console.log("test " + this.state.dane[iterator].id)})
        };
}


export default CandidateTests;