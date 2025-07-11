
// import { useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TopNavigation from './components/TopNavigation';
import Tasks from './components/Tasks';
import Messages from './components/Messages';
import Leaves from './components/Leaves';

function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/topNavigation' element={<TopNavigation></TopNavigation>}></Route>
      <Route path='/tasks' element={<Tasks></Tasks>}></Route>
      <Route path='/msgs' element={<Messages></Messages>} ></Route>
      <Route path='/leaves' element={<Leaves></Leaves>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
