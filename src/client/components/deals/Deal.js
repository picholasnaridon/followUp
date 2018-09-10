import React, { Component } from 'react';
import Modal from '../shared/Modal'

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [{ name: "Test", id: 1 }],
      show: false,

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
    fetch(`/api/deals/${this.props.match.params.id}/addContact`, {
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
        <h2>{this.props.match.params.id}</h2>

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
      </div>
    );
  }
}

export default Deal;