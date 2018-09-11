import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { Row, Grid, Col } from 'react-bootstrap'
import ReactTable from 'react-table'

const columns = [{
  Header: 'Full Name',
  id: 'fullName',
  Cell: props => <span className=''>
    <a href={"#/contacts/" + props.original.id}>
      {props.original.firstName} {props.original.lastName}
    </a>
  </span>
},
{
  Header: 'first Name',
  accessor: 'firstName'
},
{
  Header: 'Last Name',
  accessor: 'lastName'
},
{
  Header: 'Email',
  accessor: 'email'
},
{
  Header: 'Address1',
  accessor: 'address1'
},
{
  Header: 'Address 2',
  accessor: 'address2'
},
{
  Header: 'City',
  accessor: 'City'
},
{
  Header: 'State',
  accessor: 'State'
},
{
  Header: 'Zip',
  accessor: 'Zip'
},
{
  Header: 'Phone',
  accessor: 'Phone'
},
{
  Header: 'Mobile',
  accessor: 'Mobile'
}
]

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
      <Grid>
        <Row>
          <Col md={6}>
            <h1>Contacts</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ReactTable
              data={this.state.contacts}
              columns={columns}
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ContactList;

