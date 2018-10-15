import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { RecentActivity, DollarFormat, StageGraph, RatioGraph, LoadingBanner } from '../components';

class MyFunnel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deals: [],
			dealsByStage: {}
		};
	}
	componentDidMount() {
		fetch(`/api/users/${this.props.userId}/deals`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				this.setState({ deals: json.Deals });
			});
	}

	getSalesInFunnel = () => {
		var total = 0;
		this.state.deals.forEach(function(deal) {
			if (deal.stage !== 'Closed Won' && deal.stage !== 'Closed Lost') {
				total += deal.amount;
			}
		});
		return total;
	};
	getSalesClosed = () => {
		var total = 0;
		this.state.deals.forEach(function(deal) {
			if (deal.stage === 'Closed Won') {
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
						<PageHeader style={{ textAlign: 'center' }}>Open Deals</PageHeader>
						<h3 style={{ textAlign: 'center' }}>
							Funnel total:
							<DollarFormat value={this.getSalesInFunnel()} color={true} />
						</h3>
						<StageGraph userId={this.props.userId} />
					</Col>
					<Col md={6}>
						<PageHeader style={{ textAlign: 'center' }}>Close Ratio</PageHeader>
						<h3 style={{ textAlign: 'center' }}>
							Won Sales: <DollarFormat value={this.getSalesClosed()} color={true} />
						</h3>
						<RatioGraph userId={this.props.userId} />
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
