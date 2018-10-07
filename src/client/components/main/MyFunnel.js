import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { RecentActivity, DollarFormat, StageGraph, RatioGraph } from '../components';

class MyFunnel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deals: [],
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

	getTotalSales = () => {
		var total = 0;
		this.state.deals.forEach(function(deal) {
			if (deal.stage !== 'Closed Won' || deal.stage !== 'Closed Lost') {
				total += deal.amount;
			}
		});
		return total;
	};

	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<h1 style={{ textAlign: 'center' }}>Open Deals</h1>
						<StageGraph
							discovery={this.state.dealsByStage['Discovery']}
							initialMeeting={this.state.dealsByStage['Initial Meeting']}
							proposalSent={this.state.dealsByStage['Proposal Sent']}
							contractSigned={this.state.dealsByStage['Contract Signed']}
							finalReview={this.state.dealsByStage['Final Review']}
						/>
						<h1 style={{ textAlign: 'center' }}>
							Funnel total:
							<DollarFormat value={this.getTotalSales()} color={true} />
						</h1>
					</Col>
					<Col md={6}>
						<h1 style={{ textAlign: 'center' }}>Close Ratio</h1>
						<RatioGraph
							closedWon={this.state.dealsByStage['Closed Won']}
							closedLost={this.state.dealsByStage['Closed Lost']}
						/>>
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
