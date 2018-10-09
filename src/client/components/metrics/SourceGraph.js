import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
class SourceGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dealsBySource: {}
		};
	}
	componentDidMount() {
		var dealsBySource = {
			'Social Media': 0,
			'Direct Mailing': 0,
			'Door to Door': 0,
			'Cold Call': 0,
			Referral: 0
		};
		fetch(`/api/users/${this.props.userId}/deals`, { method: 'GET' })
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				json.Deals.forEach(function(deal) {
					dealsBySource[deal.source] = dealsBySource[deal.source] + 1;
				});
				this.setState({ dealsBySource: dealsBySource });
			});
	}
	render() {
		return (
			<Pie
				data={{
					datasets: [
						{
							data: [
								this.state.dealsBySource['Social Media'],
								this.state.dealsBySource['Direct Mailing'],
								this.state.dealsBySource['Door to Door'],
								this.state.dealsBySource['Cold Call'],
								this.state.dealsBySource['Referral']
							],
							backgroundColor: [ '#f4d83a', '#1ee861', '#1abfe0', '#3b50ed', '#dc34e5' ]
						}
					],
					labels: [ 'Social Media', 'Direct Mailing', 'Door to Door', 'Cold Call', 'Referral' ]
				}}
			/>
		);
	}
}

export default SourceGraph;
