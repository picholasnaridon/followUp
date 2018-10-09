const funnelOptions = {
	onClick: function(event, bar) {
		location.href = '/#/deals';
	},
	scales: {
		xAxes: [
			{
				gridLines: {
					drawOnChartArea: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					min: 0,
					stepSize: 1
				},
				gridLines: {
					drawOnChartArea: false
				}
			}
		]
	}
};

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
class StageGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dealsByStage: {}
		};
	}
	componentDidMount() {
		var dealsByStage = {
			'Closed Won': 0,
			'Closed Lost': 0,
			Discovery: 0,
			'Initial Meeting': 0,
			'Proposal Sent': 0,
			'Contract Signed': 0,
			'Final Review': 0
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
			<div>
				<Bar
					height={500}
					width={700}
					data={{
						datasets: [
							{
								data: [
									this.state.dealsByStage['Discovery'],
									this.state.dealsByStage['Initial Meeting'],
									this.state.dealsByStage['Proposal Sent'],
									this.state.dealsByStage['Contract Signed'],
									this.state.dealsByStage['Final Review']
								],
								backgroundColor: [ '#f4d83a', '#1ee861', '#1abfe0', '#3b50ed', '#dc34e5' ],
								label: 'My Funnel'
							}
						],
						labels: [ 'Discovery', 'Initial Meeting', 'Proposal Sent', 'Contract Signed', 'Final Review' ]
					}}
					options={funnelOptions}
				/>
			</div>
		);
	}
}

export default StageGraph;
