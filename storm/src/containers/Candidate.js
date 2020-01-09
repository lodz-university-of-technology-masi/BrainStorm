import React from 'react';
import { Link } from "react-router-dom";
import {Auth} from "aws-amplify";



export default function Candidate(props){


    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + props.match.params.can, false)	
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send(null)
    const dane = JSON.parse(xmlHttp.response)
    console.log(dane)

    async function checkIfAdmin(event){
        event.preventDefault();
        const user = await Auth.currentAuthenticatedUser();
        try {
            if (user.verifyAttribute({'custom:isRecruiter': '1'})) {
                Auth.currentAuthenticatedUser()
                    .then(user => console.log("jestes adminem"))
            } else{}
        }catch(e)
        {
            alert(e)
        }
    }



return(
    <div>
        <h1>Dostępne testy </h1>
                <table>
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
                <button onClick={checkIfAdmin}>Sprawdź swój status</button>

    </div>
)



}