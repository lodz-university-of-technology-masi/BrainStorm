// // import React, { useState, useEffect } from "react";
// // import { Link, withRouter } from "react-router-dom";
// // import { Nav, Navbar, NavItem } from "react-bootstrap";
// // import { LinkContainer } from "react-router-bootstrap";
// // import "./App.css";
// // import Routes from "./Routes";
// // import { Auth } from "aws-amplify";


// // function App(props) {
// //   const [isAuthenticating, setIsAuthenticating] = useState(true);
// //   const [isAuthenticated, userHasAuthenticated] = useState(false);
// //   const [isRecruiter, userIsRecruiter] = useState(false);

// //   useEffect(() => {
// //     onLoad();
// //   }, []);
  
  
// //   async function onLoad() {
// //     try {
// //       await Auth.currentSession();
// //       userHasAuthenticated(true);
// //     }
// //     catch(e) {
// //       if (e !== 'No current user') {
// //         alert(e);
// //       }
// //     }
  
// //     setIsAuthenticating(false);
// //   }
// //   async function handleLogout() {
// //     await Auth.signOut();
// //     userHasAuthenticated(false);
// //   }

// //   return (
// //     !isAuthenticating &&
// //     <div className="App container">
// //       <Navbar fluid collapseOnSelect>
// //         <Navbar.Header>
// //           <Navbar.Brand>
// //             <Link to="/">Home</Link>
// //           </Navbar.Brand>
// //           <Navbar.Toggle />
// //         </Navbar.Header>
// //         <Navbar.Collapse>
// //           <Nav pullRight>
// //           {isAuthenticated
// //             ? <NavItem onClick={handleLogout}>Logout</NavItem>
// //             : <>
// //                 <LinkContainer to="/signup">
// //                   <NavItem>Signup</NavItem>
// //                 </LinkContainer>
// //                 <LinkContainer to="/login">
// //                   <NavItem>Login</NavItem>
// //                 </LinkContainer>
// //               </>
// //           }
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Navbar>
// //       <Routes appProps={{ isAuthenticated, userHasAuthenticated, isRecruiter, userIsRecruiter }} />
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { Nav, Navbar, NavItem } from "react-bootstrap";
// import "./App.css";
// import Routes from "./Routes";
// import { LinkContainer } from "react-router-bootstrap";
// import { Auth } from "aws-amplify";
// // import logo from "./components/najlepszeLogo.png"
// function App(props) {
//     const [isAuthenticated, userHasAuthenticated] = useState(false);
//     const [isAuthenticating, setIsAuthenticating] = useState(true);

//     useEffect(() => {
//         onLoad();
//     }, []);

//     async function onLoad() {
//         try {
//             await Auth.currentSession();
//             userHasAuthenticated(true);
//         }
//         catch(e) {
//             if (e !== 'No current user') {
//                 alert(e);
//             }
//         }

//         setIsAuthenticating(false);
//     }

//     async function handleLogout() {
//         await Auth.signOut();
//         userHasAuthenticated(false);

//         props.history.push("/login");
//     }
//     return (
//         !isAuthenticating &&
//         <div className="App container">
//             <Navbar fluid collapseOnSelect>
//                 <Navbar.Header>
//                     <Navbar.Brand>
//                         <Link to="/">Recruit</Link>
//                     </Navbar.Brand>
//                     <Navbar.Toggle />
//                 </Navbar.Header>
//                 <Navbar.Collapse>
//                     <Nav pullRight>
//                         {isAuthenticated
//                             ? <NavItem onClick={handleLogout}>Logout</NavItem>
//                             : <>
//                                 <LinkContainer to="/signup">
//                                     <NavItem>Signup</NavItem>
//                                 </LinkContainer>
//                                 <LinkContainer to="/login">
//                                     <NavItem>Login</NavItem>
//                                 </LinkContainer>
//                             </>
//                         }
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>

//             <Routes appProps={{ isAuthenticated, userHasAuthenticated}} />
//         </div>
//     );
// }

// export default withRouter(App);
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem, DropdownButton} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import {LinkContainer} from "react-router-bootstrap";
import {Auth} from 'aws-amplify';

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isCandidate, userIsCandidate] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
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
        <Navbar.Collapse >
        </Navbar.Collapse >
        <Nav pullLeft>
          {((isCandidate == false) && (isAuthenticated == true)) ?//jestem rekruterem
              <>
                {/* <DropdownButton id="dropdown-basic-button" title="Tests">
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>List tests</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/addTest"}>
                    <NavItem>Add test</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/addTestToCandidate"}>
                    <NavItem>Add test to candidate</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>Import test</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>Test to check</NavItem>
                  </LinkContainer>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Candidate">
                  <LinkContainer to={"/addCandidate"}>
                    <NavItem>Add candidate</NavItem>
                  </LinkContainer> */}

                {/* </DropdownButton> */}
              </>
              : null
          }
          {((isCandidate == true) && (isAuthenticated == true)) ? //  jestem kandydatem
              <>
                    <LinkContainer to={"/candidate"}>
                      <NavItem>Candidate's home screen</NavItem>
                    </LinkContainer>
                    {/* <LinkContainer to={"/tests"}>
                      <NavItem>Available tests</NavItem>
                    </LinkContainer>
                    <LinkContainer to={"/results"}>
                      <NavItem>Check your results</NavItem>
                    </LinkContainer> */}
              </>
              : null
          }
        </Nav>
        <Navbar.Collapse>
          <Nav pullRight>
          {isAuthenticated
  ? <NavItem onClick={handleLogout} href={"/login"}>Logout</NavItem>
  : <>
      {/*<LinkContainer to="/signup">*/}
      {/*  <NavItem>Sing up</NavItem>*/}
      {/*</LinkContainer>*/}
      <LinkContainer to="/login">
        <NavItem>Log in</NavItem>
      </LinkContainer>
    </>
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{isAuthenticated,userHasAuthenticated,isCandidate,userIsCandidate}}/>
    </div>
  );
}
export default App;