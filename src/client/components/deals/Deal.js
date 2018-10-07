import React, { Component } from 'react';
import { Button, FormControl, Grid, Row, Col, Well } from 'react-bootstrap';
import { NoteList, EditDeal, MyModal, DealContacts, DealStatus, DealUpdates, DealCloseTime } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import axios from 'axios';

class Deal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deal: null,
			stage: null
		};
	}
	componentDidMount = () => {
		axios.get(`/api/deals/${this.props.match.params.id}`).then((response) => {
			console.log('AXIOS RESPONSE', response.data);
			this.setState({
				deal: response.data,
				stage: response.data.stage
			});
		});
	};

	markLostOrWon = (e, stage) => {
		if (this.state.deal.stage !== stage) {
			axios
				.post('/api/updates/deal/add', {
					updateType: 'stage',
					startingVal: this.state.deal.stage,
					endingVal: stage,
					dealId: this.state.deal.id,
					userId: this.state.deal.UserId,
					creationDate: this.state.deal.createdAt
				})
				.then((result) => {
					console.log(result);
				});
		}
		var payload = {
			stage: stage
		};
		fetch(`/api/deals/${this.props.match.params.id}/changeStage`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		})
			.then((response) => response)
			.then((data) => {
				this.refresh();
			});
	};
	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

	refresh = () => {
		var that = this;
		axios.get(`/api/deals/${this.props.match.params.id}`).then((response) => {
			console.log('AXIOS RESPONSE', response.data);
			that.setState({
				deal: response.data,
				stage: response.data.stage
			});
		});
	};

	renderCloseButtons() {
		switch (this.state.deal.stage) {
			case 'Closed Won':
				return (
					<div>
						<Button bsStyle="danger" onClick={(e) => this.markLostOrWon(e, 'Closed Lost')}>
							Lost
						</Button>
						<DealCloseTime updates={this.state.deal.Updates} />
					</div>
				);
			case 'Closed Lost':
				return (
					<div>
						<Button bsStyle="success" onClick={(e) => this.markLostOrWon(e, 'Closed Won')}>
							Won
						</Button>
						<DealCloseTime updates={this.state.deal.Updates} />
					</div>
				);
			default:
				return (
					<div>
						<h5>Created: {moment(this.state.deal.createdAt).format('MM-DD-YYYY')}</h5>
						<Button bsStyle="danger" onClick={(e) => this.markLostOrWon(e, 'Closed Lost')}>
							Lost
						</Button>
						<Button bsStyle="success" onClick={(e) => this.markLostOrWon(e, 'Closed Won')}>
							Won
						</Button>
					</div>
				);
		}
	}

	render() {
		if (this.state.deal) {
			return (
				<Grid>
					<Row>
						<Col md={12}>
							<Well>
								<h2>
									{this.state.deal.name}{' '}
									<span onClick={this.showModal}>
										<FontAwesomeIcon icon={faPencilAlt} size={'xs'} color="#337ab7" />
									</span>
								</h2>
								<MyModal
									show={this.state.show}
									title="Edit Deal"
									close={this.hideModal}
									onHide={this.hideModal}
								>
									<EditDeal close={this.hideModal} deal={this.state.deal} refresh={this.refresh} />
								</MyModal>
							</Well>
						</Col>
					</Row>
					<br />
					<Row>
						<Col md={6}>
							<Well>
								<div>
									{this.renderCloseButtons()}
									<h3>{this.state.stage}</h3>
									<DealStatus status={this.state.deal.status} />
									<h4>$ {this.state.deal.amount}</h4>
								</div>
							</Well>
						</Col>
						<Col md={6}>
							<Well>
								<h3>Todos</h3>
								<div style={{ textAlign: 'right' }}>
									<h4>Pending tasks:</h4>
									<h4>Pending tasks:</h4>
									<h4>Pending tasks:</h4>
									<h4>Pending tasks:</h4>
									<h4>Pending tasks:</h4>
									<h4>Pending tasks:</h4>
									<h4>Pending tasks:</h4>
								</div>
							</Well>
						</Col>
					</Row>
					<hr />
					<Well>
						<Row>
							<DealContacts
								contacts={this.state.deal.Contacts}
								userId={this.props.userId}
								refresh={this.refresh}
								dealId={this.props.match.params.id}
							/>
						</Row>
					</Well>
					<hr />
					<Well>
						<Row>
							<Col>
								<NoteList type="deals" parentId={this.state.deal.id} userId={this.state.deal.UserId} />
							</Col>
						</Row>
					</Well>
					<Well>
						<Row>
							<Col>
								<DealUpdates
									updates={this.state.deal.Updates}
									refresh={this.refresh}
									dealId={this.state.deal.id}
								/>
							</Col>
						</Row>
					</Well>
				</Grid>
			);
		} else {
			return <div />;
		}
	}
}

export default Deal;
