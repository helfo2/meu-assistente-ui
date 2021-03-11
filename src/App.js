import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getUsers } from "./api";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Register from "./pages/Register";
import Preferences from "./components/Preferences";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "pages/PageNotFound";
import PrivateRoute from "components/PrivateRoute";
import Header from "components/Header";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// function App() {
//   const [users, setUsers] = useState([]);

//   const loadUsers = () => {
//     let d = [];
//     const test = getUsers().then(data => {
//       d = data;
//       console.log("data = ", data)
//       setUsers( d );
//     });

//     console.log("d = ", d);

//     renderUsers();
//   };

//   const renderUsers = () => {
//     if (users.length > 0) {
//       console.log("render = ", users);
//       return users.map((user) => {
//         return (<li key={user.name}>{user.email}</li>);
//       });
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">

//         <img src={logo} className="App-logo" alt="logo" />
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Meu assistente
//         </a>
//         <Button onClick={loadUsers}>
//         JESUS
//         </Button>
//         {
//           renderUsers()
//         }
//       </header>
//     </div>
//   );
// }

export default App;
