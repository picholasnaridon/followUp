import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Table } from 'react-bootstrap'
import ReactTable from 'react-table'

const columns = [{
  Header: 'Full Name',
  accessor: 'firstName',
  Cell: props => <span className=''><a href={"#/contacts/" + props.original.id}>{props.original.firstName} {props.original.lastName}</a></span>
}, {
  Header: 'Phone', // Required because our accessor is not a string
  accessor: 'phone',
}]

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
          <ReactTable columns={columns} data={this.state.contacts}></ReactTable>
        </div>
      </div>
    );
  }
}

export default ContactList;

