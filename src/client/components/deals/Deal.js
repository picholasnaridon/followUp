import React, { Component } from 'react';
import Modal from '../shared/Modal'
import DealContacts from './DealContacts'
import { Button, FormControl, Grid, Row, Col } from 'react-bootstrap'


class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: null,
      stage: null
    }
    this.handleStageChange = this.handleStageChange.bind(this)
    this.renderStatus = this.renderStatus.bind(this)
  }

  handleStageChange(e) {
    console.log(e.target.value)
    var stage = e.target.value
    var payload = {
      stage: stage
    }
    fetch(`/api/deals/${this.props.match.params.id}/changeStage`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
      .then(response => response)
      .then((data) => {
        this.setState({ stage: stage })
      })
  }

  renderStatus() {
    return (
      <span>
        <span style={{
          color: this.state.deal.status === 'In Danger' ? '#ff2e00'
            : this.state.deal.status === 'Follow Up' ? '#ffbf00'
              : '#57d500',
          transition: 'all .3s ease'
        }}>
          &#x25cf;
                    </span> {
          this.state.deal.status === 'In Danger' ? 'Danger'
            : this.state.deal.status === 'Follow Up' ? `Follow Up`
              : 'Good'
        }
      </span >
    )
  }

  componentDidMount() {
    fetch(`/api/deals/${this.props.match.params.id}`, {
      method: "GET"
    }).then((response) => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({ deal: json, stage: json.stage })
    })
  }

  render() {
    if (this.state.deal) {
      return (
        <Grid>
          <Row>
            <Col>
              <div>
                <h2>{this.state.deal.name}</h2>
                <h4>{this.state.stage}</h4>
                <FormControl value={this.state.stage} componentClass="select" placeholder="select stage" onChange={this.handleStageChange.bind(this)}>
                  <option value="Closed Lost">Closed Lost</option>
                  <option value="Discovery">Discovery</option>
                  <option value="Initial Meeting">Initial Meeting</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Contract Signed">Contract Signed</option>
                  <option value="Final Review">Final Review</option>
                  <option value="Closed Won">Closed Won</option>
                </FormControl>
                <h4>{this.renderStatus()}</h4>
                <h4>$ {this.state.deal.amount}</h4>
                <DealContacts contacts={this.state.deal.Contacts} dealId={this.props.match.params.id} />
              </div>
            </Col>
          </Row>
        </Grid>

      );
    } else {
      return (<div></div>)
    }
  }
}

export default Deal;