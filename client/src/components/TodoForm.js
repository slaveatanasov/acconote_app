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
    if(this.state.inputValue !== "") {
      this.props.addTodo(this.state.inputValue);
      this.setState({
        inputValue: ""
      })
    } else {
      window.alert("Enter a task before submitting...")
    }
  }

  render() {
    return(
      <div>
        <input ref={input => input && input.focus()} placeholder="Add your task here..." type="text" name="inputValue" value={this.state.inputValue} onChange={this.handleChange}/>
        <button className="waves-effect waves-light #80cbc4 teal lighten-1 btn" onClick={this.onSubmit}>Add task...</button>
      </div>
    )
  }
}

export default TodoForm;