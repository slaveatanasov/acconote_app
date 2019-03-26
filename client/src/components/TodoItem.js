import React from 'react';
import classnames from 'classnames';

const TodoItem = ({text, completed, onDelete, onToggle, onDragStartFn, onDragEndFn, onDragOverFn}) => {
  const todoDecoration = classnames({
    'strike-through': completed
  })
  return(
    <li className="collection-item" draggable="true" onDragStart={onDragStartFn} onDragEnd={onDragEndFn} onDragOver={onDragOverFn}>
      <span className={todoDecoration} onClick={onToggle}>{text}</span>
      <span><button onClick={onDelete}>X</button></span>
    </li>
  )
}

export default TodoItem;