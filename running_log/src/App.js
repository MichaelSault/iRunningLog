import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login.component';
import SignUp from './component/signup.component';
import LogRun from './component/logRun.component';
import ViewRuns from './component/viewRuns.component';
import Progression from './component/progression.component';

import MenuAppBar from './component/menuBar.component';

function App() {

  return (
    <>
    <MenuAppBar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/LogRun' element={<LogRun />}/>
        <Route path='/Activity' element={<ViewRuns />}/>
        <Route path='/Progress' element={<Progression />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;