import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class AddDeal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: JSON.parse(localStorage.getItem('user_id')),
			selectStage: 'Discovery',
			selectStatus: 'Good'
		};
	}

	handleStageChange = (e) => {
		this.setState({ selectStage: e.target.value });
	};
	handleStatusChange = (e) => {
		this.setState({ selectStatus: e.target.value });
	};
	submit = (e) => {
		e.preventDefault();

		var payload = {
			name: this.inputName.value,
			amount: this.inputAmount.value,
			stage: this.state.selectStage,
			status: this.state.selectStatus,
			UserId: this.props.userId
		};
		console.log(payload);
		fetch('/api/deals/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		}).then((response) => {
			if (response.ok) {
				response.json().then((json) => {
					this.props.closeModal();
					location.href = `#/deals/${json.id}`;
				});
			}
		});
	};
	render() {
		return (
			<form onSubmit={this.submit}>
				<FormGroup>
					<ControlLabel>Deal Name</ControlLabel>
					<FormControl type="text" inputRef={(input) => (this.inputName = input)} placeholder="Deal Name" />
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Stage {this.props.userId}</ControlLabel>
					<FormControl
						value={this.state.selectStage}
						componentClass="select"
						onChange={this.handleStageChange.bind(this)}
					>
						<option value="Discovery">Discovery</option>
						<option value="Initial Meeting">Initial Meeting</option>
						<option value="Proposal Sent">Proposal Sent</option>
						<option value="Contract Signed">Contract Signed</option>
						<option value="Final Review">Final Review</option>
					</FormControl>
				</FormGroup>
				<FormGroup controlId="formControlsSelectTwo">
					<ControlLabel>Status</ControlLabel>
					<FormControl
						value={this.state.selectStatus}
						componentClass="select"
						onChange={this.handleStatusChange.bind(this)}
					>
						<option value="In Danger">In Danger</option>
						<option value="Follow Up">Follow Up</option>
						<option value="Good">Good</option>
					</FormControl>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Amount</ControlLabel>
					<FormControl
						type="text"
						name="amount"
						inputRef={(input) => (this.inputAmount = input)}
						id="amount"
						placeholder="$"
					/>
				</FormGroup>
				<FormGroup>
					<FormControl type="submit" className="form-control btn-primary" />
				</FormGroup>
			</form>
		);
	}
}

export default AddDeal;
