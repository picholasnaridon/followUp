import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'

class Main extends Component {
  render() {
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
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default Main;