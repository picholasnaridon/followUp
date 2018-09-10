import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

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
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map(function (contact) {
                return (
                  <tr key={contact.id} >
                    <td><Link to={`/contacts/${contact.id}`}>{contact.firstName} {contact.lastName}</Link></td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ContactList;

