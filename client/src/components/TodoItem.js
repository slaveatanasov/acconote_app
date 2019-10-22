import React from 'react';
import classnames from 'classnames';

const TodoItem = ({ todo, onToggle, onDragStart, onDragEnd, onDragOver }) => {
	const todoItemClasses = classnames({
		'collection-item': todo.text,
		'red-completed': todo.completed
	});

	return (
		<li
			className={todoItemClasses}
			draggable='true'
			onDragStart={e => onDragStart(e, todo._id)}
			onDragEnd={e => onDragEnd(e, todo._id)}
			onDragOver={onDragOver}
			onClick={() => onToggle(todo)}
		>
			<span>{todo.text}</span>
		</li>
	);
};

export default TodoItem;
