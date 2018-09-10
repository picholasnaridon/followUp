import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import CompanyList from '../companies/CompanyList'
import DealList from '../deals/DealList'
import ContactList from '../contacts/ContactList'
import Contact from '../contacts/Contact'
import Deal from '../deals/Deal'
import Company from '../companies/Company'
import MyFunnel from './MyFunnel';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: JSON.parse(localStorage.getItem('loggedIn')) || null,
      user_id: JSON.parse(localStorage.getItem('user_id')) || null,
    }
    this.handleAuth = this.handleAuth.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleAuth(loggedIn, user) {
    console.log("fired", loggedIn)
    if (loggedIn) {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('user_id', user.id);
      this.setState({ loggedIn: true })
    }
  }

  logout() {
    var that = this
    fetch('/api/logout', {
      method: 'GET'
    }).then(function (res) {
      if (res.ok) {
        localStorage.setItem('loggedIn', false)
        localStorage.setItem('user_id', null)
        that.setState({ loggedIn: false, user_id: null })
      };
    })
  }

  render() {
    if (this.state.loggedIn)
      return (
        <div>
          <Router>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/companies">Companies</Link></li>
                <li><Link to="/deals">Deals</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
              </ul>
              <hr />
              <Route exact path="/" render={() => <MyFunnel />} />

              <Route exact path="/companies" render={() => <CompanyList />} />
              <Route exact path="/companies/:id" render={(props) => <Company {...props} />} />

              <Route exact path="/deals" render={() => <DealList />} />
              <Route exact path="/deals/:id" render={(props) => <Deal {...props} />} />

              <Route exact path="/contacts" render={() => <ContactList />} />
              <Route exact path="/contacts/:id" render={(props) => <Contact {...props} />} />
            </div>
          </Router>
        </div>

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
          <Route exact path="/" Component={Main} />
          <Route path="/login" render={() => <Login loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
          <Route path="/register" render={() => <Register loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
        </div>
      </Router>
    );
  }
}

export default Main;