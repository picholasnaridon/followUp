import React, { Component } from 'react';
import moment from 'moment';

class DealCloseTime extends Component {
	render() {
		var lastItem = this.props.updates.pop();
		var startingDate = moment(lastItem.creationDate);
		var endingDate = moment(lastItem.createdAt);
		var daysToClose = endingDate.diff(startingDate, 'days');
		return <div>Days to close: {daysToClose} </div>;
	}
}

export default DealCloseTime;
