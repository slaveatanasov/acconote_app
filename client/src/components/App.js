import React, { Component } from 'react';

import TodoList from './TodoList';
// import DividerBox from './DividerBox';

class App extends Component {
  render() {
    return (
      <div className="app container">
        <div className="center-align hoverable acconote-title"><h1>Acconote App</h1></div>
        <TodoList />
        {/* <DividerBox /> */}
      </div>
    );
  }
}

export default App;
