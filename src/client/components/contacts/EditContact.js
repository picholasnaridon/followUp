import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EditContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: this.props.contact
		};

		this.submit = this.submit.bind(this);
		this.handleStageChange = this.handleStageChange.bind(this);
		this.hanldeStatusChange = this.handleStatusChange.bind(this);
	}

	handleStageChange(e) {
		console.log(e.target.value);
		this.setState({ selectStage: e.target.value });
	}

	handleStatusChange(e) {
		console.log(e.target.value);
		this.setState({ selectStatus: e.target.value });
	}

	submit(e) {
		e.preventDefault();
		var payload = {
			firstName: this.inputFirstName.value,
			lastName: this.inputLastName.value,
			email: this.inputEmail.value,
			address1: this.inputAddress1.value,
			address2: this.inputAddress2.value,
			city: this.inputCity.value,
			state: this.inputState.value,
			zip: this.inputZip.value,
			country: this.inputCountry.value,
			phone: this.inputPhone.value,
			mobile: this.inputMobile.value
		};

		console.log(payload);
		fetch(`/api/contacts/${this.state.contact.id}/edit`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		}).then((response) => {
			if (response.ok) {
				response.json().then((json) => {
					console.log(json);
					this.props.closeModal();
					this.props.refresh();
				});
			}
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.submit}>
					<FormGroup>
						<ControlLabel>First Name</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.firstName}
							inputRef={(input) => (this.inputFirstName = input)}
							placeholder="First Name"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Last Name</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.lastName}
							inputRef={(input) => (this.inputLastName = input)}
							placeholder="Last Name"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Phone</ControlLabel>
						<FormControl
							type="phone"
							defaultValue={this.state.contact.phone}
							inputRef={(input) => (this.inputPhone = input)}
							placeholder="phone"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Email</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.email}
							inputRef={(input) => (this.inputEmail = input)}
							placeholder="Email"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Addres 1</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.address1}
							inputRef={(input) => (this.inputAddress1 = input)}
							placeholder="Address 1"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Addres 2</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.address2}
							inputRef={(input) => (this.inputAddress2 = input)}
							placeholder="Address 2"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>City</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.city}
							inputRef={(input) => (this.inputCity = input)}
							placeholder="City"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>State</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.state}
							inputRef={(input) => (this.inputState = input)}
							placeholder="State"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Zip</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.zip}
							inputRef={(input) => (this.inputZip = input)}
							placeholder="Zip"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Country</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.country}
							inputRef={(input) => (this.inputCountry = input)}
							placeholder="Country"
						/>
					</FormGroup>

					<FormGroup>
						<ControlLabel>Mobile</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.state.contact.mobile}
							inputRef={(input) => (this.inputMobile = input)}
							placeholder="Mobile"
						/>
					</FormGroup>

					<FormGroup>
						<FormControl type="submit" className="form-control btn-primary" />
					</FormGroup>
				</form>
			</div>
		);
	}
}

export default EditContact;
