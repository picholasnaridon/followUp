import React, { Component } from 'react';
import moment from 'moment';

class DealCloseTime extends Component {
	render() {
		var lastItem = this.props.updates.pop();
		var startingDate = moment(lastItem.creationDate);
		var endingDate = moment(lastItem.createdAt);
		var daysToClose = endingDate.diff(startingDate, 'days');
		if (this.props.stage === 'Closed Won' || this.props.stage === 'Closed Lost') {
			return <div style={{ textAlign: 'center' }}>Days to close: {daysToClose} </div>;
		} else {
			return <div />;
		}
	}
}

export default DealCloseTime;
