import React from 'react';
import './App.css';
import Layout from "./views/Layout";
import {Route, Routes} from "react-router-dom";
import Home from './views/Home';
import AddTodo from './views/AddTodo';
import UpdateTodo from "./views/UpdateTodo";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main: '#4a69bd'
        },
        secondary:{
            main: '#3d3d3d',
            light: '#4b4b4b'
        },
        background:{
          default: '#6ab04c'
        },
        text:{
            primary: '#333',
            secondary: '#555'
        },
        success:{
            main: '#8ebb8e',
            light: '#badc58',
        }
    },
    typography: {
        fontFamily: 'Rubik'
    }
})

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element = {<Layout/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/addTodo" element={<AddTodo/>}></Route>
                    <Route path="/updateTodo" element={<UpdateTodo/>}></Route>
                </Route>
            </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
