import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EditCompany extends Component {
	constructor(props) {
		super(props);
	}

	submit = (e) => {
		e.preventDefault();
		var payload = {
			email: this.inputEmail.value,
			address1: this.inputAddress1.value,
			address2: this.inputAddress2.value,
			city: this.inputCity.value,
			state: this.inputState.value,
			zip: this.inputZip.value,
			country: this.inputCountry.value,
			phone: this.inputPhone.value
		};
		fetch(`/api/companies/${this.props.company.id}/edit`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		}).then((response) => {
			if (response.ok) {
				response.json().then((json) => {
					this.props.close();
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
						<ControlLabel>Phone</ControlLabel>
						<FormControl
							type="phone"
							defaultValue={this.props.company.phone}
							inputRef={(input) => (this.inputPhone = input)}
							placeholder="phone"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Email</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.email}
							inputRef={(input) => (this.inputEmail = input)}
							placeholder="Email"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Addres 1</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.address1}
							inputRef={(input) => (this.inputAddress1 = input)}
							placeholder="Address 1"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Addres 2</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.address2}
							inputRef={(input) => (this.inputAddress2 = input)}
							placeholder="Address 2"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>City</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.city}
							inputRef={(input) => (this.inputCity = input)}
							placeholder="City"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>State</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.state}
							inputRef={(input) => (this.inputState = input)}
							placeholder="State"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Zip</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.zip}
							inputRef={(input) => (this.inputZip = input)}
							placeholder="Zip"
						/>
					</FormGroup>
					<FormGroup>
						<ControlLabel>Zip</ControlLabel>
						<FormControl
							type="text"
							defaultValue={this.props.company.country}
							inputRef={(input) => (this.inputCountry = input)}
							placeholder="Zip"
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

export default EditCompany;
