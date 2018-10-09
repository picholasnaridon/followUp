import { Doughnut } from 'react-chartjs-2';
import React, { Component } from 'react';

class RatioGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dealsByStage: {}
		};
	}
	componentDidMount() {
		var dealsByStage = {
			'Closed Won': 0,
			'Closed Lost': 0
		};
		fetch(`/api/deals/${this.props.userId}/stageCount`, { method: 'GET' })
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				json.forEach(function(deal) {
					dealsByStage[deal.stage] = deal.stageCount;
				});
				this.setState({ dealsByStage: dealsByStage });
			});
	}
	render() {
		return (
			<Doughnut
				data={{
					datasets: [
						{
							data: [ this.state.dealsByStage['Closed Lost'], this.state.dealsByStage['Closed Won'] ],
							backgroundColor: [ '#f4443a', '#1be246' ]
						}
					],
					labels: [ 'Lost', 'Won' ]
				}}
			/>
		);
	}
}

export default RatioGraph;
