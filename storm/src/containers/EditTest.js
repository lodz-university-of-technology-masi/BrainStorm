import React from 'react';
import {Link} from "react-router-dom";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/a/test/" + props.match.params.id, false)
        xmlHttp.setRequestHeader("Accept", "application/json")
        xmlHttp.send(null)
        //const dane = JSON.parse(xmlHttp.response)

        //console.log(this.state.iterator)
        this.state = {dane: JSON.parse(xmlHttp.response)};
    }

    edit(dane){
         console.log(dane)
        var d = JSON.stringify(dane)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("POST", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/add", false)
        xmlHttp.setRequestHeader("Accept", "application/json")
        console.log(d)
        xmlHttp.send(d)
        console.log("czesc")
        let path = `/admin` ;
        this.props.history.push({
            pathname: path,
            
        });
    }

    render(){
        return(
            <div>
                <h1>Test</h1>
            <p>Identyfikator testu:{this.state.dane.id}</p>
            <p>Kandydat: <input type="text" onChange={event => { this.state.dane.candidate = event.target.value}} defaultValue={this.state.dane.candidate}></input></p>
            <p>Nazwa testu:<input type="text" onChange={event => { this.state.dane.title = event.target.value}} defaultValue={this.state.dane.title}></input></p>
        <h3 class = "name">Pytania</h3>
        <table class = "table" style={{backgroundColor: "lightgray"}}>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Treść pytania</th>
                    <th>Odpowiedz</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.dane.questions.map((question)=>{
                        return (
                            <tr>
                            <td><input type="text" onChange={event => { question.context = event.target.value}} defaultValue={question.context}></input></td>
                            <td><input type="text" onChange={event => { question.question = event.target.value}} defaultValue={question.question}></input></td>
                            <td>{question.answer.map((answ,idx)=>{
                                if(idx == 0){
                                return (
                                    <td>{answ}|</td>
                                    )
                                }
                                else{
                                    return(
                                    <td><input type="text" onChange={event => { answ = event.target.value}} defaultValue={answ}></input></td>
                                    )
                                }
                            })}</td>
                            </tr>
                        )
                    })}
                    <p><Link to={"/admin"}>Powrot</Link></p>
                    <button onClick={() => {this.edit(this.state.dane)}}>Edit</button>
                </tbody>
            
        </table>

            </div>
        )
    }

}

export default Edit;
