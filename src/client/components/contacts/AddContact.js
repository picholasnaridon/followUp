import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class AddContact extends Component {
	constructor(props) {
		super(props);

		this.addContact = this.addContact.bind(this);
	}
	addContact(e) {
		e.preventDefault();
		var payload = {
			firstName: this.inputFirstName.value,
			lastName: this.inputLastName.value,
			company: this.inputCompany.value,
			email: this.inputEmail.value,
			userId: this.props.userId
		};
		fetch(`/api/deals/${this.props.dealId}/addContact`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		}).then((response) => {
			this.props.refresh();
			this.props.close();
		});
	}
	render() {
		return (
			<form onSubmit={this.addContact}>
				<FormGroup>
					<ControlLabel>First Name</ControlLabel>
					<FormControl
						type="text"
						inputRef={(input) => (this.inputFirstName = input)}
						placeholder="First Name"
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Last Name</ControlLabel>
					<FormControl
						type="text"
						inputRef={(input) => (this.inputLastName = input)}
						placeholder="Last Name"
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Company</ControlLabel>
					<FormControl type="text" inputRef={(input) => (this.inputCompany = input)} placeholder="Company" />
				</FormGroup>
				<FormGroup>
					<ControlLabel>Email</ControlLabel>
					<FormControl type="text" inputRef={(input) => (this.inputEmail = input)} placeholder="Email" />
				</FormGroup>
				<FormGroup>
					<FormControl type="submit" className="form-control btn-primary" />
				</FormGroup>
			</form>
		);
	}
}

export default AddContact;
