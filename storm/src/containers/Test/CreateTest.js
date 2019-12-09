import React from 'react';
import AdminView from "../AdminView";

const test = []
//const questions = []
//const answers = []
//const {data} = this.props.location

//const data = []

class CreateTest extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            questions: [],
             answers: [],
            //answers: "",
            question: "",
            answer: "",
            data: this.props.location
        }
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleQuestion(event) {
        this.setState({question: event.target.value})
    }

    handleAnswer(event) {
        this.setState({answer: event.target.value})
    }

    handleSubmit() {
        this.setState(({
            questions: this.state.questions.concat([this.state.question]),
            answers: this.state.answers.concat([this.state.answer])
        }))
        //questions.push(this.state.question)
        //answers.push(this.state.answer)
    }

    render() {
       return ( <div>
                           Pytania :
                {this.state.questions.map(item => {
                    return <li key={item}>{item}</li>;
                })}
                Odpowiedzi :
                {this.state.answers.map(item => {
                    return <li key={item}>{item}</li>;
                })}
                <form onSubmit={this.handleSubmit}>
                    <label>Dodaj pytanie :</label>
                    <td><input type="text" value={this.state.question} onChange={this.handleQuestion}/></td>
                    <label>Dodaj odpowiedz :</label>
                    <td><input type="text" value={this.state.answer} onChange={this.handleAnswer}/></td>
                    <input type="submit" value="Dodaj"/>
                </form>
       </div>);

        // return (
        //     <ul>
                // Pytania :
                // {this.state.questions.map(item => {
                //     return <li key={item}>{item}</li>;
                // })}
                // Odpowiedzi :
                // {this.state.answers.map(item => {
                //     return <li key={item}>{item}</li>;
                // })}
                // <form onSubmit={this.handleSubmit}>
                //     <label>Dodaj pytanie :</label>
                //     <td><input type="text" value={this.state.question} onChange={this.handleQuestion}/></td>
                //     <label>Dodaj odpowiedz :</label>
                //     <td><input type="text" value={this.state.answer} onChange={this.handleAnswer}/></td>
                //     <input type="submit" value="Dodaj"/>
                // </form>
        //     </ul>
        // );
    }
}

export default CreateTest;