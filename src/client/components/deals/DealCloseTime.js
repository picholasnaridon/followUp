import React, { Component } from 'react';
import moment from 'moment';

class DealCloseTime extends Component {
	render() {
		var lastItem = this.props.updates.pop();
		console.log(lastItem);

		var startingDate = moment(lastItem.creationDate);
		var endingDate = moment(lastItem.createdAt);

		var daysToClose = startingDate.diff(endingDate, 'days');
		return <div>Days to close: {daysToClose} </div>;
	}
}

export default DealCloseTime;
