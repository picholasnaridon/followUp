import React, { Component } from 'react';

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
      <div>
        <form onSubmit={this.submit}>
          <input type="text" name="name" className="form-control" ref="name" id="name" placeholder="name"></input>
          <select value={this.state.selectStage} onChange={this.handleChange}>
            <option value="Discovery">Discovery</option>
            <option value="Initial Meeting">Initial Meeting</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Contract Signed">Contract Signed</option>
            <option value="Final Review">Final Review</option>
          </select>
          <input type="text" name="amount" className="form-control" ref="amount" id="amount" placeholder="$"></input>
          <input type="submit" className="form-control btn-primary"></input>
        </form>
      </div>
    );
  }
}

export default AddDeal;
