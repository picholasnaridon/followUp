import React, { Component } from 'react';
import MyModal from '../shared/MyModal'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AddDeal from './AddDeal'
import { Row, Grid, Col, Button } from 'react-bootstrap'
import ReactTable from 'react-table'
import DealStatus from './DealStatus'
import DealProgress from './DealProgress';
import DollarFormat from '../shared/DollarFormat'
import axios from 'axios'

const stageMap = {
  "Closed Lost": 0,
  "Discovery": 16.6,
  "Initial Meeting": 33.3,
  "Proposal Sent": 49.8,
  "Contract Signed": 66.4,
  "Final Review": 83.1,
  "Closed Won": 100
}


class DealList extends Component {
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
    axios(`/api/deals`, {
      params:{
        userId: this.props.userId
        }
      }).then(response => {
        console.log(response)
        this.setState({deals: response.data})
      })
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
              <MyModal show={this.state.show} title="Add Deal" close={this.hideModal} >
                <AddDeal closeModal={this.hideModal} userId={this.props.userId}/>
              </MyModal>
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
                Header: 'Status',
                accessor: 'status',
                Cell: row => (
                  <DealStatus status={row.value} />
                )
              }, {
                Header: 'Stage',
                accessor: 'stage',
              }, {
                Header: 'Progress',
                accessor: 'stage',
                Cell: row => (
                  <DealProgress progress={stageMap[row.value]} />
                )
              }, {
                Header: 'Amount', // Required because our accessor is not a string
                accessor: 'amount',
                Cell: (row) => (
                  <DollarFormat value={row.value} />
                ),
                Footer: (data) => {
                  var total = 0
                  console.log(data)
                  data.data.forEach(function (deal) {
                    total += deal.amount
                  })
                  return (
                    <span>
                      <strong>Total: </strong>
                      <DollarFormat color={true} value={total} />
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