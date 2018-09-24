import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Note extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Panel>
					<Panel.Heading>{this.props.note.createdAt}</Panel.Heading>
					<Panel.Body>{this.props.note.body}</Panel.Body>
				</Panel>
			</div>
		);
	}
}

export default Note;
