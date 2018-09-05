import React, { Component } from 'react';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
  }
  componentDidMount() {
    fetch("/api/contacts")
      .then(response => response.json())
      .then(contacts => this.setState({ contacts }))
  }
  render() {
    return (
      <div>
        <h1>Contacts</h1>
        {this.state.contacts.map(function (contact) {
          return (
            <div key={contact.id}>
              <a href={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName}</a>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ContactList;

