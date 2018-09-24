import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Create extends Component {
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
			.post('/api/signup', { username, password })
			.then((result) => {
				localStorage.setItem('jwtToken', result.data.token);
				this.setState({ message: '' });
				window.location.href = '/';
			})
			.catch((error) => {
				if (error.response.status === 401) {
					this.setState({ message: 'Login failed. Email is already in use!' });
				}
			});
	};

	render() {
		const { username, password, message } = this.state;
		return (
			<div class="container">
				<form class="form-signin" onSubmit={this.onSubmit}>
					{message !== '' && (
						<div class="alert alert-warning alert-dismissible" role="alert">
							{message}
						</div>
					)}
					<h2 class="form-signin-heading">Register</h2>
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
						Register
					</button>
				</form>
			</div>
		);
	}
}

export default Create;
