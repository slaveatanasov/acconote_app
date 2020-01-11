import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../config/index';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import DeleteBox from './DeleteBox';

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [deleteBoxStatus, setDeleteBoxStatus] = useState(false);

	useEffect(() => {
		axios
			.get(`${apiURL}/api/todos`)
			.then(res => {
				setTodos(res.data);
			})
			.catch(err => console.log(err.response));
	}, []);

	const addTodo = todoValue => {
		const todoItem = { text: todoValue };
		axios
			.post(`${apiURL}/api/todos`, todoItem)
			.then(res => {
				let todo = res.data;
				setTodos([...todos, todo]);
			})
			.catch(err => console.log(err.response));
	};

	const toggleTodo = todo => {
		let updTodo = { ...todo, completed: !todo.completed };
		axios
			.put(`${apiURL}/api/todos/${todo._id}`, updTodo)
			.then(() => {
				const todoState = todos.map(todo =>
					todo._id === updTodo._id
						? { ...todo, completed: !todo.completed }
						: todo
				);
				setTodos(todoState);
			});
	};

	const onDragStart = e => {
		e.persist()
		e.dataTransfer.setData('text/plain', e.target.id);
		e.dataTransfer.effectAllowed = 'move';
		console.log(`Drag start, item id: ${e.target.id}`);
	};

	const onDragEnd = e => {
		e.persist()
		setDeleteBoxStatus(false);
		console.log(`Drag end, item id: ${e.target.id}`);
	};

	const onDragOver = e => {
		e.preventDefault();
		setDeleteBoxStatus(true);
		e.dataTransfer.dropEffect = 'move';
	};

	const onDragLeave = e => {
		e.preventDefault();
		setDeleteBoxStatus(false);
		console.log(`Drag leave`);
	};

	const onDragDrop = e => {
		let itemId = e.dataTransfer.getData('text/plain');
		console.log(`Drag drop, item id: ${itemId}`);
		axios
			.delete(`${apiURL}/api/todos/${itemId}`)
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
				<ul className='collection'>{todoItems}</ul>
			</div>
			<DeleteBox
				boxStatus={deleteBoxStatus}
				onDragOver={onDragOver}
				onDragDrop={onDragDrop}
				onDragLeave={onDragLeave}
			/>
		</div>
	);
};

export default TodoList;
