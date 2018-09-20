import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Login, Register, CompanyList, DealList, ContactList, Contact, Deal, Company, MyFunnel } from '../components';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import axios from 'axios';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: null,
			user_id: null,
			user: null
		};
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/api/user')
			.then((response) => {
				console.log(response);
				this.setState({
					loggedIn: true,
					user_id: response.data.id
				});
			})
			.catch((error) => {
				window.location.href = '/#/login';
			});
	}

	logout() {
		var that = this;
		fetch('/api/logout', {
			method: 'GET'
		}).then(function(res) {
			if (res.ok) {
				localStorage.setItem('jwtToken', null);
				that.setState({ loggedIn: false, user_id: null });
				window.location.href = '/#/login';
			}
		});
	}

	render() {
		if (this.state.loggedIn)
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
								<NavItem eventKey={1} href="#" />
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
									<MenuItem eventKey={3.1}>
										<div onClick={this.logout}>Logout</div>
									</MenuItem>
									<MenuItem eventKey={3.2}>
										<Link to="/profile">Profile</Link>
									</MenuItem>
								</NavDropdown>
							</Nav>
						</Navbar>
						<Route exact path="/" render={(props) => <MyFunnel userId={this.state.user_id} />} />

						<Route
							exact
							path="/companies"
							render={(props) => <CompanyList userId={this.state.user_id} {...props} />}
						/>
						<Route
							exact
							path="/companies/:id"
							render={(props) => <Company userId={this.state.user_id} {...props} />}
						/>

						<Route
							exact
							path="/deals"
							render={(props) => <DealList userId={this.state.user_id} {...props} />}
						/>
						<Route
							exact
							path="/deals/:id"
							render={(props) => <Deal userId={this.state.user_id} {...props} />}
						/>

						<Route
							exact
							path="/contacts"
							render={(props) => <ContactList userId={this.state.user_id} {...props} />}
						/>
						<Route
							exact
							path="/contacts/:id"
							render={(props) => <Contact userId={this.state.user_id} {...props} />}
						/>
					</div>
				</Router>
			);
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
					<Route
						path="/login"
						render={() => <Login loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />}
					/>
					<Route
						path="/register"
						render={() => <Register loggedIn={this.state.loggedIn} handleAuth={this.handleAuth} />}
					/>
				</div>
			</Router>
		);
	}
}

export default Main;
