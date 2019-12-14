import React from "react"
class Form extends React.Component {
  state = {
    test: [{question:"", age:""}],
  }
  render() {
    let {test} = this.state
    return (
      <form>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" />
        <label htmlFor="id">Test id</label>
        <input type="text" name="id" id="id" />
        <p><button>Add new question</button></p>
        {
          test.map((val, idx)=> {
            let questionId = `cat-${idx}`, ageId = `age-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={questionId}>{`Cat #${idx + 1}`}</label>
                <input
                  type="text"
                  name={questionId}
                  data-id={idx}
                  id={questionId}
                  className="name"
                />
                <label htmlFor={ageId}>Age</label>
                <input
                  type="text"
                  name={ageId}
                  data-id={idx}
                  id={ageId}
                  className="age"
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