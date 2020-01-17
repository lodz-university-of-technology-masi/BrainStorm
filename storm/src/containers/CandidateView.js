import React from 'react';
import { Link } from "react-router-dom";


class CandidateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.routeChange = this.routeChange.bind(this);
    }

    handleChange = (e) => {
        this.state.value = e.target.value
    }

    routeChange() {
        let path = `/ctest/`+ this.state.value ;
        this.props.history.push({
            pathname: path,
            
        });
    }

    render() {
        return (
            <div>
             <form onChange={this.handleChange}>
             <input type="text" defaultValue={this.state.value}/>
             </form>
             <button onClick={this.routeChange}>Tests</button>
         </div>
     );
 }
}



    export default CandidateView;