import React from 'react';
import TodoList from './TodoList';

const App = () => {
	return (
		<div className='app container'>
			<div className='app-title center-align acconote-title'>
				<div className='app-logo'></div>
			</div>
			<TodoList />
		</div>
	);
};

export default App;
