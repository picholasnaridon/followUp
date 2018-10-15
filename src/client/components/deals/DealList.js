import React, { Component } from 'react';
import { MyModal, DealProgress, DealStatus, DollarFormat, AddDeal } from '../components';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { Row, Grid, Col, Button, PageHeader } from 'react-bootstrap';
import ReactTable from 'react-table';
import axios from 'axios';

const stageMap = {
	'Closed Lost': 0,
	Discovery: 16.6,
	'Initial Meeting': 33.3,
	'Proposal Sent': 49.8,
	'Contract Signed': 66.4,
	'Final Review': 83.1,
	'Closed Won': 100
};

class DealList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deals: [],
			show: false,
			filterValue: 'Discovery'
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}
	componentDidMount() {
		axios(`/api/deals`, {
			params: {
				userId: this.props.userId
			}
		}).then((response) => {
			this.setState({ deals: response.data });
		});
	}

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	render() {
		return (
			<Grid>
				<Row>
					<Col md={6}>
						<PageHeader>
							<FontAwesomeIcon icon={faHandshake} size="lg" color="#777" /> <small>Deals</small>
						</PageHeader>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<MyModal show={this.state.show} title="Add Deal" close={this.hideModal}>
							<AddDeal closeModal={this.hideModal} userId={this.props.userId} />
						</MyModal>
						<Button bsStyle="success" onClick={this.showModal} style={{ marginBottom: '1%' }}>
							+ Deal
						</Button>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<ReactTable
							filterable
							defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
							pageSize={10}
							data={this.state.deals}
							style={{ color: '#777' }}
							columns={[
								{
									Header: 'Name',
									accessor: 'name',
									Cell: (props) => <a href={'#/deals/' + props.original.id}>{props.value}</a>
								},
								{
									Header: 'Source',
									accessor: 'source'
								},
								{
									Header: 'Status',
									accessor: 'status',
									Cell: (row) => <DealStatus status={row.value} />
								},
								{
									Header: 'Stage',
									accessor: 'stage'
								},
								{
									Header: 'Progress',
									accessor: 'stage',
									Cell: (row) => <DealProgress progress={stageMap[row.value]} />
								},
								{
									Header: 'Amount', // Required because our accessor is not a string
									accessor: 'amount',
									Cell: (row) => <DollarFormat value={row.value} />,
									Footer: (data) => {
										var total = 0;
										console.log(data);
										data.data.forEach(function(deal) {
											if (deal.stage !== 'Closed Won' && deal.stage !== 'Closed Lost') {
												total += deal.amount;
											}
										});
										return (
											<span>
												<strong>Total: </strong>
												<DollarFormat color={true} value={total} />
											</span>
										);
									}
								}
							]}
						/>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default DealList;
