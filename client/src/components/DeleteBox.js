import React from "react";
import classnames from 'classnames';


const DeleteBox = ({onDragDropFn, onDragOverFn, onDragLeaveFn, overDeleteBoxStatus}) => {
  const deleteBoxClasses = classnames({
    "delete-box": true,
     "col": true, 
     "s3": true,
     "delete-box-big": overDeleteBoxStatus,
     "delete-box-return-default": !overDeleteBoxStatus
  })

    return(
      <div className={deleteBoxClasses} onDrop={onDragDropFn} onDragOver={onDragOverFn} onDragLeave={onDragLeaveFn}>
        <span>Drag here to delete.</span>
        <div className="trash-icon"><i className="fas fa-trash-alt"></i></div>
      </div>
    )
}

export default DeleteBox;