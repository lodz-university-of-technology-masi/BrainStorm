import React from "react"

class Form extends React.Component {
    state = {
        test: [],
        author: "",
        test_id: ""
    }
    

    addQuestion = () => {
        this.setState((prevState) => ({
            test: [...prevState.test, {question: " ", answer: [" "]}],
        }));
    }

    addClosedQuestion = () => {
        this.setState((prevState) => ({
            test: [...prevState.test, {question: " ", answer: [" "," "," "," "]}],
        }));
    }

    handleChange = (e) => {
        if (["question"].includes(e.target.className)) {
            let test = [...this.state.test]
            test[e.target.dataset.id][e.target.className] = e.target.value
            //this.setState({test}, () => console.log(this.state.test))
        }
        else if(["answer"].includes(e.target.className)){
            let test = [...this.state.test]
            test[e.target.dataset.idt][e.target.className][e.target.dataset.id] = e.target.value
        }
        else {
            this.setState({[e.target.name]: e.target.value})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    addToBase= () => {
      const test={ id:"" , candidate:"",title:"test rekrutacyjny",questions:[]}
      test.id = this.state.test_id
      test.candidate = this.state.author
      this.state.test.map((t,idx)=>{
          var w = {id:""+idx ,question:t.question,answer:t.answer,context:"Pytanie"+idx+1}
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

    render() {
        let {author, test_id, test} = this.state
        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <label htmlFor="author">Candidate</label>
                <input type="text" name="author" id="author" defaultValue={author}/>
                <label htmlFor="test_id">Test id</label>
                <input type="text" name="test_id" id="test_id" defaultValue={test_id}/>
                <p>
                    <button onClick={this.addQuestion}>Add new open question</button>
                </p>
                <p>
                    <button onClick={this.addClosedQuestion}>Add new closed question</button>
                </p>
                {
                    test.map((val, idx) => {
                        let questionId = `Question - ${idx}`, answerId = `Answer - ${idx}`
                        return (
                            <div key={idx}>
                                <label htmlFor={questionId}>{`Question #${idx + 1}`}</label>
                                <input
                                    type="text"
                                    name={questionId}
                                    data-id={idx}
                                    id={questionId}
                                    className="question"
                                />
                               {val.answer.map((answ,idxx)=>{
                                   let aId = `Answer - ${idxx}`
                                   {if(idxx !=0){return(<div>
                                    <label htmlFor={aId}>{`opd #${idxx}`}</label>
                                    <input
                                        type="text"
                                        name={aId}
                                        data-id={idxx}
                                        data-idt={idx}
                                        id={aId}
                                        className="answer"
                                    />
                                    </div>
                                 )}}
                                    })}
                                {/* <label htmlFor={answerId}>{`Answer #${idx + 1}`}</label>
                                <input
                                    type="text"
                                    name={answerId}
                                    data-id={idx}
                                    id={answerId}
                                    className="answer"
                                /> */}
                            </div>
                        )
                    })
                }
              
                <input type="submit" value="Submit"/>
                <button onClick={this.addToBase}>Base</button>
                <div></div>
            </form>
             

        )
    }
}

export default Form