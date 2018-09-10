import React, { Component } from 'react';

class AddDeal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: JSON.parse(localStorage.getItem('user_id'))
    }

    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()

    var payload = {
      name: this.refs.name.value,
      amount: this.refs.amount.value,
      status: this.refs.status.value,
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
          this.setState({ loggedIn: true })
          this.props.handleAuth(true);
        });
      }
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input type="text" name="name" className="form-control" ref="name" id="name" placeholder="name"></input>
          <input type="text" name="status" className="form-control" ref="status" id="status" placeholder="Status"></input>
          <input type="text" name="amount" className="form-control" ref="amount" id="amount" placeholder="$"></input>
          <input type="submit" className="form-control btn-primary"></input>
        </form>
      </div>
    );
  }
}

export default AddDeal;