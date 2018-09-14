import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import Jokes from './components/Jokes';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Jokes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App;
