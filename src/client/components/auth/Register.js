import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }

    this.register = this.register.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.greeting = this.greeting.bind(this)
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value })
  }
  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value })
  }

  greeting() {
    if (this.state.isLoggedIn) {
      return (<div>Welcome</div>)
    } else {
      return (
        <div>
          <input type="text" placeholder="First Name" className="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange.bind(this)}></input>
          <input type="text" placeholder="Last Name" className="lastName" value={this.state.lastName} onChange={this.handleLastNameChange.bind(this)}></input>
          <input type="text" placeholder="email" className="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}></input>
          <input type="password" placeholder="password" className="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}></input>
          <button onClick={(event) => this.register(event)}>Submit</button>
        </div>
      )
    }
  }

  register(e) {
    e.preventDefault()
    var payload = {
      "email": this.state.email,
      "password": this.state.password,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    }

    fetch("/api/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response) => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ error: json.message });
        });
      }
    })
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <div>{this.state.error}</div>
        <div>{this.greeting()}</div>
      </div>
    );
  }
}

export default Login;