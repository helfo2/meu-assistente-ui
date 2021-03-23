import "./App.css";
import React from "react";
import MainContainer from "components/MainContainer";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#05445E",
    },
    secondary: {
      main: "#D8A7B1",
    },
    background: {
      default: "#D4F1F4",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainContainer />
    </ThemeProvider>
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
