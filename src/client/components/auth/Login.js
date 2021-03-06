import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Panel, Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			message: ''
		};
	}
	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState(state);
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		axios
			.post('/api/signin', { username, password })
			.then((result) => {
				console.log('Fired');
				localStorage.setItem('jwtToken', result.data.token);
				this.setState({ message: '' });
				window.location.href = '/';
			})
			.catch((error) => {
				if (error.response.status === 401) {
					this.setState({ message: 'Login failed. Username or password not match' });
				}
			});
	};

	render() {
		const { username, password, message } = this.state;
		return (
			<div>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Follow Up</Link>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav className="pull-right" pullRight>
						<NavItem>
							<Link to="/login">Login</Link>
						</NavItem>
						<NavItem>
							<Link to="/register">Register</Link>
						</NavItem>
					</Nav>
				</Navbar>
				<form class="form-signin" onSubmit={this.onSubmit}>
					{message !== '' && (
						<div class="alert alert-warning alert-dismissible" role="alert">
							{message}
						</div>
					)}
					<h2 class="form-signin-heading">Please sign in</h2>
					<label for="inputEmail" class="sr-only">
						Email address
					</label>
					<input
						type="email"
						class="form-control"
						placeholder="Email address"
						name="username"
						value={username}
						onChange={this.onChange}
						required
					/>
					<label for="inputPassword" class="sr-only">
						Password
					</label>
					<input
						type="password"
						class="form-control"
						placeholder="Password"
						name="password"
						value={password}
						onChange={this.onChange}
						required
					/>
					<button class="btn btn-lg btn-primary btn-block" type="submit">
						Login
					</button>
					<p>
						Not a member?{' '}
						<Link to="/register">
							<span class="glyphicon glyphicon-plus-sign" aria-hidden="true" /> Register here
						</Link>
					</p>
					<br />
					<Panel>
						<Panel.Heading>Test user with data</Panel.Heading>
						<Panel.Body>
							<strong>Username:</strong> fake@fake.com <br />
							<strong>Password:</strong> password
						</Panel.Body>
					</Panel>
				</form>
			</div>
		);
	}
}

export default Login;
