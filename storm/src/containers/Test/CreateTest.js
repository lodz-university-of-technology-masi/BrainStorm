import React from "react"
class Form extends React.Component {
  state = {
    test: [{question:"", answer:""}],
      author: "",
      test_id: ""
  }

  addQuestion = () => {
    this.setState((prevState) => ({
      test: [...prevState.test, {question:"", answer:""}],
    }));
  }

  handleChange = (e) => {
      if (["question", "answer"].includes(e.target.className) ) {
    let test = [...this.state.test]
    test[e.target.dataset.id][e.target.className] = e.target.value
    this.setState({ test }, () => console.log(this.state.test))
  } else {
    this.setState({ [e.target.name]: e.target.value })
  }
  }

  handleSubmit = (event) => { event.preventDefault() }

  render() {
    let {test} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" />
        <label htmlFor="id">Test id</label>
        <input type="text" name="id" id="id" />
        <p><button onClick={this.addQuestion}>Add new question</button></p>
        {
          test.map((val, idx)=> {
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
                <label htmlFor={answerId}>{`Answer #${idx + 1}`}</label>
                <input
                  type="text"
                  name={answerId}
                  data-id={idx}
                  id={answerId}
                  className="answer"
                />
              </div>
            )
          })
        }
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default Form