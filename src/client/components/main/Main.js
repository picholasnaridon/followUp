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
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import axios from 'axios'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: null,
      user_id: null,
      user: null
    }
    // this.handleAuth = this.handleAuth.bind(this)
    this.logout = this.logout.bind(this)
  }
  
  componentDidMount(){
    axios.get('/api/user', {
        headers: {
          'authorization': localStorage.getItem('jwtToken'),
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response)
        this.setState({
          loggedIn: true,
          user_id: response.data.id
        })
      })
      .catch((error) => {
        window.href= "/#/login"
      });
  }

  // handleAuth(loggedIn, user) {
  //   console.log("fired", loggedIn)
  //   if (loggedIn) {
  //     localStorage.setItem('loggedIn', true);
  //     localStorage.setItem('user_id', user.id);
  //     this.setState({ loggedIn: true })
  //   }
  // }

  logout() {
    var that = this
    fetch('/api/logout', {
      method: 'GET'
    }).then(function (res) {
      if (res.ok) {
        localStorage.setItem('jwtToken', null);
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
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">My Funnel</Link>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem eventKey={1} href="#">
                  </NavItem>
                  <NavItem>
                    <Link to="/deals">Deals</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/companies">Companies</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/contacts">Contacts</Link>
                  </NavItem>
                </Nav>
                <Nav className="pull-right" pullRight>
                  <NavDropdown pullRight eventKey={3} title="Profile" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}><div onClick={this.logout}>Logout</div></MenuItem>
                    <MenuItem eventKey={3.2}><Link to="/profile">Profile</Link></MenuItem>
                  </NavDropdown>
                </Nav>
              </Navbar>
              <Route exact path="/" render={() => <MyFunnel />} />

              <Route exact path="/companies" render={() => <CompanyList />} />
              <Route exact path="/companies/:id" render={(props) => <Company {...props} />} />

              <Route exact path="/deals" render={(props) => <DealList userId={this.state.user_id} {...props}/>} />
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
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">My Funnel</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="#">
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/login">Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/register">Register</Link>
              </NavItem>
            </Nav>
          </Navbar>
          <Route exact path="/" Component={Main} />
          <Route path="/login" render={() => <Login loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
          <Route path="/register" render={() => <Register loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />} />
        </div>
      </Router>
    );
  }
}

export default Main;