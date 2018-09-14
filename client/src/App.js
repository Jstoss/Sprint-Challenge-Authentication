import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Jokes from './components/Jokes';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Jokes} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    );
  }
}

export default App;
