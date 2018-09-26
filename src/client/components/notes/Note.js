import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import moment from 'moment';

class Note extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Panel>
					<Panel.Heading>{moment(this.props.note.createdAt).format('MM-DD-YYYY')}</Panel.Heading>
					<Panel.Body>{this.props.note.body}</Panel.Body>
				</Panel>
			</div>
		);
	}
}

export default Note;
