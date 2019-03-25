import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = () => {
    this.props.addTodo(this.state.inputValue);
    this.setState({
      inputValue: ""
    })
  }

  render() {
    return(
      <div>
        <input type="text" name="inputValue" value={this.state.inputValue} onChange={this.handleChange}/>
        <button onClick={this.onSubmit}>Add todo...</button>
      </div>
    )
  }
}

export default TodoForm;