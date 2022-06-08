import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./components/TaskLoginProj/Login.js";
import Signup from "./components/TaskLoginProj/Signup.js";
// import Task from './components/Tasksproj/Task';
// import TaskList from './components/Tasksproj/TaskList';
import Tasky from "./components/Tasksproj/Tasky.js";
import { Nav } from "./components/TasksNav/Nav.js";
import {Auth} from "./components/auth/Auth.js";
// import { ToastContainer } from 'react-toastify'
import { useState, createContext } from 'react'

export const AppContext = createContext(null)

function App() {
  const [accessToken, setAccessToken] = useState('')

  return (
    <BrowserRouter>

      <AppContext.Provider value={{ accessToken, setAccessToken }}>
        <div style={{ background: ' linear-gradient(to right bottom, lightblue, whitesmoke)', margin: '0px', padding: '0px', height: '100vh' }}>
          <Nav />
          <hr />
          {/* <img style={{ height: '40vh' }} src={`https://mdbcdn.b-cdn.net/img/new/slides/031.webp`} alt="as" /> */}
          <Routes>
            {/* <Route path='/' element={<TaskList />} /> */}
            {/* <Route path='/:userid/:id' element={<Task />} /> */}
            
            <Route path='/' element={<Auth />} />
            <Route path='/' element={<Auth ><Tasky /></Auth >} />
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );

};

export default App;
