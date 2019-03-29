import React, { Component } from 'react';

import TodoList from './TodoList';

class App extends Component {
  render() {
    return (
      <div className="app container">
        <div className="app-title center-align hoverable acconote-title"><h1>Acconote App</h1></div>
        <TodoList />
      </div>
    );
  }
}

export default App;
