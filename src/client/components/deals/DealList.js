import React, { Component } from 'react';

class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: []
    }
  }
  componentDidMount() {
    fetch("/api/deals")
      .then(response => response.json())
      .then(deals => this.setState({ deals }))
  }
  render() {
    return (
      <div>
        <h1>Deals</h1>
        {this.state.deals.map(function (deal) {
          return (
            <div key={deal.id}>
              <a href={`/deals/${deal.id}`}>{deal.name}</a>
            </div>
          )
        })}
      </div>
    );
  }
}

export default DealList;

