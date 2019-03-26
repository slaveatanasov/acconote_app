import React from "react";

const DeleteBox = ({onDragDropFn, onDragOverFn}) => {
    return(
      <div className="delete-box col s3" onDrop={onDragDropFn} onDragOver={onDragOverFn}>
        <span>The delete box.</span>
      </div>
    )
}

export default DeleteBox;