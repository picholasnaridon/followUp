import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2'

const pendingData = {
  datasets: [{
    data: [10, 5, 11, 14, 6],
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
}
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

const wonData = {
  datasets: [{
    data: [10, 15],
    backgroundColor: [
      "#f4443a",
      "#1be246"
    ],
  }],
  labels: [
    "Lost",
    "Won"
  ]
}

class MyFunnel extends Component {
  render() {
    return (
      <div>
        <Bar data={pendingData} options={funnelOptions} />
        <Doughnut data={wonData} />
      </div>
    );
  }
}

export default MyFunnel;