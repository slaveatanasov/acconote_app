import React from 'react';
import classnames from 'classnames';

const DeleteBox = ({
	boxStatus,
	onDragDrop,
	onDragOver,
	onDragLeave
}) => {
	const trashIconClasses = classnames({
		"fas": true,
		'fa-trash-alt': true,
		'trash-icon-transform': boxStatus,
		'trash-icon-reset': !boxStatus
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
				<i className={trashIconClasses}></i>
			</div>
		</div>
	);
};

export default DeleteBox;
