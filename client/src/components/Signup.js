import React, { Component } from 'react';
import AuthForm from './AuthForm';
import axios from 'axios';

class Signup extends Component{
  state = {
    username: '',
    password: '',
  };

  componentDidMount(){
    if(localStorage.getItem('user')){
      this.props.history.push('/');
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('http://localhost:3300/api/register', newUser)
          .then(user => {
            localStorage.setItem('user', user.data.username);
            localStorage.setItem('token', user.data.token);
            this.props.history.push('/');
          })
          .catch(err => console.log(err));
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
