import React, { Component } from 'react';

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
        {this.state.companies.map(function (company) {
          return (
            <div key={company.id}>
              <a href={`/companies/${company.id}`}>{company.name}</a>
            </div>
          )
        })}
      </div>
    );
  }
}

export default CompanyList;

