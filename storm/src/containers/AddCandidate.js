import React from 'react';
import {Link} from "react-router-dom";


class AddCandidate extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
        this.state = {userName:"",password:""};
    }

    routeChange(){
        var user = JSON.stringify(this.state)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("POST", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/candidates/add", false)	
        xmlHttp.setRequestHeader("Accept", "application/json")
        xmlHttp.send(user)

        let path = `/admin/candidates` ;
        this.props.history.push({
            pathname: path,
            
        });
    }


    handleChangeName = (e) => {
        this.state.userName = e.target.value
    }

    handleChange = (e) => {
        if(e.target.type === "text"){
            this.state.userName = e.target.value
        }
        else{
            this.state.password = e.target.value
        }
    }

    handleChangePassword = (e) => {
        this.state.password = e.target.value
    }

    render(){
        return(
            <div>
             <form onChange={this.handleChange}><label for="u">Użytkownik </label>
             <input id="u" type="text" defaultValue={this.state.value}/>
             <label for="h">Hasło </label>
             <input id="h" type="password" defaultValue={this.state.value} minLength="6"/>
             <button onClick={this.routeChange}>Dodaj</button>
             </form>
             <td><Link to={"/admin/candidates"}>Cofnij</Link></td>
            </div>
            )
        }
        }
        
        export default AddCandidate;