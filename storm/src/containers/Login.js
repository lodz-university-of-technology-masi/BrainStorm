
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

      let userType = response["attributes"]["custom:isRecruiter"];
      console.log("userType " + userType);
      props.userHasAuthenticated(true);

     if (userType == 1) {
          props.history.push("/admin");
      }
      else {
        props.history.push("/candidate");
      }

      }catch
      (e)
      { // lapie tu ze nie jest potwierdzony klient
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