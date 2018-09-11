import React, { Component } from 'react';
import Modal from '../shared/Modal'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AddDeal from './AddDeal'
import { Row, Grid, Col, Button } from 'react-bootstrap'
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


class DealList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: [],
      show: false,
      filterValue: 'Discovery'
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  componentDidMount() {
    var UserId = JSON.parse(localStorage.getItem('user_id'))

    fetch(`/api/users/${UserId}/deals`)
      .then(response => response.json())
      .then(data => this.setState({ deals: data.Deals }))
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <h1>Deals</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <main style={{ marginBottom: "3%" }}>
              <Modal show={this.state.show} handleClose={this.hideModal} >
                <AddDeal closeModal={this.hideModal} />
              </Modal>
              <Button bsStyle="success" onClick={this.showModal}>+ Deal</Button>
            </main>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ReactTable
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value
              }

              pageSize={10}
              data={this.state.deals}
              columns={[{
                Header: 'Name',
                accessor: 'name',
                Cell: props => <a href={"#/deals/" + props.original.id}>{props.value}</a>,
              }, {
                Header: 'stage',
                accessor: 'status',

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
                          stageMap[row.value] > 90 ? '#00ff11' : stageMap[row.value]
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
                Footer: (data) => {
                  var total = 0
                  console.log(data)
                  data.data.forEach(function (deal) {
                    total += deal.amount
                  })
                  return (
                    <span>
                      <strong>Total: </strong>
                      <span style={{ color: "#1ee861" }}>${(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
                    </span>
                  )
                }
              }]}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DealList;
