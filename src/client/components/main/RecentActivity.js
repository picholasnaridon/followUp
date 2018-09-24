import React, { Component } from 'react';
import { Panel, Grid, Row, Col, Well, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

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
				<Grid>
					<Row>
						<Col md={6}>
							<Panel bsStyle="info">
								<Panel.Heading>
									<Panel.Title componentClass="h3">Recent Notes</Panel.Title>
								</Panel.Heading>
								<Panel.Body>
									{this.state.comments.map(function(comment) {
										return (
											<Panel key={comment.id}>
												{comment.Deal ? (
													<Panel.Heading>
														<a href={`/#/deals/${comment.Deal.id}`}>{comment.Deal.name}</a>
													</Panel.Heading>
												) : (
													<Panel.Heading>
														<a href={`/#/contacts/${comment.Contact.id}`}>
															{comment.Contact.firstName} {comment.Contact.lastName}
														</a>
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
							<Panel bsStyle="info">
								<Panel.Heading>
									<Panel.Title componentClass="h3">Recent Updates</Panel.Title>
								</Panel.Heading>
								<Panel.Body>
									<ListGroup>
										{this.state.updates.map(function(update) {
											return (
												<ListGroupItem key={update.id}>
													<a href={`/#/deals/${update.Deal.id}`}>{update.Deal.name} </a> -
													changed from {update.startingVal} to {update.endingVal}
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
