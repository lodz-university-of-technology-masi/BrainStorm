import React from 'react';
import {Link} from "react-router-dom";


class Candidates extends React.Component {
    constructor(props) {
        super(props);
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidates/", false)	
        xmlHttp.setRequestHeader("Accept", "application/json")
        xmlHttp.send(null)
        this.routeChange = this.routeChange.bind(this);
        // console.log(dane)
        //const dane = JSON.parse(xmlHttp.response)

        //console.log(this.state.iterator)
        this.state = {dane: JSON.parse(xmlHttp.response)};
    }



    deleteUser(name){
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("POST", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidates/delete", false)	
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send("{\"userName\":\""+name+"\"}")
    window.location.reload()
    //console.log("{\"userName\":\""+name+"\"}")
}
    
     routeChange(){
        let path = `/admin/candidates/add` ;
        this.props.history.push({
            pathname: path,
            
        });
    }


render(){
return(
    <div>
        <h1>Zajerestrowani kandydaci </h1>
        <button onClick={this.routeChange}>Dodaj kandydata</button>
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Usun</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.dane.map((user) => {
							return (
								<tr>
									<td>{ user.username }</td>
									<td><button onClick={() => this.deleteUser(user.username)}>Usun kandydata</button></td>
								</tr>
							)
						}) }
                    </tbody>
                    <td><Link to={"/admin"}>Powrot do strony domowej</Link></td>

                </table>

    </div>
    )
}
}

export default Candidates;