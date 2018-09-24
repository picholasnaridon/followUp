import React, { Component } from 'react';
import { Button, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { NoteList, EditDeal, MyModal, DealContacts, DealStatus } from '../components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
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
		this.formatDate = this.formatDate.bind(this);
	}

	markLostOrWon(e, stage) {
		if (this.state.deal.stage !== stage) {
			axios
				.post('/api/updates/deal/add', {
					updateType: 'stage',
					startingVal: this.state.deal.stage,
					endingVal: stage,
					dealId: this.state.deal.id,
					userId: this.state.deal.UserId
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
				this.setState({ stage: stage });
			});

		// ANOTHER FETCH FOR RECORDING STAGE CHAGNES
	}
	showModal() {
		this.setState({ show: true });
	}

	hideModal() {
		this.setState({ show: false });
	}

	componentDidMount() {
		fetch(`/api/deals/${this.props.match.params.id}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				this.setState({ deal: json, stage: json.stage });
			});
	}
	formatDate() {
		var date = parse(this.state.deal.createdAt, 'MM-dd-yyyy', new Date());
		var string = format(date, 'MMMM do YYYY');
		return <span> {string} </span>;
	}
	refresh() {
		fetch(`/api/deals/${this.props.match.params.id}`, {
			method: 'GET'
		})
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				console.log(json);
				this.setState({ deal: json, stage: json.stage });
			});
	}

	render() {
		if (this.state.deal) {
			return (
				<Grid>
					<Row>
						<Col md={11}>
							<h2>{this.state.deal.name}</h2>
							<h5>Created: {this.formatDate()}</h5>
							<h4>{this.state.stage}</h4>
							<Button bsStyle="success" onClick={(e) => this.markLostOrWon(e, 'Closed Won')}>
								Won
							</Button>
							<Button bsStyle="danger" onClick={(e) => this.markLostOrWon(e, 'Closed Lost')}>
								Lost
							</Button>
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
				</Grid>
			);
		} else {
			return <div />;
		}
	}
}

export default Deal;
