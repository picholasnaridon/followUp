import React, { Component } from 'react';
import Main from './components/main/Main';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class App extends React.Component {
	render() {
		return (
			<div>
				<Main />
			</div>
		);
	}
}

export default App;
