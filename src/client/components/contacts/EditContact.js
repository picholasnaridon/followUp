import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EditContact extends Component {
	constructor(props) {
		super(props);
	}

	handleStageChange = (e) => {
		console.log(e.target.value);
		this.setState({ selectStage: e.target.value });
	};

	handleStatusChange = (e) => {
		console.log(e.target.value);
		this.setState({ selectStatus: e.target.value });
	};

	submit = (e) => {
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

		fetch(`/api/contacts/${this.props.contact.id}/edit`, {
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
	};
	render() {
		return (
			<div>
				<form onSubmit={this.submit}>
					<FormGroup>
						<ControlLabel>First Name</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.firstName}
							inputRef={(input) => (this.inputFirstName = input)}
							placeholder="First Name"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Last Name</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.lastName}
							inputRef={(input) => (this.inputLastName = input)}
							placeholder="Last Name"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Phone</ControlLabel>
						<FormControl
							type="phone"
							defaultValue={this.props.contact.phone}
							inputRef={(input) => (this.inputPhone = input)}
							placeholder="phone"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Email</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.email}
							inputRef={(input) => (this.inputEmail = input)}
							placeholder="Email"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Addres 1</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.address1}
							inputRef={(input) => (this.inputAddress1 = input)}
							placeholder="Address 1"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Addres 2</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.address2}
							inputRef={(input) => (this.inputAddress2 = input)}
							placeholder="Address 2"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>City</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.city}
							inputRef={(input) => (this.inputCity = input)}
							placeholder="City"
						/>
					</FormGroup>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>State</ControlLabel>
						<FormControl
							componentClass="select"
							placeholder={this.props.contact.state}
							inputRef={(input) => (this.inputState = input)}
						>
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
							<option value="AZ">Arizona</option>
							<option value="AR">Arkansas</option>
							<option value="CA">California</option>
							<option value="CO">Colorado</option>
							<option value="CT">Connecticut</option>
							<option value="DE">Delaware</option>
							<option value="DC">District Of Columbia</option>
							<option value="FL">Florida</option>
							<option value="GA">Georgia</option>
							<option value="HI">Hawaii</option>
							<option value="ID">Idaho</option>
							<option value="IL">Illinois</option>
							<option value="IN">Indiana</option>
							<option value="IA">Iowa</option>
							<option value="KS">Kansas</option>
							<option value="KY">Kentucky</option>
							<option value="LA">Louisiana</option>
							<option value="ME">Maine</option>
							<option value="MD">Maryland</option>
							<option value="MA">Massachusetts</option>
							<option value="MI">Michigan</option>
							<option value="MN">Minnesota</option>
							<option value="MS">Mississippi</option>
							<option value="MO">Missouri</option>
							<option value="MT">Montana</option>
							<option value="NE">Nebraska</option>
							<option value="NV">Nevada</option>
							<option value="NH">New Hampshire</option>
							<option value="NJ">New Jersey</option>
							<option value="NM">New Mexico</option>
							<option value="NY">New York</option>
							<option value="NC">North Carolina</option>
							<option value="ND">North Dakota</option>
							<option value="OH">Ohio</option>
							<option value="OK">Oklahoma</option>
							<option value="OR">Oregon</option>
							<option value="PA">Pennsylvania</option>
							<option value="RI">Rhode Island</option>
							<option value="SC">South Carolina</option>
							<option value="SD">South Dakota</option>
							<option value="TN">Tennessee</option>
							<option value="TX">Texas</option>
							<option value="UT">Utah</option>
							<option value="VT">Vermont</option>
							<option value="VA">Virginia</option>
							<option value="WA">Washington</option>
							<option value="WV">West Virginia</option>
							<option value="WI">Wisconsin</option>
							<option value="WY">Wyoming</option>
						</FormControl>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Zip</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.zip}
							inputRef={(input) => (this.inputZip = input)}
							placeholder="Zip"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Country</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.country}
							inputRef={(input) => (this.inputCountry = input)}
							placeholder="Country"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Mobile</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.contact.mobile}
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
