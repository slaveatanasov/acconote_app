import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
	const [inputValue, setInputValue] = useState('');

	const handleChange = e => {
		setInputValue(e.target.value);
	};

	const onSubmit = e => {
		e.preventDefault();
		if (inputValue !== '') {
			addTodo(inputValue);
			setInputValue('');
		} else {
			window.alert('Enter a task before submitting...');
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					ref={input => input && input.focus()}
					placeholder='Add your task here...'
					type='text'
					name='inputValue'
					value={inputValue}
					onChange={handleChange}
				/>
				<button
					className='waves-effect waves-light #80cbc4 teal lighten-1 btn add-task-btn'
					type='submit'
				>
					Add task
				</button>
			</form>
		</div>
	);
};

export default TodoForm;
