import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Label } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const DealUpdates = (props) => {
	return (
		<div>
			<ListGroup>
				{props.updates.map(function(update) {
					return (
						<ListGroupItem key={update.id}>
							Changed from {update.startingVal} to {update.endingVal} on{' '}
							{moment(update.createdAt).format('MM-DD-YYYY')}
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</div>
	);
};

export default DealUpdates;
