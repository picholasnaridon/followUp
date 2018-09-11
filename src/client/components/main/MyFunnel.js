import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2'
import { Grid, Row, Col } from 'react-bootstrap'
import RecentActivity from './RecentActivity'

const funnelOptions = {
  onClick: function (event, bar) {
    console.log(bar[0]._model.label)
    location.href = "/#/deals"
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

class MyFunnel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deals: [],
      stages: {},
    }
    this.getTotalSales = this.getTotalSales.bind(this)
  }
  componentDidMount() {
    var userId = JSON.parse(localStorage.getItem('user_id'))
    var stages = {
      "Closed Won": 0,
      "Closed Lost": 0,
      "Discovery": 0,
      "Initial Meeting": 0,
      "Proposal Sent": 0,
      "Contract Signed": 0,
      "Final Review": 0
    }
    fetch(`/api/users/${userId}/deals`, {
      method: 'GET',
    }).then((response) => {
      return response.json()
    }).then((json) => {
      json.Deals.forEach(function (deal) {
        stages[deal.status] = (stages[deal.status] + 1) || 1;
      })
      this.setState({ deals: json.Deals, stages: stages })
    })
  }

  getTotalSales() {
    var total = 0
    this.state.deals.forEach(function (deal) {
      if (deal.stage !== 'Closed Won' || deal.stage !== 'Closed Lost') {
        total += deal.amount
      }
    })
    return total
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} >
            <h1 style={{ textAlign: "center" }}>Open Deals</h1>
            <Bar height={500} width={700} data={{
              datasets: [{
                data: [
                  this.state.stages["Discovery"],
                  this.state.stages["Initial Meeting"],
                  this.state.stages["Proposal Sent"],
                  this.state.stages["Contract Signed"],
                  this.state.stages["Final Review"]
                ],
                backgroundColor: [
                  '#f4d83a',
                  '#1ee861',
                  "#1abfe0",
                  "#3b50ed",
                  '#dc34e5',
                ],
                label: "My Funnel"
              }],
              labels: [
                "Discovery",
                "Initial Meeting",
                "Proposal Sent",
                "Contract Signed",
                "Final Review",
              ]
            }} options={funnelOptions} />
            <h1 style={{ textAlign: "center" }}>Total Sales Open ($): <span style={{ color: "#1ee861" }}>{this.getTotalSales()}</span></h1>
          </Col>
          <Col md={6} >
            <h1 style={{ textAlign: "center" }}>Close Ratio</h1>
            <Doughnut data={{
              datasets: [{
                data: [this.state.stages["Closed Lost"], this.state.stages["Closed Won"]],
                backgroundColor: [
                  "#f4443a",
                  "#1be246"
                ],
              }],
              labels: [
                "Lost",
                "Won"
              ]
            }}
            />
            <h1 style={{ textAlign: "center" }}>{(this.state.stages["Closed Won"] / this.state.stages["Closed Lost"]) * 100}%</h1>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col md={6} mdPush={4} >
            <RecentActivity />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MyFunnel;

