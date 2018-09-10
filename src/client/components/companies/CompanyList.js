import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'
import ReactTable from 'react-table'

const columns = [{
  Header: 'Name',
  accessor: 'name',
  Cell: props => <span className=''>
    <a href={"#/companies/" + props.original.id}>
      {props.original.name}
    </a>
  </span>
}, {
  Header: 'Address',
  accessor: 'address1',
}, {
  Header: 'Phone', // Required because our accessor is not a string
  accessor: 'phone',
}]
class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    }
  }
  componentDidMount() {
    fetch("/api/companies")
      .then(response => response.json())
      .then(companies => this.setState({ companies }))
  }
  render() {
    return (
      <div>
        <h1>Companies</h1>
        <div>
          <ReactTable data={this.state.companies} columns={columns} />
        </div>
      </div>
    );
  }
}

export default CompanyList;

