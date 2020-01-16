import React from 'react';
import './AdminView.css';
import { Link } from "react-router-dom";


const test={ id:"55" , candidate:"can",title:"",questions:[{question:"cotam",answer:["jeden","dwa"],context:""}]}

const list = [];
var xmlHttp = new XMLHttpRequest()
xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/a", false)	
xmlHttp.setRequestHeader("Accept", "application/json")
xmlHttp.send(null)
const dane = JSON.parse(xmlHttp.response)


class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        let path = `/admin/createTest`;
        this.props.history.push({
            pathname: path,
            data: list // your data array of objects
        });
    }

    add(){
        //var d = "{\"id\":\"11\",\"title\":\"test rekrutacyjny\"}"
        var d = JSON.stringify(test)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("POST", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/add", false)	
        xmlHttp.setRequestHeader("Accept", "application/json")
        console.log(d)
        //xmlHttp.send(d)
        window.location.reload()
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
                    { dane.map((test) => {
							return (
								<tr>
									<td><Link to={ "/test/" + test.id }>{ test.id }</Link></td>
									<td>{ test.title }</td>
                                    <td>
                                   
                                        <input type="submit" value="Usun" onClick={() => this.del(test.id)}/>
                                     
                                        </td>
                                        <td><Link to={ "/test/edit/" + test.id }>Edytuj</Link></td>
								</tr>
							)
						}) }
                    </tbody>
                </table>

                <button onClick={this.routeChange}>Stwórz test</button>
            </ul>
        );
    }
}

export default AdminView;
