import React, { Component } from 'react';
import { Well, ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const DealUpdates = (props) => {
	return (
		<div>
			<Well>
				<ListGroup>
					{props.updates.map(function(update) {
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
};

export default DealUpdates;
