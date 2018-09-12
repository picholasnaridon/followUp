import React, { Component } from 'react';
import MyModal from '../shared/MyModal'
import DealContacts from './DealContacts'
import { Button, FormControl, Grid, Row, Col } from 'react-bootstrap'
import EditDeal from './EditDeal'
import NoteList from '../notes/NoteList'

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: null,
      stage: null
    }
    this.renderStatus = this.renderStatus.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.refresh = this.refresh.bind(this)
    this.markLostOrWon = this.markLostOrWon.bind(this)
  }

  markLostOrWon(e, stage) {
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
  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
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

  refresh() {
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
            <Col md={11}>
              <h2>{this.state.deal.name}</h2>
              <h4>{this.state.stage}</h4>
              <Button bsStyle="success" onClick={(e) => this.markLostOrWon(e, "Closed Won")}>Won</Button>
              <Button bsStyle="danger" onClick={(e) => this.markLostOrWon(e, "Closed Lost")}>Lost</Button>
              <MyModal show={this.state.show} title="Edit Deal" close={this.hideModal} onHide={this.hideModal} >
                <EditDeal close={this.hideModal} deal={this.state.deal} refresh={this.refresh} />
              </MyModal>
            </Col>
            <Col md={1}>
              <Button bsStyle="primary" onClick={this.showModal}>Edit Deal</Button>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <div>
                <h4>{this.renderStatus()}</h4>
                <h4>$ {this.state.deal.amount}</h4>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <DealContacts contacts={this.state.deal.Contacts} refresh={this.refresh} dealId={this.props.match.params.id} />
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <NoteList />
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

