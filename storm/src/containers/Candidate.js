import React from 'react';
import { Link } from "react-router-dom";
import {Auth} from "aws-amplify";
import config from "../config.js";

let USERNAME = "start";
export default function Candidate(props){


    var xmlHttp = new XMLHttpRequest();
    
    Auth.currentAuthenticatedUser().then(user => {
        USERNAME = user.username;
        console.log("ustawiony username: " + USERNAME);
    }).catch(e => console.log(e));
    // xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + "rutek", false);
    xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + USERNAME, false);	
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.send(null);
    const dane = JSON.parse(xmlHttp.response);
    const ifer =[""];
    // xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + "rutek", false);
    // // xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + Auth.user.username, false);	
    // xmlHttp.setRequestHeader("Accept", "application/json");
    // xmlHttp.send(null);
    // const dane = JSON.parse(xmlHttp.response);
    // const ifer =[""];
    // async function becomeRecruiter(event) {
    //     event.preventDefault();
    //     try {
    //         let user = await Auth.currentAuthenticatedUser();
    //         props.userHasAuthenticated(true);
    //         const result = await Auth.updateUserAttributes(user, {'custom:isRecruiter': '1'});
    //     }catch(e){
    //         alert(e)
    //     }
    // }
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
                    { dane.map((test) => {
                        if(test.points == "-1"){
							return (
								<tr>
									<td>{ test.id }</td>
									<td>{ test.title }</td>
                                    <td><Link to={ "/candidate/solve/" + test.id }>Rozwiaz</Link></td>
								</tr>
                            )
                        }
                        else if(test.points != "-2"){
                            return (
								<tr>
									<td>{ test.id }</td>
									<td>{ test.title }</td>
                                    <td><Link to={ "/candidate/rate/" + test.id }>Sprawdź wynik</Link></td>
								</tr>
                            )
                        }
						}) }
                    </tbody>

                </table>
                 <button onClick={becomeRecruiter}>Sprawdź swój status</button> 

    </div>
)


async function becomeRecruiter(event) {
    event.preventDefault();
    try {
        let user = await Auth.currentAuthenticatedUser();
        props.userHasAuthenticated(true);
        const result = await Auth.updateUserAttributes(user, {'custom:isRecruiter': '1'});
    }catch(e){
        alert(e)
    }
}
}