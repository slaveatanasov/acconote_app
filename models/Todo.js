const mongoose = require('mongoose');

const Todo = mongoose.model(
  'todo', new mongoose.Schema({
    text: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false
    },
    created: {
      type: Date,
      default: Date.now
    },
    modified: {
      type: Date
    }
  })
);

module.exports = Todo;