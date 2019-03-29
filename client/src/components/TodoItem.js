import React from 'react';
import classnames from 'classnames';

const TodoItem = ({text, completed, onToggle, onDragStartFn, onDragEndFn, onDragOverFn}) => {
  const todoLiDecoration = classnames({
    "collection-item": text,
    'red-completed': completed
  })
  return(
    <li className={todoLiDecoration} draggable="true" onDragStart={onDragStartFn} onDragEnd={onDragEndFn} onDragOver={onDragOverFn} onClick={onToggle}>
      <span>{text}</span>
    </li>
  )
}

export default TodoItem;