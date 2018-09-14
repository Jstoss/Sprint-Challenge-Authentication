import React, { Component } from 'react';
import AuthForm from './AuthForm';

class Signup extends Component{
  state = {
    username: '',
    password: '',
  };

  componentDidMount(){
    //check if already logged in user
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    //handle signup call here
  }

  render(){
    return(
      <AuthForm
        change={this.handleChange}
        submit={this.handleSubmit}
        username={this.state.username}
        password={this.state.password}
      />
    )
  }
}

export default Signup;
