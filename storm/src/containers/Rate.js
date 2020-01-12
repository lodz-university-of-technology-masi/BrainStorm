import React from 'react';
import {Link} from "react-router-dom";

export default function Rate(props)
{
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/a/test/" + props.match.params.id, false)	
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send(null)
    const dane = JSON.parse(xmlHttp.response)
    console.log(dane)

    return (
        <div>
        <h1>Twój wynik to: {dane.points}</h1>
            <p>Identyfikator testu: {dane.id}</p>
            <p>Kandydat: {dane.candidate}</p>
            <p>Nazwa testu:{dane.title}</p>
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
                    {dane.questions.map((question)=>{
                        return (
                            <tr>
                            <td>{question.context} </td>
                            <td>{question.question}</td>
                            <td>{question.answer.map((answ,idx)=>{
                                return (
                                    <td>{answ}|</td>
                                )
                            })}</td>
                            </tr>
                        )
                    })}
                    <p><Link to={"/candidate"}>Powrot</Link></p>
                </tbody>

            
        </table>
        </div>

    );
}