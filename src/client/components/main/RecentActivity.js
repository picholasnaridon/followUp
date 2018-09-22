import React, { Component } from 'react';
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
				<h1>My Recent Activity</h1>
				{this.state.comments.map(function(comment) {
					return (
						<div key={comment.id}>
							<div>
								{comment.Deal ? (
									<span>
										<a href={`/#/deals/${comment.Deal.id}`}>{comment.Deal.name}</a>
									</span>
								) : (
									<span>
										<a href={`/#/contacts/${comment.Contact.id}`}>
											{comment.Contact.firstName} {comment.Contact.lastName}
										</a>
									</span>
								)}: {comment.body}
							</div>
						</div>
					);
				})}
				{this.state.updates.map(function(update) {
					return (
						<div key={update.id}>
							<div>
								<a href={`/#/deals/${update.Deal.id}`}>{update.Deal.name} </a>
								changed from {update.startingVal} to {update.endingVal}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default RecentActivity;
