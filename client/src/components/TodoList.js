import React from 'react';
import axios from 'axios';

import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }
  
  componentDidMount() {
    axios.get('http://127.0.0.1:5000/api/todos')
      .then(data => {
        this.setState({todos: data.data})
      })
      .catch(err => console.log(err.response));
  }

  addTodo = (todoValue) => {
    const todo = {text: todoValue};
    axios.post('http://127.0.0.1:5000/api/todos', todo)
      .then(res => {
        let newTodo = res.data;
        this.setState({
          todos: [...this.state.todos, newTodo]
        })
      })
      .catch(err => console.log(err.response));
  }

  deleteTodo = (todoId) => {
    axios.delete(`http://127.0.0.1:5000/api/todos/${todoId}`)
    .then(() => {
      const todos = this.state.todos.filter(todo => todo._id !== todoId); 
      this.setState({
        todos: todos
      })
    })
    .then(() => console.log("Todo deleted."))
    .catch(err => console.log(err.response));
  }

  toggleTodo = (todo) => {
    // console.log(todo);
    let updTodo = {...todo, completed: !todo.completed}
    console.log(updTodo);
    axios.put(`http://127.0.0.1:5000/api/todos/${todo._id}`, updTodo)
    .then(() => {
      const todos = this.state.todos.map(todo => todo._id === updTodo._id ? {...todo, completed: !todo.completed} : todo); 
      this.setState({
        todos: todos
      })
    })
  }

  render() {
    const todos = this.state.todos.map(item => (
      <TodoItem 
        key={item._id}
        {...item}
        onDelete={this.deleteTodo.bind(this, item._id)}
        onToggle={this.toggleTodo.bind(this, item)}
      />
    ));
    return(
      <div className="container">
        <TodoForm addTodo={this.addTodo}/>
        <br />
        <ul className="collection">
          {todos}
        </ul>
      </div>
    )
  }
}

export default TodoList;