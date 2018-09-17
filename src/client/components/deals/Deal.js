import React, { Component } from 'react';
import MyModal from '../shared/MyModal'
import DealContacts from './DealContacts'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import EditDeal from './EditDeal'
import NoteList from '../notes/NoteList'
import DealStatus from './DealStatus'
import DollarFormat from '../shared/DollarFormat'
import WarningBanner from '../shared/WarningBanner';

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: null,
      stage: null
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.refresh = this.refresh.bind(this)
    this.markLostOrWon = this.markLostOrWon.bind(this)
  }

  markLostOrWon(e, stage) {
    var payload = {
      stage: stage,
      prevStage: this.state.deal.stage
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
        this.refresh()
      })
  }
  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
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
                <h4><DealStatus status={this.state.deal.status} /></h4>
                <h4><DollarFormat value={this.state.deal.amount} /></h4>
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
      return (<WarningBanner />)
    }
  }
}

export default Deal;

