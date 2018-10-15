import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Well, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

class RecentActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			updates: []
		};
	}

	componentDidMount() {
		var that = this;
		axios(`/api/updates/getAll/${this.props.userId}`).then(function(results) {
			console.log(results);
			that.setState({ updates: results.data });
		});
		axios(`/api/comments/getAll/${this.props.userId}`).then(function(results) {
			console.log(results);
			that.setState({ comments: results.data });
		});
	}
	render() {
		return (
			<div>
				<Grid style={{ color: '#777' }}>
					<Row>
						<Col md={6}>
							<Panel>
								<Panel.Heading style={{ color: '#777' }}>
									<Panel.Title componentClass="h3">Recent Notes</Panel.Title>
								</Panel.Heading>
								<Panel.Body>
									{this.state.comments.map(function(comment) {
										return (
											<Panel key={comment.id}>
												{comment.Deal ? (
													<Panel.Heading>
														<span style={{ color: '#777' }}>
															<a href={`/#/deals/${comment.Deal.id}`}>
																{comment.Deal.name}
															</a>{' '}
															- {moment(comment.createdAt).format('MM/DD/YYYY')}
														</span>
													</Panel.Heading>
												) : (
													<Panel.Heading>
														<span style={{ color: '#777' }}>
															<a href={`/#/contacts/${comment.Contact.id}`}>
																{comment.Contact.firstName} {comment.Contact.lastName}{' '}
															</a>
															- {moment(comment.createdAt).format('MM/DD/YYYY')}
														</span>
													</Panel.Heading>
												)}
												<Panel.Body>{comment.body}</Panel.Body>
											</Panel>
										);
									})}
								</Panel.Body>
							</Panel>
						</Col>
						<Col md={6}>
							<Panel>
								<Panel.Heading style={{ color: '#777' }}>
									<Panel.Title componentClass="h3">Recent Updates</Panel.Title>
								</Panel.Heading>
								<Panel.Body>
									<ListGroup>
										{this.state.updates.map(function(update) {
											return (
												<ListGroupItem key={update.id}>
													<a href={`/#/deals/${update.Deal.id}`}>{update.Deal.name} </a> -
													changed from {update.startingVal} to {update.endingVal} on{' '}
													{moment(update.createdAt).format('MM/DD/YYYY')}
												</ListGroupItem>
											);
										})}
									</ListGroup>
								</Panel.Body>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default RecentActivity;
