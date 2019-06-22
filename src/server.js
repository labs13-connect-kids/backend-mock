//IMPORTS ⬇︎
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const middlewares = require('./middlewares');
const db = require('../data/dbConfig');

//MIDDLEWARE ⬇︎
server.use(helmet(), express.json(), morgan('dev'), cors());

//SANITY CHECK ⬇︎
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Sup ✌🏼 -Server' });
});

//POST METHOD ⬇︎ mocking eventTracking from mixPanel middleman API
server.post('/api/sendEvent', (req, res) => {
  let { emailAddress, event } = req.body;
  if (!emailAddress || !event) {
    res.status(400).json('Body must contain emailAddress and event');
  }
  const success = event.includes('success') ? 1 : 0;
  res.status(502).json({ emailAddress, success });
});

//POST METHOD ⬇︎ tracking emails to get list of those interested in family connections feature
server.post('/api/family_connections_interest', (req, res) => {
  db('famConInterest')
    .insert(req.body)
    .then(ids =>
      db('famConInterest')
        .where({ id: ids[0] })
        .then(email =>
          res
            .status(201)
            .json({ message: 'Email successfully added', emailAddress: email })
        )
    )
    .catch(err => res.status(500).json({ error: err }));
});

//GET METHOD ⬇︎ to retrieve all emails of interested users
server.get('/api/family_connections_interest', (req, res) => {
  db('famConInterest')
    .then(emails => res.status(200).json(emails))
    .catch(err => res.status(500).json({ error: err }));
});

//MIDDLEWARE ERROR CHECK ⬇︎
server.use(middlewares.notFound, middlewares.errorHandler);

//EXPORTS ⬇︎
module.exports = server;
