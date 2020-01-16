import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import {LinkContainer} from "react-router-bootstrap";
import {Auth} from 'aws-amplify';



function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isRecruiter, userIsRecruiter] = useState(false);
 
  useEffect(() => {
    onLoad();
  }, []);


  async function onLoad() {
    try {
      await Auth.currentSession();
      let response = await Auth.currentAuthenticatedUser();
      let userType = response["attributes"]["custom:isRecruiter"];
      if (userType == 1) {
        userIsRecruiter(true);
      }
      else {
        userIsRecruiter(false);
      }
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

 async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    userIsRecruiter(false);
  }


  return (

    !isAuthenticating &&
    <div className="App container" >
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Start</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
          {isAuthenticated
  ? <NavItem onClick={handleLogout} href={"/login"}>Logout</NavItem>
  : <>
      <LinkContainer to="/login">
        <NavItem>Log in</NavItem>

      </LinkContainer>
    </>
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{isAuthenticated,userHasAuthenticated,isRecruiter,userIsRecruiter}}/>
    </div>

  );
}
export default App;