import React from 'react';
import { Link } from "react-router-dom";


// export default function CandidateView(){
//     const candidate=""
//     this.routeChange = this.routeChange.bind(this);
    
//     function routeChange() {
//         let path = `/candidate/` + candidate;
//         this.props.history.push({
//             pathname: path,
//               // your data array of objects
//         });
//     }

      

    // function changeCandidate(e){
    //     candidate = e.target.value
    // }
//     return(
//         <div>
//             <form onChange={changeCandidate}>
//             <input type="text" defaultValue={candidate}/>
//             </form>
//             <button onClick={routeChange}>Tests</button>
//         </div>
//     );
// }

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