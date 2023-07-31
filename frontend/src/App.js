import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';

import HomePage from './pages/home-page/home-page';
import AddPage from './pages/add-page/add-page';
import EditPage from './pages/edit-page/edit-page';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route index element = {<HomePage />}></Route>
          <Route path="/add" element = {<AddPage/>}></Route>
          <Route path="/edit/:id" element = {<EditPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
