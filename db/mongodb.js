const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const init = () => {
  mongoose.connect(db, {useNewUrlParser: true})
    .then(connection => console.log('Connected to MongoDB.'))
    .catch(err => console.log(err))
}

module.exports = {
  init
}