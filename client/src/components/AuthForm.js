import React from 'react';

const AuthForm = ({ submit, change, username, password }) => {
  return(
    <form onSubmit={submit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={username}
          onChange={change}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          value={password}
          onChange={change}
          type="password"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AuthForm;
