import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      email: '',
      password: ''
    }

    this.login = this.login.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.greeting = this.greeting.bind(this)
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value })
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  greeting() {
    if (this.state.isLoggedIn) {
      return (<div>Welcome</div>)
    } else {
      return (
        <div>
          <input type="text" className="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)}></input>
          <input type="password" className="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}></input>
          <button onClick={(event) => this.login(event)}>Submit</button>
        </div>
      )
    }
  }

  login(e) {
    e.preventDefault()
    var payload = {
      "email": this.state.email,
      "password": this.state.password
    }

    fetch("/api/signin", {
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
        <h2>Login</h2>
        <div>{this.state.error}</div>
        <div>{this.greeting()}</div>
      </div>
    );
  }
}

export default Login;