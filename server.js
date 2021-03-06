const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongodb = require('./db/mongodb');

const todos = require('./routes/api/todos');

mongodb.init();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Cors setup:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
      res.header('Access-Control-Allow-Methods', "GET, PUT, POST, PATCH, DELETE");
      return res.status(200).json({});
  }
  next()
});

app.use('/api/todos', todos);

// Static assets (React Frontend) for production:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + 'client', 'build', 'index.html'));  
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}.`));