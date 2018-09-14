const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('./middlewares');
const db = require('../database/dbConfig');
const jwtKey = require('../_secrets/keys').jwtKey;

const generateToken = user => {
  const payload = {
    username: user.username,
    id: user.id
  };
  const options = {
    expiresIn: '24hr',
    jwtid: '1234'
  };
  return jwt.sign(payload, jwtKey, options);
};

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let { username, password } = req.body;
  if(!username || !password) return res.status(422).json({ message: 'Missing data' });

  const hash = bcrypt.hashSync(password, 16);
  password = hash;

  db('users')
    .insert({ username, password })
    .then(ids => {
      const id = ids[0];
      db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ username: user.username, token });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
}

function login(req, res) {
  const { username, password } = req.body;
  if(!username || !password) return res.status(422).json({ message: 'Missing data' });

  db('users')
    .where({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);
        res.status(200).json({ username: user.username, token })
      }else if(!user){
        res.status(404).json({ message: 'Invalid Username' })
      }else{
        res.status(401).json({ message: 'Invalid Password' })
      }
    })
    .catch(err => res.status(500).json(err));
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
