import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
        <Route exact path="/" component={Home} />
    </BrowserRouter>
  );
}

export default App;
