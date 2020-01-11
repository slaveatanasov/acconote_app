const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');

// @route GET api/todos
// @descr Get todos
// @access Public
router.get('/', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json({noResults: "No todos found."}))
})

// @route GET api/todos/:id
// @descr Get todo by id
// @access Public
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json({noResults: "No todo found with that id."}))
})

// @route   POST api/todos
// @descr   Create todo
// @access  Public
router.post('/', (req, res) => {
  let newTodo = new Todo ({
    text: req.body.text
  });

  newTodo.save()
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json({error: "Could not save new todo."}))
})

// @route   DELETE api/todos
// @descr   Delete todo
// @access  Public
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Todo.deleteOne({_id: id})
    .then(() => res.json({result: `Deleted todo with id: ${id}`}))
    .catch(err => res.status(404).json({error: "Could not delete todo."}))
})

// @route   PUT api/todos
// @descr   Update todo
// @access  Public
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const modDate = new Date;
  const updatedTodo = {
    text: req.body.text,
    completed: req.body.completed,
    modified: modDate
  }
  Todo.updateOne({_id: id}, updatedTodo)
    .then(() => res.json({result: `Updated todo with id: ${id}`}))
    .catch(err => res.status(404).json({error: "Could not update todo."}))
})

module.exports = router;