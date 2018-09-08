import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || null
    }
    this.handleAuth = this.handleAuth.bind(this)
    this.logout = this.logout.bind(this)
  }


  handleAuth(loggedIn) {
    console.log("fired", loggedIn)
    if (loggedIn) {
      localStorage.setItem('loggedIn', true);
      this.setState({ loggedIn: true })
    }
  }

  loggedIn() {
    if (this.state.loggedIn)
      return (
        <div>You are Logged In</div>
      )
  }

  logout() {
    var that = this
    fetch('/api/logout', {
      method: 'GET'
    }).then(function (res) {
      if (res.ok) {
        localStorage.setItem('loggedIn', false)
        that.setState({ loggedIn: false })
      };
    })
  }

  render() {
    if (this.state.loggedIn)
      return (
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#" onClick={this.logout}>Logout</a></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
            <hr />
            <Route path="/" Component={Main} />
            <Route path="/Login" render={() => <Login loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
            <Route path="/Register" render={() => <Register loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
          </div>
        </Router>
      )
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
          <hr />
          <Route path="/" Component={Main} />
          <Route path="/Login" render={() => <Login loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
          <Route path="/Register" render={() => <Register loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
        </div>
      </Router>
    );
  }
}

export default Main;