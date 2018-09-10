import React, { Component } from 'react';
import Deal from './Deal'
import Modal from '../shared/Modal'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AddDeal from './AddDeal'
import ReactTable from 'react-table'

const stageMap = {
  "Closed Lost": 0,
  "Discovery": 16.6,
  "Initial Meeting": 33.3,
  "Proposal Sent": 49.8,
  "Contract Signed": 66.4,
  "Final Review": 83.1,
  "Closed Won": 100
}

const columns = [{
  Header: 'Name',
  accessor: 'name',
  Cell: props => <a href={"#/deals/" + props.original.id}>{props.value}</a> // String-based value accessors!,
}, {
  Header: 'stage',
  accessor: 'status'

}, {
  Header: 'status',
  accessor: 'status',
  Cell: row => (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#dadada',
        borderRadius: '2px'
      }}
    >
      <div
        style={{
          width: `${stageMap[row.value]}%`,
          height: '100%',
          backgroundColor:
            stageMap[row.value]
              > 66 ? '#85cc00' : stageMap[row.value]
                > 33 ? '#ffbf00' : '#ff2e00',
          borderRadius: '2px',
          transition: 'all .2s ease-out'
        }}
      />
    </div>
  )
}, {
  Header: 'amount', // Required because our accessor is not a string
  accessor: 'amount',
}]

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
          <ReactTable data={this.state.deals} columns={columns}></ReactTable>
        </div>
      </div>
    );
  }
}

export default DealList;
