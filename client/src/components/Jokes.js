import React, { Component } from 'react';

class Jokes extends Component {
  this.state = {
    jokes: [],
    isLoggedIn: null,
  }

  componentDidMount(){
    //check for token in localStorage
    //if so, load jokes,
    //if not display login message
  }

  showJokes = () => {
    return this.state.jokes.map(joke => <JokeCard
                                          key={joke.id}
                                          {...joke}
                                        />)
  }

  render(){
    return(
      <React.Fragment>
        {this.state.isLoggedIn ?  this.showJokes() :
                                  <h1>Please Login or Signup to View Jokes</h1>
        }
      </React.Fragment>
    )
  }
}

export default Jokes;
