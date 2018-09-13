import React, { Component } from 'react';
import ContactDeals from './ContactDeals'
import NoteList from '../notes/NoteList'
import EditContact from './EditContact'
import MyModal from '../shared/MyModal'
import { Table, Grid, Row, Col, Panel, Thumbnail, Button } from 'react-bootstrap'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null
    }
    this.refresh = this.refresh.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  componentDidMount() {
    fetch(`/api/contacts/${this.props.match.params.id}`, {
      method: "GET"
    }).then((response) => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({ contact: json })
    })
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  refresh() {
    fetch(`/api/contacts/${this.props.match.params.id}`, {
      method: "GET"
    }).then((response) => {
      return response.json()
    }).then(json => {
      console.log(json)
      this.setState({ contact: json })
    })
  }


  render() {
    if (this.state.contact) {
      return (

        <Grid>
          <Button bsStyle="success" onClick={this.showModal}>Edit Contact</Button>
          <Row>
            <Col md={3}>
              <Thumbnail href="#" alt="171x180" src="http://www.nickparidon.com/static/media/me.b920f956.png" />
            </Col>
            <Col md={9}>
              <Panel>
                <div>
                  <h2>{this.state.contact.firstName} {this.state.contact.lastName}</h2>
                  <MyModal show={this.state.show} title="Edit Contact" close={this.hideModal} onHide={this.hideModal} >
                    <EditContact closeModal={this.hideModal} contact={this.state.contact} refresh={this.refresh} />
                  </MyModal>
                  <h3><a href={`#/companies/${this.state.contact.Company.id}`}>{this.state.contact.Company.name}</a></h3>
                </div>
              </Panel>
              <Panel>
                <h2>Contact Info</h2>
                <Table>
                  <tbody>
                    <tr>
                      <td><strong>Phone</strong></td>
                      <td><a href={`tel:${this.state.contact.phone}`}>{this.state.contact.phone}</a></td>
                      <td><strong>Mobile</strong></td>
                      <td><a href={`tel:${this.state.contact.mobile}`}>{this.state.contact.mobile}</a></td>
                      <td><strong>Email</strong></td>
                      <td><a href={`mailto:${this.state.contact.email}`}>{this.state.contact.email}</a></td>
                    </tr>
                    <tr>
                      <td><strong>Address 1</strong></td>
                      <td>{this.state.contact.address1}</td>
                      <td><strong>Address 2</strong></td>
                      <td>{this.state.contact.address2}</td>
                      <td><strong>City</strong></td>
                      <td>{this.state.contact.city}</td>
                    </tr>
                    <tr>
                      <td><strong>State</strong></td>
                      <td>{this.state.contact.state}</td>
                      <td><strong>Zip</strong></td>
                      <td>{this.state.contact.zip}</td>
                      <td><strong>Country</strong></td>
                      <td>{this.state.contact.country}</td>
                    </tr>
                  </tbody>
                </Table>
              </Panel>
            </Col>
          </Row>
          <Row>
          </Row>
          <Row>
            <Col>
              <h2>Deals</h2>
              <ContactDeals deals={this.state.contact.Deals} />
            </Col>
          </Row>
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

export default Contact;