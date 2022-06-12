import React, { useState, createContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/TaskLoginProj/Login.js";
import Signup from "./components/TaskLoginProj/Signup.js";
import Tasky from "./components/Tasksproj/Tasky.js";
import Task from './components/Tasksproj/Task.js'
import { Nav } from "./components/TasksNav/Nav.js";
import Auth from "./components/auth/Auth.js";
import About from "./components/TasksNav/About.js";
// import Axiosconfig from './components/TaskLoginProj/Axiosconfig.js';
import './App.css';
// import { ToastContainer } from 'react-toastify'

export const AppContext = createContext(null)

function App() {
  const [accessToken, setAccessToken] = useState('')

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ accessToken, setAccessToken }}>
        <div style={{ background: ' linear-gradient(to right bottom, lightblue, whitesmoke)', margin: '0px', padding: '0px', height: '100vh' }}>
          <Nav />
          <hr />
          <Routes>
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Auth ><Tasky /></Auth >} />
            <Route path='/update/:userid/:taskid' element={<Auth ><Task /></Auth >} />
            <Route path='/about' element={<Auth ><About /></Auth >} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );

};

export default App;
