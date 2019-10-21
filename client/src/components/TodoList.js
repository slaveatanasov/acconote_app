import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import DeleteBox from './DeleteBox';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [deleteBoxStatus, setDeleteBoxStatus] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/todos')
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  const addTodo = todoValue => {
    const todo = { text: todoValue };
    axios
      .post('http://127.0.0.1:5000/api/todos', todo)
      .then(res => {
        let newTodo = res.data;
        setTodos([...todos, newTodo]);
      })
      .catch(err => console.log(err.response));
  };

  const deleteTodo = todoId => {
    axios
      .delete(`http://127.0.0.1:5000/api/todos/${todoId}`)
      .then(() => {
        const todosFiltered = todos.filter(todo => todo._id !== todoId);
        setTodos(todosFiltered);
      })
      .then(() => console.log('Todo deleted.'))
      .catch(err => console.log(err.response));
  };

  const toggleTodo = todo => {
    let updTodo = { ...todo, completed: !todo.completed };
    axios
      .put(`http://127.0.0.1:5000/api/todos/${todo._id}`, updTodo)
      .then(() => {
        const todoState = todos.map(todo =>
          todo._id === updTodo._id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
        setTodos(todoState);
      });
  };

  const onDragStartFn = (e, itemId) => {
    console.log(e);
    console.log(itemId);
    // console.log(`Drag started, item id: ${itemId}`);
    e.dataTransfer.setData('itemId', itemId);
  };

  const onDragEndFn = itemId => {
    console.log(`Drag ended, item id: ${itemId}`);
    setDeleteBoxStatus(false)
  };

  const onDragOverFn = e => {
    e.preventDefault();
    setDeleteBoxStatus(true)
  };

  const onDragLeaveFn = e => {
    e.preventDefault();
    setDeleteBoxStatus(false)
  }

  const onDragDropFn = e => {
    let itemId = e.dataTransfer.getData('itemId');
    console.log(`Drag drop, item id: ${itemId}`);
    axios
      .delete(`http://127.0.0.1:5000/api/todos/${itemId}`)
      .then(() => {
        const todosRefined = todos.filter(todo => todo._id !== itemId);
        setTodos(todosRefined);
      })
      .then(() => console.log('Todo deleted.'))
      .catch(err => console.log(err.response));
  };

  //@TODO - see how to make it work with hooks without binding this
  const todosAll = todos.map(item => (
    <TodoItem
      key={item._id}
      {...item}
      onDelete={deleteTodo.bind(this, item._id)}
      onToggle={toggleTodo.bind(this, item)}
      onDragStartFn={(e) => onDragStartFn(e, item._id)}
      onDragEndFn={onDragEndFn.bind(this, item._id)}
      // onDragOverFn={this.onDragOverFn.bind(this, item._id)}
      // onDragDropFn={this.onDragDropFn.bind(this)}
    />
  ));
  
  return (
    <div className="row">
      <TodoForm addTodo={addTodo} />
      <br />
      <div className="col s9">
        <ul className="collection todo-list">{todosAll}</ul>
      </div>
      <DeleteBox
        overDeleteBoxStatus={deleteBoxStatus}
        onDragOverFn={onDragOverFn.bind(this)}
        onDragDropFn={onDragDropFn.bind(this)}
        onDragLeaveFn={onDragLeaveFn.bind(this)}
      />
    </div>
  );
};

export default TodoList;
