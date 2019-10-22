import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

	const onDragStart = (e, itemId) => {
		console.log(`Drag started, item id: ${itemId}`);
		e.dataTransfer.setData('itemId', itemId);
	};

	const onDragEnd = itemId => {
		console.log(`Drag ended, item id: ${itemId}`);
		setDeleteBoxStatus(false);
	};

	const onDragOver = e => {
		e.preventDefault();
		setDeleteBoxStatus(true);
	};

	const onDragLeave = e => {
		e.preventDefault();
		setDeleteBoxStatus(false);
	};

	const onDragDrop = e => {
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

	const todoItems = todos.map(item => (
		<TodoItem
			key={item._id}
			todo={item}
			onToggle={toggleTodo}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		/>
	));

	return (
		<div className='row'>
			<TodoForm addTodo={addTodo} />
			<br />
			<div className='col s9'>
				<ul className='collection todo-list'>{todoItems}</ul>
			</div>
			<DeleteBox
				deleteBoxStatus={deleteBoxStatus}
				onDragOver={onDragOver}
				onDragDrop={onDragDrop}
				onDragLeave={onDragLeave}
			/>
		</div>
	);
};

export default TodoList;
