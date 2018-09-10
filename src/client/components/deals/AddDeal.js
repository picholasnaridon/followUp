import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class AddDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: JSON.parse(localStorage.getItem('user_id')),
      selectStage: 'Discovery'
    }

    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ selectStage: e.target.value });

  }
  submit(e) {
    e.preventDefault()

    var payload = {
      name: this.refs.name.value,
      amount: this.refs.amount.value,
      status: this.state.selectStage,
      UserId: this.state.user_id
    }
    fetch("/api/deals/create", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response) => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json)
          this.props.closeModal()
          location.href = `#/deals/${json.id}`
        });
      }
    })
  }
  render() {
    return (
      <form onSubmit={this.submit} >
        <FormGroup>
          <ControlLabel>Deal Name</ControlLabel>
          <FormControl type="text" ref="name" placeholder="Deal Name" ></FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Stage</ControlLabel>
          <FormControl value={this.state.selectStage} componentClass="select" onChange={this.handleChange}>
            <option value="Discovery">Discovery</option>
            <option value="Initial Meeting">Initial Meeting</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Contract Signed">Contract Signed</option>
            <option value="Final Review">Final Review</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Amount</ControlLabel>
          <FormControl type="text" name="amount" ref="amount" id="amount" placeholder="$"></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl type="submit" className="form-control btn-primary"></FormControl>
        </FormGroup>
      </form>
    );
  }
}

export default AddDeal;
