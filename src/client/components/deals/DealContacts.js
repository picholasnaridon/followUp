import React, { Component } from 'react';
import Modal from '../shared/Modal'
import { Table } from 'react-bootstrap'

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
        <main>
          <h1>Add Contact</h1>
          <Modal show={this.state.show} handleClose={this.hideModal} >
            <form onSubmit={this.addContact}>
              <input type="text" name="firstName" className="form-control" ref="firstName" id="firstName" placeholder="First Name"></input>
              <input type="text" name="lastName" className="form-control" ref="lastName" id="lastName" placeholder="Last Name"></input>
              <input type="text" name="company" className="form-control" ref="company" id="company" placeholder="company"></input>
              <input type="submit" className="form-control btn-primary"></input>
            </form>
          </Modal>
          <button type='button' onClick={this.showModal}>Open</button>
        </main>
      </div >
    );
  }
}

export default DealContacts;