import React from 'react';
import classnames from 'classnames';

const DeleteBox = ({
	deleteBoxStatus,
	onDragDrop,
	onDragOver,
	onDragLeave
}) => {
	const deleteIconClasses = classnames({
		fas: true,
		'fa-trash-alt': true,
		'delete-box-change': deleteBoxStatus,
		'delete-box-return-default': !deleteBoxStatus
	});

	return (
		<div
			className='delete-box col s3'
			onDrop={e => onDragDrop(e)}
			onDragOver={e => onDragOver(e)}
			onDragLeave={e => onDragLeave(e)}
		>
			<span>Drag here to delete.</span>
        <div className='trash-icon'>
          <i className={deleteIconClasses}></i>
        </div>
		</div>
	);
};

export default DeleteBox;
