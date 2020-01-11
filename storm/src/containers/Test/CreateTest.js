import React from "react"
import {Link} from "react-router-dom";
import CSVReader from 'react-csv-reader';

class Form extends React.Component {
    state = {
        test: [],
        candidate: "",
        test_id: ""
    }


    addQuestion = () => {
        this.setState((prevState) => ({
            test: [...prevState.test, {question: " ", answer: [" "]}],
        }));
    }

    addClosedQuestion = () => {
        this.setState((prevState) => ({
            test: [...prevState.test, {question: " ", answer: [" ", " ", " ", " "]}],
        }));
    }

    handleChange = (e) => {
        if (["question"].includes(e.target.className)) {
            let test = [...this.state.test]
            test[e.target.dataset.id][e.target.className] = e.target.value
            //this.setState({test}, () => console.log(this.state.test))
        } else if (["answer"].includes(e.target.className)) {
            let test = [...this.state.test]
            test[e.target.dataset.idt][e.target.className][e.target.dataset.id] = e.target.value
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    addToBase = () => {
        const test = {id: "", candidate: "",points:"-1", title: "test rekrutacyjny", questions: []}
        test.id = this.state.test_id
        test.candidate = this.state.candidate
        this.state.test.map((t, idx) => {
            var w = {id: "" + idx, question: t.question, answer: t.answer, context: "Pytanie" + idx + 1}
            test.questions.push(w)

        })
        console.log(test)
        var d = JSON.stringify(test)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("POST", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/add", false)
        xmlHttp.setRequestHeader("Accept", "application/json")
        console.log(d)
        xmlHttp.send(d)
        window.location.reload()

    }

    readFile = (data) => {
        this.setState({})
        this.state.test_id = data[0][0]
        this.state.candidate = data[1][0]
        for (let i = 2; i < data.length; i++) {
            if (data[i][0] === 'O') {
                this.state.test.push({question: data[i][1], answer: [" "]})
            } else {
                let answr = []
                for(let j = 2; j < data[i].length; j++){
                    answr.push(data[i][j])
                }
                this.state.test.push({question: data[i][1], answer: answr})
            }
        }
        //console.log(this.state)
        //console.log(this.state.test_id)
        //console.log(this.state.candidate)
        //console.log(data)
    }

    render() {
        let {candidate, test_id, test} = this.state
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="author">Kandydat</label>
                <input type="text" name="author" id="author" defaultValue={candidate} onChange={e => this.state.candidate = e.target.value}/>
                <label htmlFor="test_id">Test id</label>
                <input type="text" name="test_id" id="test_id" defaultValue={test_id}/>
                <p>
                    <button onClick={this.addQuestion}>Dodaj nowe pytanie otwarte</button>
                </p>
                <p>
                    <button onClick={this.addClosedQuestion}>Dodaj nowe pytanie zamkniete</button>
                </p>
                {
                    test.map((val, idx) => {
                        let questionId = `Pytanie - ${idx}`
                        return (
                            <div key={idx}>
                                <label htmlFor={questionId}>{`Pytanie #${idx + 1}`}</label>
                                <input
                                    type="text"
                                    name={questionId}
                                    data-id={idx}
                                    id={questionId}
                                    className="question"
                                />
                                {val.answer.map((answ, idxx) => {
                                    let aId = `Odpowiedz - ${idxx}`
                                    {
                                        if (idxx !== 0) {
                                            return (<div>
                                                    <label htmlFor={aId}>{`Odpowiedz #${idxx}`}</label>
                                                    <input
                                                        type="text"
                                                        name={aId}
                                                        data-id={idxx}
                                                        data-idt={idx}
                                                        id={aId}
                                                        className="answer"
                                                    />
                                                </div>
                                            )
                                        }
                                    }
                                })}
                            </div>
                        )
                    })
                }
                <button onClick={this.addToBase}>Dodaj</button>
                <p>Importuj plik z testem</p>
                <CSVReader onFileLoaded={data => this.readFile(data)}/>
                <p><Link to={"/admin"}>Powrot</Link></p>
            </form>
        )
    }
}

export default Form