import React, { Component } from 'react';
import Modal from '../shared/Modal'
import DealContacts from './DealContacts'

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: null
    }

  }

  componentDidMount() {
    fetch(`/api/deals/${this.props.match.params.id}`, {
      method: "GET"
    }).then((response) => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({ deal: json })
    })
  }


  render() {
    if (this.state.deal) {
      return (
        <div>
          <h2>{this.state.deal.name}</h2>
          <h4>{this.state.deal.stage}</h4>
          <h4>{this.state.deal.status}</h4>
          <h4>$ {this.state.deal.amount}</h4>
          <DealContacts contacts={this.state.deal.Contacts} dealId={this.props.match.params.id} />
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}

export default Deal;