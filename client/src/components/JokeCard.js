import React from 'react';

const JokeCard = ({ type, setup, punchline }) => {
  return(
    <div className="joke-card">
      <h3>{setup}</h3>
      <h5>{type}</h5>
      <p>{punchline}</p>
    </div>
  );
}

export default JokeCard;
