import React from 'react';
import classnames from 'classnames';

const TodoItem = ({ todo, onToggle, onDragStart, onDragEnd }) => {
	const todoItemClasses = classnames({
		'collection-item': todo.text,
		'red-completed': todo.completed
	});

	return (
		<li
			id={todo._id}
			className={todoItemClasses}
			draggable='true'
			onDragStart={e => onDragStart(e)}
			onDragEnd={e => onDragEnd(e)}
			onClick={() => onToggle(todo)}
		>
			<span>{todo.text}</span>
		</li>
	);
};

export default TodoItem;
