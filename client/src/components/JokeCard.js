import React from 'react';

const JokeCard = ({ type, setup, punchline, flip, show }) => {
  return(
    <div
      className="joke-card"
      onClick={flip}
    >
      <h5>{type}</h5>
      {!show ? <h3>{setup}</h3> :
                <p>{punchline}</p>}
    </div>
  );
}

export default JokeCard;
