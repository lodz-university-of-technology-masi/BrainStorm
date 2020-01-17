import React from 'react';
import './AdminView.css';
import { Link } from "react-router-dom";
import {Auth} from "aws-amplify";



 const list = [];


class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:"",dane:""};

        this.routeChange = this.routeChange.bind(this);
        this.goToCandidatesPage = this.goToCandidatesPage.bind(this);
        Auth.currentAuthenticatedUser().then(user => {
            this.setState({username: user.username});
            this.getAssignmentTable();
        });
    }

    routeChange() {
        let path = `/admin/createTest`;
        this.props.history.push({
            pathname: path,
            data: list // your data array of objects
        });
    }

    goToCandidatesPage(){
        let path = `/admin/candidates`;
        this.props.history.push({
            pathname: path,
            data: list
        });
    }

     del(id){
        console.log(id)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/delete/" + id, false)	
        xmlHttp.setRequestHeader("Accept", "application/json")
        xmlHttp.send(null)
        window.location.reload()
    }

    render() {
        console.log(this.state.username)
        return (
            <ul>
                <h1>Dostępne testy </h1>
                <table>
                    <thead>
                    <tr>
                        <th>Dane kandydata</th>
                        <th>Rodzaj testu</th>
                        <th>Edytuj</th>
                    </tr>
                    </thead>
                    <tbody>
                    { Object.keys(this.state.dane).map(iterator => {
							return (
								<tr>
									<td><Link to={ "/test/" + this.state.dane[iterator].id }>{ this.state.dane[iterator].candidate }</Link></td>
									<td>{ this.state.dane[iterator].title }</td>
                                    <td>
                                   
                                        <input type="submit" value="Usun" onClick={() => this.del(this.state.dane[iterator].id)}/>
                                     
                                        </td>
                                        <td><Link to={ "/test/edit/" + this.state.dane[iterator].id }>Edytuj</Link></td>
								</tr>
							)
						}) }
                    </tbody>
                </table>

                <button onClick={this.routeChange}>Stwórz test</button>
                <td>
                <button onClick={this.goToCandidatesPage}>Kandydaci</button>
                </td>
            </ul>
        );
    }
    getAssignmentTable = () => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/recrutertests/" + this.state.username, false);	
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.send(null);
        console.log(this.state.username)
        this.setState({dane: JSON.parse(xmlHttp.response)});
        Object.keys(this.state.dane).map(iterator => {console.log("test " + this.state.dane[iterator].id)})
        };
}

export default AdminView;
