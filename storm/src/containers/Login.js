// import React, { useState } from "react";
// import { Auth } from "aws-amplify";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
// import { useFormFields } from "../libs/hooksLib";
// import "./Login.css";
// import "../config.js"
// import { AWSCredentials } from "@aws-amplify/api/lib-esm/types";
// import config from "../config.js";
// import { CognitoUserPool } from 'amazon-cognito-identity-js'

// export default function Login(props) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fields, handleFieldChange] = useFormFields({
//     email: "",
//     password: ""
//   });

//   function validateForm() {
//     return fields.email.length > 0 && fields.password.length > 0;
//   }



//   async function handleSubmit(event) {
//     event.preventDefault();

//     setIsLoading(true);
//     try {
//       // await Auth.signIn(fields.email, fields.password);
//       // props.userHasAuthenticated(true);
//       //         // var temp, attributes;
//       //         // Auth.currentAuthenticatedUser(fields.email).then(temp => Auth.userAttributes(temp))
//       //         // .then(attributes => moveToUserHomePage(attributes));

//       //         Auth.currentCredentials().then(user => console.log(user))

//       // const use = Auth.currentAuthenticatedUser;
//       // alert("name " + use.name);
//       // props.history.push("/candidate");  
//       let response = await Auth.signIn(fields.email, fields.password);
//       let userType = response["attributes"]["email_verified"];
//       alert(userType.email_verified);
//     } catch (e) {
//       alert("Error" + e.message);
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="Login">
//       <form onSubmit={handleSubmit}>
//         <FormGroup controlId="email" bsSize="large">
//           <ControlLabel>Email</ControlLabel>
//           <FormControl
//             autoFocus
//             type="email"
//             value={fields.email}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <FormGroup controlId="password" bsSize="large">
//           <ControlLabel>Password</ControlLabel>
//           <FormControl
//             type="password"
//             value={fields.password}
//             onChange={handleFieldChange}
//           />
//         </FormGroup>
//         <LoaderButton
//             block
//             type="submit"
//             bsSize="large"
//             isLoading={isLoading}
//             disabled={!validateForm()}
//         >
//           Login
//         </LoaderButton>
//       </form>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import "./Login.css";
// import { Auth } from "aws-amplify";



// export default function Login(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function validateForm() {
//     return email.length > 0 && password.length > 0;
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     try {
//       let response = await Auth.signIn(fields.email, fields.password);
//       let userType = response["attributes"]["email_verified"];
//       alert(userType.email_verified);
//       // await Auth.signIn(email, password);
//       var moveToRecruiter = 0;
//       props.userHasAuthenticated(true);
//       // Auth.currentAuthenticatedUser()
//       //     .then(user => Auth.userAttributes(user))
//       //     .then(attributes => moveToUserHomePage(attributes))
//       //     .then(attributes => console.log(attributes))
//       //     .catch(err => alert(err));

//     } catch (e) {
//       alert(e.message);
//     }
//   }

//   function moveToUserHomePage(attributes) {
//     // let val  = attributes[2].getValue();
//     // if(val === "1"){
//     //   console.log("Going to recruiter main");
//     //   props.history.push("/admin");
//     // }
//     // else {
//       console.log("Going to candidate main");
//       props.history.push("/candidate");
//     // }


//   }
//   return (
//       <div className="Login">
//         <form onSubmit={handleSubmit}>
//           <FormGroup controlId="email" bsSize="large">
//             <ControlLabel>Email</ControlLabel>
//             <FormControl
//                 autoFocus
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//           </FormGroup>
//           <FormGroup controlId="password" bsSize="large">
//             <ControlLabel>Password</ControlLabel>
//             <FormControl
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 type="password"
//             />
//           </FormGroup>
//           <Button block bsSize="large" disabled={!validateForm()} type="submit">
//             Login
//           </Button>
//         </form>
//       </div>
//   );
// }
import React, { useState } from "react";
import {  FormGroup, FormControl, ControlLabel, HelpBlock, } from "react-bootstrap";
import "./Login.css";
import {Auth} from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";

export default function Login(props) {
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    username: "",
    password: "",
    confirmationCode: ""
  });

  function validateForm() {
    return fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      let response = await Auth.signIn(fields.username, fields.password);
     // let userType = response["attributes"]["email_verified"];
      props.userHasAuthenticated(true);
      Auth.currentAuthenticatedUser()
          .then(user => Auth.userAttributes(user))
          .then(attributes => console.log(attributes))
          .then(user => console.log(user))
          .catch(err => alert(err));
     // if(userType){
      //   props.history.push("/admin");
      //   props.userIsCandidate(false);
      // }
      // else if(!userType){
        props.history.push("/candidate");
      //   props.userIsCandidate(true);
      // }
      
    } catch (e) { // lapie tu ze nie jest potwierdzony klient
      alert(e);
      // props.history.push("/confirmationCode");
      setIsLoading(false);
    }
  }


  return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
                autoFocus
                type="username"
                value={fields.username}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={fields.value}
                onChange={handleFieldChange}
                type="password"
            />
          </FormGroup>
          <LoaderButton block bsSize="large" isLoading={isLoading} disabled={!validateForm()} type="submit">
            Login
          </LoaderButton>
        </form>
      </div>
  );







}