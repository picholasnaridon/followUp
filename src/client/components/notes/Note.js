import React, { Component } from 'react';
import { Panel, ListGroupItem } from 'react-bootstrap';

import moment from 'moment';

class Note extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<ListGroupItem heading={2}> {moment(this.props.note.createdAt).format('MM-DD-YYYY')}</ListGroupItem>
				<ListGroupItem>{this.props.note.body}</ListGroupItem>
			</div>
		);
	}
}

export default Note;
