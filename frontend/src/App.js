import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';

import HomePage from './pages/home-page/home-page';
import AddPage from './pages/add-page/add-page';
import EditPage from './pages/edit-page/edit-page';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Data</Link></li>
          </ul>
        </nav>

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
