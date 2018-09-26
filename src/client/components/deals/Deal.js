import React, { Component } from 'react';
import { Button, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { NoteList, EditDeal, MyModal, DealContacts, DealStatus, DealUpdates, DealCloseTime } from '../components';
import moment from 'moment';
import axios from 'axios';

class Deal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deal: null,
			stage: null
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.refresh = this.refresh.bind(this);
		this.markLostOrWon = this.markLostOrWon.bind(this);
	}

	markLostOrWon(e, stage) {
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
				this.componentDidMount();
			});
	}
	showModal() {
		this.setState({ show: true });
	}

	hideModal() {
		this.setState({ show: false });
	}

	componentDidMount() {
		axios(`/api/deals/${this.props.match.params.id}`, {
			method: 'GET'
		}).then((response) => {
			this.setState({ deal: response.data, stage: response.data.stage });
		});
	}

	refresh() {
		this.componentDidMount();
	}

	renderCloseButtons() {
		switch (this.state.deal.stage) {
			case 'Closed Won':
				return (
					<div>
						<DealCloseTime updates={this.state.deal.Updates} />
						<Button bsStyle="danger" onClick={(e) => this.markLostOrWon(e, 'Closed Lost')}>
							Mark Lost
						</Button>
					</div>
				);
			case 'Closed Lost':
				return (
					<div>
						<DealCloseTime updates={this.state.deal.Updates} />
						<Button bsStyle="success" onClick={(e) => this.markLostOrWon(e, 'Closed Won')}>
							Mark Won
						</Button>
					</div>
				);
			default:
				return (
					<div>
						<h5>Created: {moment(this.state.deal.createdAt).format('MM-DD-YYYY')}</h5>
						<Button bsStyle="danger" onClick={(e) => this.markLostOrWon(e, 'Closed Lost')}>
							Mark Lost
						</Button>
						<Button bsStyle="success" onClick={(e) => this.markLostOrWon(e, 'Closed Won')}>
							Mark Won
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
						<Col md={11}>
							<h2>{this.state.deal.name}</h2>
							<h4>{this.state.stage}</h4>
							{this.renderCloseButtons()}
							<MyModal
								show={this.state.show}
								title="Edit Deal"
								close={this.hideModal}
								onHide={this.hideModal}
							>
								<EditDeal close={this.hideModal} deal={this.state.deal} refresh={this.refresh} />
							</MyModal>
						</Col>
						<Col md={1}>
							<Button bsStyle="primary" onClick={this.showModal}>
								Edit Deal
							</Button>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col>
							<div>
								<DealStatus status={this.state.deal.status} />
								<h4>$ {this.state.deal.amount}</h4>
							</div>
						</Col>
					</Row>
					<hr />
					<Row>
						<DealContacts
							contacts={this.state.deal.Contacts}
							userId={this.props.userId}
							refresh={this.refresh}
							dealId={this.props.match.params.id}
						/>
					</Row>
					<hr />
					<Row>
						<Col>
							<NoteList type="deals" parentId={this.state.deal.id} userId={this.state.deal.UserId} />
						</Col>
					</Row>
					<Row>
						<Col>
							<DealUpdates updates={this.state.deal.Updates} />
						</Col>
					</Row>
				</Grid>
			);
		} else {
			return <div />;
		}
	}
}

export default Deal;
