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

	submit = (e) => {
		e.preventDefault();
		var payload = {
			name: this.inputName.value,
			amount: this.inputAmount.value,
			stage: this.inputStage.value,
			status: this.inputStatus.value,
			source: this.inputSource.value,
			summary: this.inputSummary.value,
			expectedCloseDate: this.inputExpectedCloseDate.value,
			UserId: this.props.userId
		};
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
					<ControlLabel>Name</ControlLabel>
					<FormControl type="text" inputRef={(input) => (this.inputName = input)} placeholder="Deal Name" />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Summary</ControlLabel>
					<FormControl
						componentClass="textarea"
						inputRef={(input) => (this.inputSummary = input)}
						placeholder="Summary"
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Expected Close Date</ControlLabel>
					<input type="date" ref={(input) => (this.inputExpectedCloseDate = input)} />
				</FormGroup>

				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Stage</ControlLabel>
					<FormControl
						componentClass="select"
						placeholder={'Discovery'}
						inputRef={(input) => (this.inputStage = input)}
					>
						<option value="Discovery">Discovery</option>
						<option value="Initial Meeting">Initial Meeting</option>
						<option value="Proposal Sent">Proposal Sent</option>
						<option value="Contract Signed">Contract Signed</option>
						<option value="Final Review">Final Review</option>
					</FormControl>
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Source</ControlLabel>
					<FormControl
						componentClass="select"
						placeholder={'Social Media'}
						inputRef={(input) => (this.inputSource = input)}
					>
						<option value="Social Media">Social Media</option>
						<option value="Direct Mailing">Direct Mailing</option>
						<option value="Door to Door">Door to Door</option>
						<option value="Cold Call">Cold Call</option>
						<option value="Referral">Referral</option>
					</FormControl>
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Status</ControlLabel>
					<FormControl
						componentClass="select"
						placeholder={'Follow Up'}
						inputRef={(input) => (this.inputStatus = input)}
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
