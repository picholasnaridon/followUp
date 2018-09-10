import React, { Component } from 'react';
import Deal from './Deal'
import Modal from '../shared/Modal'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AddDeal from './AddDeal'

class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [{ name: "Test", id: 1 }],
      show: false
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  componentDidMount() {
    fetch("/api/deals")
      .then(response => response.json())
      .then(deals => this.setState({ deals }))
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
        <h1>Deals</h1>
        <main>
          <Modal show={this.state.show} handleClose={this.hideModal} >
            <AddDeal closeModal={this.hideModal} />
          </Modal>
          <button type='button' onClick={this.showModal}>+ Deal</button>
        </main>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.deals.map(function (deal) {
                return (
                  <tr key={deal.id} >
                    <td><Link to={`/deals/${deal.id}`}>{deal.name}</Link></td>
                    <td>{deal.amount}</td>
                    <td>{deal.status}</td>
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

export default DealList;
