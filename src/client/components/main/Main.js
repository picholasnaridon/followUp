import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import {
	Login,
	Register,
	CompanyList,
	DealList,
	ContactList,
	Contact,
	Deal,
	Company,
	MyFunnel,
	MetricsPage,
	Profile
} from '../components';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faCity, faHandshake, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: null,
			userId: null,
			user: null
		};
	}

	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get('/api/user')
			.then((response) => {
				this.setState({
					loggedIn: true,
					userId: response.data.id
				});
			})
			.catch((error) => {
				window.location.href = '/#/login';
			});
	}

	logout = () => {
		var that = this;
		fetch('/api/logout', {
			method: 'GET'
		}).then(function(res) {
			if (res.ok) {
				localStorage.setItem('jwtToken', null);
				that.setState({ loggedIn: false, userId: null });
				window.location.href = '/#/login';
			}
		});
	};

	render() {
		if (this.state.loggedIn)
			return (
				<Router>
					<div>
						<Navbar>
							<Navbar.Header>
								<Navbar.Brand>
									<Link to="/">Dashboard</Link>
								</Navbar.Brand>
							</Navbar.Header>
							<Nav>
								<NavItem eventKey={1} href="#" />
								<NavItem>
									<Link to="/deals">
										Deals <FontAwesomeIcon icon={faHandshake} />
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/companies">
										Companies <FontAwesomeIcon icon={faCity} />
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/contacts">
										Contacts <FontAwesomeIcon icon={faUsers} />
									</Link>
								</NavItem>
								<NavItem>
									<Link to="/metrics">
										Metrics <FontAwesomeIcon icon={faChartLine} />
									</Link>
								</NavItem>
							</Nav>
							<Nav className="pull-right" pullRight>
								<NavDropdown pullRight eventKey={3} title="Profile" id="basic-nav-dropdown">
									<MenuItem eventKey={3.1}>
										<Link to="/profile">Profile</Link>
									</MenuItem>
									<MenuItem eventKey={3.2}>
										<div onClick={this.logout}>Logout</div>
									</MenuItem>
								</NavDropdown>
							</Nav>
						</Navbar>
						<Route exact path="/" render={(props) => <MyFunnel userId={this.state.userId} />} />
						<Route
							exact
							path="/companies"
							render={(props) => <CompanyList userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/companies/:id"
							render={(props) => <Company userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/deals"
							render={(props) => <DealList userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/deals/:id"
							render={(props) => <Deal userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/contacts"
							render={(props) => <ContactList userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/contacts/:id"
							render={(props) => <Contact userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/metrics"
							render={(props) => <MetricsPage userId={this.state.userId} {...props} />}
						/>
						<Route
							exact
							path="/profile"
							render={(props) => <Profile userId={this.state.userId} {...props} />}
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
