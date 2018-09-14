import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import JokeCard from './JokeCard';

class Jokes extends Component {
  state = {
    jokes: [],
    isLoggedIn: false,
    username: null,
    token: null,
  }

  componentDidMount(){
    if(localStorage.getItem('user')){
      const token = localStorage.getItem('token');
      const options = {
        headers: {
          Authorization: token
        }
      };

      axios.get('http://localhost:3300/api/jokes', options)
            .then(res => {
              const jokes = res.data.filter((joke, pos, self) => self.findIndex(t => t.id === joke.id) === pos);
              this.setState({ isLoggedIn: true,
                                          username: localStorage.getItem('user'),
                                          token,
                                          jokes
                                        });

            })
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
    this.setState({ isLoggedIn: false, username: null, token: null, jokes: [] })
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
