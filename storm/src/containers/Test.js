import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Test.css";

export default function Tests()
{
	const [testsList, setTestsList] = useState([])

	useEffect(() => {
		var xmlHttp = new XMLHttpRequest()
        // xmlHttp.open("GET", "https://tjkabfprh0.execute-api.us-east-1.amazonaws.com/sss/api-test", false)
        xmlHttp.open("GET", "https://8kh79md0x8.execute-api.us-east-1.amazonaws.com/yy", false)
		xmlHttp.setRequestHeader("Accept", "application/json")
        xmlHttp.send(null)
		setTestsList(JSON.parse(xmlHttp.responseText))
	}, [])

	return (
		<div className="Team">
			<div className="lander">
				<h1>Testy</h1>
				<table class="table">
					<thead>
						<tr>
							<th>Id</th>
							<th>Tytuł</th>
						</tr>
					</thead>
					<tbody>
                        <tr>
									<td>{testsList.body}</td>
									<td>{testsList.statusCode}</td>
								</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}