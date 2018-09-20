import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class AddContact extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.addContact = this.addContact.bind(this)
  }
  addContact(e) {
    e.preventDefault()
    var payload = {
      firstName: this.inputFirstName.value,
      lastName: this.inputLastName.value,
      company: this.inputCompany.value,
      email: this.inputEmail.value,
      address1: this.inputAddress1.value,
      address2: this.inputAddress2.value,
      city: this.inputCity.value,
      state: this.inputState.value,
      zip: this.inputZip.value,
      country: this.inputCountry.value,
      phone: this.inputPhone.value,
      mobile: this.inputMobile.value,
      userId: this.props.userId
    }
    fetch(`/api/deals/${this.props.dealId}/addContact`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response) => {
      this.props.refresh()
      this.props.close()
    })
  }
  render() {
    return (
      <form onSubmit={this.addContact}>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputFirstName = input} placeholder="First Name" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputLastName = input} placeholder="Last Name" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Phone</ControlLabel>
          <FormControl type="phone" inputRef={(input) => this.inputPhone = input} placeholder="phone" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Company</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputCompany = input} placeholder="Company" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputEmail = input} placeholder="Email" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Addres 1</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputAddress1 = input} placeholder="Address 1" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Addres 2</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputAddress2 = input} placeholder="Address 2" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>City</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputCity = input} placeholder="City" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>State</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputState = input} placeholder="State" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Zip</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputZip = input} placeholder="Zip" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Country</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputCountry = input} placeholder="Country" ></FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Mobile</ControlLabel>
          <FormControl type="text" inputRef={(input) => this.inputMobile = input} placeholder="Mobile" ></FormControl>
        </FormGroup>

        <FormGroup>
          <FormControl type="submit" className="form-control btn-primary"></FormControl>
        </FormGroup>

      </form>
    );
  }
}

export default AddContact;