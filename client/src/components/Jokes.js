import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import JokeCard from './JokeCard';

const URL = 'http://localhost:3300/api/jokes';

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

      axios.get(URL, options)
            .then(res => {
              let jokes = res.data.filter((joke, pos, self) => self.findIndex(t => t.id === joke.id) === pos);
              jokes = jokes.map(joke =>  Object.assign({}, joke, {show: false}) );
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
                                          flip={() => this.flipCard(joke.id)}
                                        />)
  }

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false, username: null, token: null, jokes: [] })
  }

  flipCard = id => {
    const newJokes = this.state.jokes.map(joke => {
      if(joke.id === id){
        return {
          ...joke,
          show: !joke.show
        }
      }else{
        return joke;
      }
    });
    this.setState({ jokes: newJokes });
  }

  reload = () => {
    const options = {
      headers: {
        Authorization: this.state.token
      }
    }
    axios.get(URL, options)
      .then(res => {
        let jokes = res.data.filter((joke, pos, self) => self.findIndex(t => t.id === joke.id) === pos);
        jokes = jokes.map(joke =>  Object.assign({}, joke, {show: false}) );
        this.setState({ jokes });

      })
      .catch(err => console.log(err));
  }

  render(){
    return(
      <React.Fragment>
        {this.state.isLoggedIn && (
          <React.Fragment>
            <h1>Hello {this.state.username}</h1>
            <div className="clickable" onClick={this.reload}>More Jokes</div>
            <div className="clickable" onClick={this.logout}>Log Out</div>
            {this.showJokes()}
          </React.Fragment>
        )}
        {!this.state.isLoggedIn &&
           <h1>Please <Link to="/login">Login</Link> or <Link to="signup">Signup</Link> to View Jokes</h1>
        }
      </React.Fragment>
    )
  }
}

export default Jokes;
