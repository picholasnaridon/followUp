import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import ReactTable from 'react-table'

const
  columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: props => <span className=''>
        <a href={"#/companies/" + props.original.id}>
          {props.original.name}
        </a>
      </span>
    },
    {
      Header: 'Deal Count',
      accessor: 'Deals',
      Cell: function (props) {
        var total = 0
        props.original.Deals.forEach(function (deal) {
          total += 1
        })
        return (<span>{total}</span>)
      }
    },
    {
      Header: 'Contact Count',
      accessor: 'Contacts',
      Cell: function (props) {
        var total = 0
        props.original.Contacts.forEach(function (deal) {
          total += 1
        })
        return (<span>{total}</span>)
      }
    }
  ]
class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    }
  }
  componentDidMount() {
    var UserId = JSON.parse(localStorage.getItem('user_id'))

    fetch(`/api/users/${UserId}/companies`)
      .then(response => response.json())
      .then(data => this.setState({ companies: data.Companies }))
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <h1>Companies</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ReactTable
              data={this.state.companies}
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

export default CompanyList;

