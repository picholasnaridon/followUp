import React, { Component } from 'react';
import { Button, FormControl, Grid, Row, Col, Well } from 'react-bootstrap';
import {
	NoteList,
	EditDeal,
	MyModal,
	DealContacts,
	DealStatus,
	DealUpdates,
	DealCloseTime,
	LoadingBanner
} from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import axios from 'axios';
import StageStepper from './StageStepper';

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
									<DealStatus status={this.state.deal.status} />
									<h4>$ {this.state.deal.amount}</h4>
									<p>{this.state.deal.summary}</p>
								</div>
							</Well>
						</Col>
						<Col md={6}>
							<Well>
								<StageStepper
									refresh={this.refresh}
									deal={this.state.deal}
									currentStage={this.state.deal.stage}
								/>
								<hr />
								{/* <DealCloseTime stage={this.state.deal.stage} updates={this.state.deal.Updates} /> */}
							</Well>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col md={12}>
							<h4>Contacts</h4>
							<Well>
								<DealContacts
									contacts={this.state.deal.Contacts}
									userId={this.props.userId}
									refresh={this.refresh}
									dealId={this.props.match.params.id}
								/>
							</Well>
						</Col>
					</Row>
					<hr />
					<Row>
						<Col md={6}>
							<h4>Notes</h4>
							<Well>
								<NoteList type="deals" parentId={this.state.deal.id} userId={this.state.deal.UserId} />
							</Well>
						</Col>
						<Col md={6}>
							<h4>Recent Updates</h4>
							<Well>
								<DealUpdates
									updates={this.state.deal.Updates}
									refresh={this.refresh}
									dealId={this.state.deal.id}
								/>
							</Well>
						</Col>
					</Row>
				</Grid>
			);
		} else {
			return <LoadingBanner />;
		}
	}
}

export default Deal;
