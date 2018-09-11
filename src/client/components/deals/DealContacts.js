import React, { Component } from 'react';
import Modal from '../shared/Modal'
import { Table, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

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
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      company: this.refs.company.value,
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
          <form onSubmit={this.addContact} >
            <FormGroup>
              <ControlLabel>First Name</ControlLabel>
              <FormControl type="text" ref="firstName" placeholder="First Name" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl type="text" ref="lastName" placeholder="Last Name" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl type="text" ref="email" placeholder="Email" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Addres 1</ControlLabel>
              <FormControl type="text" ref="address1" placeholder="Address 1" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Addres 2</ControlLabel>
              <FormControl type="text" ref="address2" placeholder="Address 2" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>City</ControlLabel>
              <FormControl type="text" ref="city" placeholder="City" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>State</ControlLabel>
              <FormControl type="text" ref="state" placeholder="State" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Zip</ControlLabel>
              <FormControl type="text" ref="zip" placeholder="Zip" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Phone</ControlLabel>
              <FormControl type="phone" ref="phone" placeholder="phone" ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Mobile</ControlLabel>
              <FormControl type="text" ref="mobile" placeholder="Mobile" ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl type="submit" className="form-control btn-primary"></FormControl>
            </FormGroup>
          </form>
        </Modal>
        <button type='button' onClick={this.showModal}>Open</button>
      </div >
    );
  }
}

export default DealContacts;

