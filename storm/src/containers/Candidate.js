import React from 'react';
import { Link } from "react-router-dom";
import {Auth} from "aws-amplify";
import config from "../config.js";


export default function Candidate(props){


    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + config.currentUsername, false)	
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send(null)
    const dane = JSON.parse(xmlHttp.response)
    console.log(dane)
    async function becomeRecruiter(event) {
        event.preventDefault();
        try {
            let user = await Auth.currentAuthenticatedUser();
            props.userHasAuthenticated(true);
            const result = await Auth.updateUserAttributes(user, {'custom:isRecruiter': '1'})
        }catch(e){
            alert(e)
        }
    }
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
							return (
								<tr>
									<td>{ test.id }</td>
									<td>{ test.title }</td>
                                    <td><Link to={ "/candidate/solve/" + test.id }>Rozwiaz</Link></td>
								</tr>
							)
						}) }
                    </tbody>

                </table>
                 <button onClick={becomeRecruiter}>Sprawdź swój status</button> 

    </div>
)



}