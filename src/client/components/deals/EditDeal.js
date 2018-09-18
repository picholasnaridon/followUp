import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class EditDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deal: this.props.deal,
      selectStage: this.props.deal.stage,
      selectStatus: this.props.deal.status
    }

    this.submit = this.submit.bind(this)
    this.handleStageChange = this.handleStageChange.bind(this)
    this.hanldeStatusChange = this.handleStatusChange.bind(this)
  }

  handleStageChange(e) {
    console.log(e.target.value)
    this.setState({ selectStage: e.target.value });
  }

  handleStatusChange(e) {
    console.log(e.target.value)
    this.setState({ selectStatus: e.target.value });
  }

  submit(e) {
    e.preventDefault()

    var payload = {
      name: this.inputName.value,
      amount: this.inputAmount.value,
      stage: this.state.selectStage,
      status: this.state.selectStatus,
      prevStage: this.state.deal.stage
    }
    console.log(payload)
    fetch(`/api/deals/${this.state.deal.id}/edit`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response) => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json)
          this.props.close()
          this.props.refresh()
        });
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.submit} >
        <FormGroup>
          <ControlLabel>Deal Name</ControlLabel>
          <FormControl type="text" defaultValue={this.state.deal.name} inputRef={(input) => this.inputName = input}
            placeholder="Deal Name" ></FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Stage</ControlLabel>
          <FormControl value={this.state.selectStage} componentClass="select" onChange={this.handleStageChange.bind(this)}>
            <option value="Discovery">Discovery</option>
            <option value="Initial Meeting">Initial Meeting</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Contract Signed">Contract Signed</option>
            <option value="Final Review">Final Review</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelectTwo">
          <ControlLabel>Status</ControlLabel>
          <FormControl value={this.state.selectStatus} componentClass="select" onChange={this.handleStatusChange.bind(this)}>
            <option value="In Danger">In Danger</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Good">Good</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Amount</ControlLabel>
          <FormControl type="text" name="amount" defaultValue={this.state.deal.amount} inputRef={(input) => this.inputAmount = input} id="amount" placeholder="$"></FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl type="submit" className="form-control btn-primary"></FormControl>
        </FormGroup>
      </form>
    );
  }
}

export default EditDeal;
