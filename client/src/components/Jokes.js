import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Jokes extends Component {
  this.state = {
    jokes: [],
    isLoggedIn: false,
  }

  componentDidMount(){
    if(localStorage.getItem('user')){
      const token = JSON.parse(localStorage.getItem('token'));
      const options = {
        headers: {
          Authorization: token
        }
      };

      axios.get('http://localhost:3300/api/jokes', options)
            .then(res => this.setState({ isLoggedIn: true,
                                          username: JSON.parse(localStorage.getItem('user')),
                                          token,
                                          jokes: res.data
                                        })
            )
            .catch(err => console.log(err));
    }
  }

  showJokes = () => {
    return this.state.jokes.map(joke => <JokeCard
                                          key={joke.id}
                                          {...joke}
                                        />)
  }

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  render(){
    return(
      <React.Fragment>
        {this.state.isLoggedIn && <h1>Hello {this.state.username}</h1>}
        {this.state.isLoggedIn && <div className="logout" onClick={this.logout}>Log Out</div>}
        {this.state.isLoggedIn ?  this.showJokes() :
                                  <h1>Please <Link to="/login">Login</Link> or <Link to="signup">Signup</Link> to View Jokes</h1>
        }
      </React.Fragment>
    )
  }
}

export default Jokes;
