import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Grid, Row, Col } from 'react-bootstrap';
import { RecentActivity, DollarFormat } from '../components';

const funnelOptions = {
	onClick: function(event, bar) {
		console.log(bar[0]._model.label);
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
					beginAtZero: true
				},
				gridLines: {
					drawOnChartArea: false
				}
			}
		]
	}
};

class MyFunnel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deals: [],
			dealsByStage: {}
		};
		this.getTotalSales = this.getTotalSales.bind(this);
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
		fetch(`/api/users/${this.props.userId}/deals`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				json.Deals.forEach(function(deal) {
					dealsByStage[deal.stage] = dealsByStage[deal.stage] + 1 || 1;
				});
				this.setState({ deals: json.Deals, dealsByStage: dealsByStage });
			});
	}

	getTotalSales() {
		var total = 0;
		this.state.deals.forEach(function(deal) {
			if (deal.stage !== 'Closed Won' || deal.stage !== 'Closed Lost') {
				total += deal.amount;
			}
		});
		return total;
	}

	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<h1 style={{ textAlign: 'center' }}>My Deals</h1>
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
								labels: [
									'Discovery',
									'Initial Meeting',
									'Proposal Sent',
									'Contract Signed',
									'Final Review'
								]
							}}
							options={funnelOptions}
						/>
						<h1 style={{ textAlign: 'center' }}>
							Funnel total:
							<DollarFormat value={this.getTotalSales()} color={true} />
						</h1>
					</Col>
					<Col md={6}>
						<h1 style={{ textAlign: 'center' }}>Close Ratio</h1>
						<Doughnut
							data={{
								datasets: [
									{
										data: [
											this.state.dealsByStage['Closed Lost'],
											this.state.dealsByStage['Closed Won']
										],
										backgroundColor: [ '#f4443a', '#1be246' ]
									}
								],
								labels: [ 'Lost', 'Won' ]
							}}
						/>
						<h1 style={{ textAlign: 'center' }}>
							{this.state.dealsByStage['Closed Won'] /
								(this.state.dealsByStage['Closed Lost'] + this.state.dealsByStage['Closed Lost']) *
								100}%
						</h1>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<RecentActivity userId={this.props.userId} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default MyFunnel;
