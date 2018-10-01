import React, { Component } from 'react';
import { Well, ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

class DealUpdates extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updates: []
		};
	}

	render() {
		console.log('UPDATES', this.props);
		return (
			<div>
				<Well>
					<ListGroup>
						{this.props.updates.map(function(update) {
							return (
								<ListGroupItem key={update.id}>
									Changed from {update.startingVal} to {update.endingVal} on {update.createdAt}
								</ListGroupItem>
							);
						})}
					</ListGroup>
				</Well>
			</div>
		);
	}
}

export default DealUpdates;
