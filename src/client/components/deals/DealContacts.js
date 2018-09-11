import React, { Component } from 'react';
import Modal from '../shared/Modal'
import { Table, FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap'
import { ReactTable } from 'react-table';

class DealContacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
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
      city: this.inputAddress2.value,
      state: this.inputState.value,
      zip: this.inputZip.value,
      country: this.inputCountry.value,
      phone: this.inputPhone.value,
      mobile: this.inputMobile.value,
      userId: JSON.parse(localStorage.getItem('user_id'))
    }
    fetch(`/api/deals/${this.props.dealId}/addContact`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response) => {
      console.log(response)
    })
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }


  render() {
    if (this.props.contacts) {
      return (
        <div>
          <h4>Contacts</h4>
          <Table>
            <tbody>
              {this.props.contacts.map(function (contact) {
                return (
                  <tr key={contact.id}>
                    <td><a href={`#/contacts/${contact.id}`}>{contact.firstName} {contact.lastName}</a></td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <h1>Add Contact</h1>
          <Modal show={this.state.show} handleClose={this.hideModal} style={{ margin: "3%" }}>
            <form onSubmit={this.addContact}>
              <Grid>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>First Name</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputFirstName = input} placeholder="First Name" ></FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputLastName = input} placeholder="Last Name" ></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Phone</ControlLabel>
                      <FormControl type="phone" inputRef={(input) => this.inputPhone = input} placeholder="phone" ></FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Company</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputCompany = input} placeholder="Company" ></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Email</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputEmail = input} placeholder="Email" ></FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Addres 1</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputAddress1 = input} placeholder="Address 1" ></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Addres 2</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputAddress2 = input} placeholder="Address 2" ></FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>City</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputCity = input} placeholder="City" ></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>State</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputState = input} placeholder="State" ></FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Zip</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputZip = input} placeholder="Zip" ></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Country</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputCountry = input} placeholder="Country" ></FormControl>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <ControlLabel>Mobile</ControlLabel>
                      <FormControl type="text" inputRef={(input) => this.inputMobile = input} placeholder="Mobile" ></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <FormControl type="submit" className="form-control btn-primary"></FormControl>
                    </FormGroup>
                  </Col>
                </Row>
              </Grid>
            </form>
          </Modal>
          <button type='button' onClick={this.showModal}>Open</button>
        </div >
      );
    }
    else {
      return (<div></div>)
    }
  }
}

export default DealContacts;

