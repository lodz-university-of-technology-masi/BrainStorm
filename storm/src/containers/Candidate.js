import React from 'react';
import { Link } from "react-router-dom";


export default function Candidate(props){


    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidate/" + props.match.params.can, false)	
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send(null)
    const dane = JSON.parse(xmlHttp.response)
    console.log(dane)




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


    </div>
)



}