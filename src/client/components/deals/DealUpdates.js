import React, { Component } from 'react';
import moment from 'moment';

class DealUpdates extends Component {
	render() {
		return (
			<div>
				<h4>Deal History</h4>
				{this.props.updates.map(function(update) {
					return (
						<div key={update.id}>
							Changed from {update.startingVal} to {update.endingVal} on {update.createdAt}
						</div>
					);
				})}
			</div>
		);
	}
}

export default DealUpdates;
