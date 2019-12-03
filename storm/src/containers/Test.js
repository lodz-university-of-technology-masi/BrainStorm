import React from 'react';
import './Test.css';

export default function Test(props)
{
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/a/test/" + props.match.params.id, false)	
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send(null)
    const dane = JSON.parse(xmlHttp.response)

    return (
        <div>
        <h1>Test</h1>
        <div>Kandydat: {dane.candidate} Nazwa testu: {dane.title}</div>
        <h3>Pytania</h3>
        <table>
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
                            <td>{question.answer}</td>
                            </tr>
                        )
                    })}
                </tbody>
            
        </table>
        </div>

    );
}