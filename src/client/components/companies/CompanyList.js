import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.companies.map(function (company) {
                return (
                  <tr key={company.id} >
                    <td><Link to={`/companies/${company.id}`}>{company.name}</Link></td>
                    <td>{company.address1}</td>
                    <td>{company.phone}</td>
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

export default CompanyList;

