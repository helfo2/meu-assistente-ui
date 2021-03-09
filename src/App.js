import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getUsers } from './api';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Register from './pages/Register';
import Preferences from './components/Preferences';
import Login from './pages/Login';


// function setToken(userToken) {
//   sessionStorage.setItem('token', userToken);
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   return tokenString;
// }

function App() {
  return (
    <div className="wrapper">
      
      <h1>Application</h1>
      {/* <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  )
};


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
