import React from 'react';
import 'aws-sdk';
class SolveTest extends React.Component {


    constructor(props) {
        super(props);
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/a/test/" + props.match.params.id, false)
        xmlHttp.setRequestHeader("Accept", "application/json")
        xmlHttp.send(null)
        //const dane = xmlHttp.response["questions"];
        var AWS = require('aws-sdk')
        AWS.CognitoIdentityCredentials.bind(this);
        var cognitoidentity = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});
        AWS.config.update({
        credentials: AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:64814730-cf05-430a-8e0c-542467fe61b9',
        }),
            region: 'us-east-1'
    });
        AWS.config.credentials.get(function(err) {
            if (err) console.log(err);
            else console.log(AWS.config.credentials)
        });
        this.translator = new AWS.Translate();
        //console.log(this.state.iterator)
        this.state = {id: props.match.params.id, iterator: 0, dane: JSON.parse(xmlHttp.response), flaga: true};
        console.log(this.state.dane["questions"][0]["question"])

        console.log(this.state.dane["questions"][0]["question"])
        this.params = {
            SourceLanguageCode: 'pl', /* required */
            TargetLanguageCode: 'en', /* required */
            Text: this.state.dane["questions"][0]["question"], /* required */
        }
        this.translate = this.translate.bind(this);
    }

    translate(){
       this.translator.translateText(this.params, (err, data) => {
           if (err) console.log(err, err.stack); // an error occurred
           else     console.log(data);
       });

    }
    handleSubmit = () => {
        if (this.state.flaga) {
            this.state.dane.questions[this.state.iterator].answer[0] = document.getElementById("odp").value
            document.getElementById("odp").value = ""
        } else {
            var radio = document.getElementsByName('radio')
            for (var i = 0, length = radio.length; i < length; i++) {

                if (radio[i].checked) {
                    this.state.dane.questions[this.state.iterator].answer[0] = radio[i].value
                    radio[i].checked = false
                }
            }
        }
        this.state.iterator += 1
        this.state.flaga = true
        this.forceUpdate()
    }

    routeChange = () => {
        this.state.dane.points = "-2"
        var d = JSON.stringify(this.state.dane)
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.open("POST", "https://f628s6t6a9.execute-api.us-east-1.amazonaws.com/ss/add", false)
        xmlHttp.setRequestHeader("Accept", "application/json")
        console.log(d)
        xmlHttp.send(d)

        let path = `/candidate`;
        this.props.history.push({
            pathname: path,

        });
    }

    render() {
        const tab = ["s"]
        const numberOfQuestion = this.state.dane.questions.length
        console.log(this.state.dane)
        return (
            <div>

                <h1>{this.state.dane.title}</h1>
                <h4>{this.state.iterator}</h4>
                {tab.map(() => {
                        if (numberOfQuestion !== this.state.iterator) {
                            return (
                                <div>
                                    <h2>{this.state.dane.questions[this.state.iterator].question}</h2>
                                    {this.state.dane.questions[this.state.iterator].answer.map((answ, i) => {
                                        if (i !== 0) {
                                            this.state.flaga = false
                                            return (<form onClick={this.handleSubmit}><input type="radio" name="radio"
                                                                                             value={answ}/>{answ}</form>)
                                        }
                                    })}
                                    {tab.map(() => {
                                            if (this.state.flaga) {
                                                return (<div>
                                                        <form>
                                                            <input type="text" id="odp"></input>
                                                        </form>
                                                        <button onClick={this.handleSubmit}>Odpowiedz</button>
                                                        <button onClick={this.translate}>przetlumacz</button>
                                                    </div>
                                                )
                                            }
                                        }
                                    )}
                                </div>
                            )
                        } else {
                            return (<button onClick={this.routeChange}>Zakoncz test</button>)
                        }
                    }
                )}


            </div>
        )
    }
}

export default SolveTest;