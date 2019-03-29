import React from "react";

const DeleteBox = ({onDragDropFn, onDragOverFn}) => {
    return(
      <div className="delete-box col s3" onDrop={onDragDropFn} onDragOver={onDragOverFn}>
        <span>Drag here to delete.</span>
        <div className="trash-icon"><i className="fas fa-trash-alt"></i></div>
      </div>
    )
}

export default DeleteBox;